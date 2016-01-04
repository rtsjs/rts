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
                    <button (click)="addNewTask()" type="button" title="Add a new task">
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
                                        <input type="checkbox" checked={{"this.gridOptions.enableSorting"}} (click)="toggleSorting()">Disable sorting
                                    </td>
                                </tr>
                                <tr>
                                    <td style="padding-right:20px">
                                        <input type="checkbox" checked={{"this.gridOptions.enableColResize"}} (click)="toggleColResizing()">Disable column re-size
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
    public selectedTask:any;
    public previousSelectedTask:any;
    public oldTaskName:string;
    private _http:Http;

    constructor(public http:Http){

        this.gridOptions = {
            pinnedColumnCount: 0,
            rowSelection: 'single',
            onRowClicked: this.rowClickedFunc,
            onRowSelected: this.rowSelectedFunc,
            onCellValueChanged: this.cellValueChangedFunc,
            onRowDeselected: this.rowDeselectedFunc,
            //onSelectionChanged: this.selectionChangedFunc,
            //onModelUpdated: this.modelUpdatedFunc,
            onReady: this.readyFunc,
            onCellClicked: this.cellClickedFunc,
            rowData: null,
            sizeToFit: true,
            suppressCellSelection: true
            //singleClickEdit: true
        };

        // put columnDefs directly onto the controller
        this.columnDefs = [
            //{headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
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

        this.oldTaskName = "";

        // put data directly onto the controller
        this._http = http;
        this.getGridData();
        this.loadGridSettings();
    }

    rowClickedFunc = (event)=> {
    }

    cellValueChangedFunc = (event)=> {
        if (event.newValue == event.oldValue){
            ChartComponent.isDirty = false;
            return;
        }
        if (event.colDef.field == 'name') {
            this.oldTaskName = event.oldValue;
        }

        ChartComponent.isDirty = true;
    }

    cellClickedFunc = ($event)=> {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);

        // the binding does not work? so I have to do this
        if ($event.colDef.field == undefined){ // clicked on delete
            this.deleteTask();
            return;
        }else {
            if (ChartComponent.rowIndex != $event.rowIndex) {
                if (ChartComponent.isDirty) {
                    this.updateTask();
                    ChartComponent.isDirty = false;
                }
            }

            ChartComponent.rowIndex = $event.rowIndex;
        }
    }

    //modelUpdatedFunc = (event)=> {
    //}

    readyFunc = (event)=> {
        this.loadGridSettings();
        event.api.sizeColumnsToFit();
    }

    toggleSorting(){
        this.gridOptions.enableSorting = !this.gridOptions.enableSorting;
    }

    toggleColResizing(){
        this.gridOptions.enableColResize = !this.gridOptions.enableColResize;
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
        }
    }

    saveGridSettings(){
        this.gridOptions.api.refreshHeader();
        if (typeof(Storage) !== "undefined") {
            localStorage.setItem("enableSorting", this.gridOptions.enableSorting);
            localStorage.setItem("enableColResize", this.gridOptions.enableColResize);
        }
    }

    rowDeselectedFunc = (event)=> {
        this.previousSelectedTask = this.selectedTask;
    }

    rowSelectedFunc = (event)=> {
        this.selectedTask = event.node.data;
    }

    //selectionChangedFunc = ($event)=> {
    //}

    deleteTaskRendererFunc() {
        console.log("delete task handler");
        return '<button width="14" height="14" align="middle" title="Delete task" (click)="deleteTask()">' +
                    '<img src="../../resources/images/trash.png" width="12" height="12"/>' +
                '</button>';
    }

    getGridData() {
        this._http.get("/api/task")
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    addNewTask() {
        this.addTask("(Double-click to edit name)",
                     "(Double-click to edit period)",
                     "(Double-click to edit time)");
    }

    addTask(name:string, period:string, executionTime:string) {
        if (name.length == 0 || period.length== 0 || executionTime.length == 0){
            console.log("invalid input");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var res = this._http.post("/api/addTask", JSON.stringify({name:name,period:period,executionTime:executionTime}),{headers:headers})
            .map(res => res.json())
            .subscribe(
                data => this.rowData = data,
                err => {
                        console.log("Error:" + err);
                },
                ()=> {
                });
    }

    updateTask(){
        if (this.selectedTask == null) {
            console.log("select a task");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/updateTask", JSON.stringify({
                oldName: this.oldTaskName,
                name: this.previousSelectedTask.name,
                period: this.previousSelectedTask.period,
                executionTime: this.previousSelectedTask.executionTime
            }), {headers: headers})
            .map(res => res.json())
            .subscribe((seq) => {
                    this.rowData = seq.tasks,
                    err => {
                        console.log("Error:" + err);
                    }, ()=> {}
            });

        this.oldTaskName = "";
    }

    deleteTask(){
        if (this.selectedTask == null) {
            console.log("select a task");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/deleteTask",
                        JSON.stringify({
                            name:this.selectedTask.name,
                            period:this.selectedTask.period,
                            executionTime:this.selectedTask.executionTime}),
                        {headers:headers})
            .map(res => res.json())
            .subscribe((seq) => {
                this.rowData = seq.tasks;
            });
    }
};