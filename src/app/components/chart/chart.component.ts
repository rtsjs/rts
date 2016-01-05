import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Http, Response, Headers, HTTP_BINDINGS} from 'angular2/http';
//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';

@Component({ selector: 'my-chart' })

@View({
    template: `
        <table>
            <tr><h3>AG Grid</h3></tr>
            <tr>
                <td align="right" vertical-align="middle">
                    <button (click)="addNewGridItem()" type="button" title="Add a new task">
                        <img src="../../resources/images/plus.svg" width="12" height="12"/>
                    </button>
                    <button (click)="getGridData()" type="button" title="Refresh">
                        <img src="../../resources/images/loop-circular.svg" width="12" height="12"/>
                    </button>
                    <div class="dropdown">
                        <button (click)="displayGridMenu()" type="button" title="Display menu"/>
                            <img src="../../resources/images/menu.svg" width="12" height="12"/>
                        </button>
                        <div id="gridMenuDropdown" class="dropdown-content" width="36">
                            <table>
                                <tr>
                                    <td style="padding-right:20px">
                                        <label>
                                            <input type="checkbox" (change)="gridOptions.enableSorting=$event.target.checked" />
                                            Enable sorting
                                        </label>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="padding-right: 20px">
                                        <label>
                                            <input type="checkbox" (change)="gridOptions.enableColResize=$event.target.checked" />
                                            Enable column re-size
                                        </label>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </td>
            </tr>
            <tr>
                <td>
                    <ag-grid-ng2 id="tasks" class="ag-fresh"  style="height: 500px;"
                        [column-defs]="columnDefs"
                        [row-data]="rowData"
                        [grid-options]="gridOptions"
                        [row-selection]="none"
                        row-height="35">
                    </ag-grid-ng2>
                </td>
            </tr>
        </table>
   `,
    directives: [ag.grid.AgGridNg2]
})

export class ChartComponent {
    public static rowIndex:number = 0;
    public static isDirty:boolean = false;
    public columnDefs:Array<any>;
    public gridOptions:any;
    public rowData:Array<any>;
    public selectedGridItem:any;
    public previousSelectedGridItem:any;
    public oldGridItemName:string;
    private _http:Http;

    constructor(public http:Http){

        this.gridOptions = {
            pinnedColumnCount: 0,
            rowSelection: 'single',
            onRowSelected: this.rowSelectedFunc,
            onCellValueChanged: this.cellValueChangedFunc,
            onRowDeselected: this.rowDeselectedFunc,
            onReady: this.readyFunc,
            onCellClicked: this.cellClickedFunc,
            rowData: null,
            sizeToFit: true,
            enableSorting: false,
            enableColResize: false,
            suppressCellSelection: true
        };

        // put columnDefs directly onto the controller
        this.columnDefs = [
            {headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
            {headerName: "Name", minWidth: 100, field: "name", editable:true, padding: 10, headerTooltip:"Task name", cellStyle: {color: '#000000'}},
            {headerName: "Period", minWidth: 100, field: "period", editable:true, padding: 10,  headerTooltip:"Task period", cellStyle: {color: '#000000'}},
            {headerName: "Time", minWidth: 100, field: "executionTime", editable:true, padding: 10,  headerTooltip:"Task execution time", cellStyle: {color: '#000000'}},
            {headerName: "...", width: 35, minWidth: 35, suppressSorting: true, suppressMenu: true, suppressSizeToFit: false, editable:false, cellRenderer: this.deleteTaskRendererFunc}
        ];

        /*
         this.rowData = [
         {name: "T1", period: "1", executionTime: 12},
         {name: "T2", period: "2", executionTime: 13},
         {name: "T3", period: "3", executionTime: 14}
         ];
         */

        this.oldGridItemName = "";

        // put data directly onto the controller
        this._http = http;
        this.getGridData();
    }

    cellValueChangedFunc = (event)=> {
        if (event.colDef.field == 'name') {
            this.oldGridItemName = event.oldValue;
        }

        ChartComponent.isDirty = true;
    }

    cellClickedFunc = ($event)=> {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);

        // the binding does not work? so I have to do this
        if ($event.colDef.field == undefined){ // clicked on delete
            this.deleteGridItem();
            return;
        }else {
            if (ChartComponent.rowIndex != $event.rowIndex) {
                if (ChartComponent.isDirty) {
                    this.updateGridItem();
                    ChartComponent.isDirty = false;
                }
            }

            ChartComponent.rowIndex = $event.rowIndex;
        }
    }

    readyFunc = (event)=> {
        this.loadGridSettings();
    }

    rowDeselectedFunc = (event)=> {
        this.previousSelectedGridItem = this.selectedGridItem;
    }

    rowSelectedFunc = (event)=> {
        this.selectedGridItem = event.node.data;
    }

    deleteTaskRendererFunc() {
        return '<button width="14" height="14" align="middle" title="Delete task" (click)="deleteTask()">' +
                    '<img src="../../resources/images/trash.png" width="12" height="12"/>' +
                '</button>';
    }

    displayGridMenu() {
        var showDropdown = document.getElementById("gridMenuDropdown").classList.toggle("show");
        if (showDropdown) {
            this.loadGridSettings();
        }else {
            this.saveGridSettings();
        }
    }

    loadGridSettings(){
        if (typeof(Storage) !== "undefined") {
            this.gridOptions.enableSorting = (localStorage.getItem("enableSorting") === 'true');
            this.gridOptions.enableColResize = (localStorage.getItem("enableColResize") === 'true');
            this.gridOptions.api.refreshHeader();
        }
    }

    saveGridSettings(){
        if (typeof(Storage) !== "undefined") {
            this.gridOptions.api.refreshHeader();
            localStorage.setItem("enableSorting", this.gridOptions.enableSorting);
            localStorage.setItem("enableColResize", this.gridOptions.enableColResize);
        }
    }

    getGridData() {
        this._http.get("/api/task")
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    addNewGridItem() {
        this.addGridItem("(Double-click to edit name)",
            "(Double-click to edit period)",
            "(Double-click to edit time)");
    }

    addGridItem(name:string, period:string, executionTime:string) {
        if (name.length == 0 || period.length== 0 || executionTime.length == 0){
            console.log("invalid input");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/addTask", JSON.stringify({name:name,period:period,executionTime:executionTime}),{headers:headers})
            .map(res => res.json())
            .subscribe(
                data => this.rowData = data,
                err => {
                        console.log("Error:" + err);
                },
                ()=> {
                    console.log("addTask success");
                });
    }

    updateGridItem(){
        if (this.selectedGridItem == null) {
            console.log("select a task");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/updateTask", JSON.stringify({
                oldName: this.oldGridItemName,
                name: this.previousSelectedGridItem.name,
                period: this.previousSelectedGridItem.period,
                executionTime: this.previousSelectedGridItem.executionTime
            }), {headers: headers})
            .map(res => res.json())
            .subscribe(
                seq => this.rowData = seq.tasks,
                err => {
                        console.log("Error:" + err);
                },
                ()=> {
                        console.log("updateTask success");
                });

            this.oldGridItemName = "";
    }

    deleteGridItem(){
        if (this.selectedGridItem == null) {
            console.log("select a task");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/deleteTask",
                        JSON.stringify({
                            name:this.selectedGridItem.name,
                            period:this.selectedGridItem.period,
                            executionTime:this.selectedGridItem.executionTime}),
                        {headers:headers})
            .map(res => res.json())
            .subscribe(
                seq => this.rowData = seq.tasks,
                err => {
                    console.log("Error:" + err);
                },
                ()=> {
                    console.log("deleteTask success");
                });
    }
};