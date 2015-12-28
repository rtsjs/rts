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
                    <button (click)="addNewTask()">
                        <img src="../../resources/images/plus.svg" width="12" height="12"/>
                    </button>
                    <button (click)="getGridData()">
                        <img src="../../resources/images/loop-circular.svg" width="12" height="12"/>
                    </button>
                </td>
            </tr>
            <tr>
                <td>
                    <ag-grid-ng2 id="tasks" class="ag-fresh"  style="height: 500px;"
                        [column-defs]="columnDefs"
                        [row-data]="rowData"
                        [grid-options]="gridOptions"
                        [enable-col-resize]="true"
                        [enable-sorting]="true"
                        [row-selection]="none"
                        row-height="35">
                    </ag-grid-ng2>
                </td>
            </tr>
        </table>
   `,
    directives: [ag.grid.AgGridNg2],
})

export class ChartComponent {
    public static rowIndex:number = 0;
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
            onRowSelected: this.rowSelectedFunc,
            onCellValueChanged: this.cellValueChangedFunc,
            onRowDeselected: this.rowDeselectedFunc,
            onSelectionChanged: this.selectionChangedFunc,
            onModelUpdated: this.modelUpdatedFunc,
            onReady: this.readyFunc,
            onCellClicked: this.cellClickedFunc,
            enableColResize: true,
            rowData: null,
            sizeToFit: true,
            suppressCellSelection: true
            //singleClickEdit: true
        };

        //this.pageSize = '10';

        // put columnDefs directly onto the controller
        this.columnDefs = [
            //{headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
            {headerName: "Name", field: "name", editable:true, padding: 10, headerTooltip:"Task name", cellStyle: {color: '#000000'}},
            {headerName: "Period", field: "period", editable:true, padding: 10,  headerTooltip:"Task period", cellStyle: {color: '#000000'}},
            {headerName: "Time", field: "executionTime", editable:true, padding: 10,  headerTooltip:"Task execution time", cellStyle: {color: '#000000'}},
            {headerName: "...", width: 50, suppressSorting: true, suppressMenu: true, suppressSizeToFit: false, editable:false, cellRenderer: this.deleteTaskRendererFunc}
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
    }

    cellValueChangedFunc = (event)=> {
        if (event.newValue == event.oldValue){
            return;
        }
        if (event.colDef.field == 'name') {
            this.oldTaskName = event.oldValue;
        }
    }

    cellClickedFunc = ($event)=> {
        console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);

        // the binding does not work? so I have to do this
        if ($event.colDef.field == undefined){ // clicked on delete
            this.deleteTask();
            return;
        }else {
            if (ChartComponent.rowIndex != $event.rowIndex) {
                this.updateTask();
            }

            ChartComponent.rowIndex = $event.rowIndex;
        }
    }

    modelUpdatedFunc = (event)=> {
    }

    readyFunc = (event)=> {
        event.api.sizeColumnsToFit();
    }

    rowDeselectedFunc = (event)=> {
        this.previousSelectedTask = this.selectedTask;
    }

    rowSelectedFunc = (event)=> {
        this.selectedTask = event.node.data;
    }

    selectionChangedFunc = ($event)=> {
    }

    deleteTaskRendererFunc() {
        console.log("delete task handler");
        return '<button width="14" height="14" align="middle" (click)="this.deleteTask()">' +
            '<img src="../../resources/images/trash.png" width="12" height="12"/>' +
            '</button>';
    }

    getGridData() {
        this._http.get("/api/task")
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    addNewTask() {
        this.addTask("(Name)",
                     "(Period)",
                     "(Time)");
    }

    addTask(name:string, period:string, executionTime:string){
        if (name.length == 0 || period.length== 0 || executionTime.length == 0){
            console.log("invalid input");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var res = this._http.post("/api/addTask", JSON.stringify({name:name,period:period,executionTime:executionTime}),{headers:headers})
            .map(res => res.json())
            .subscribe((seq) => {
                this.rowData = seq.tasks;
            });
    }


    updateTask(){
        if (this.selectedTask == null){
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
                this.rowData = seq.tasks;
            });

        this.oldTaskName = "";
    }

    deleteTask(){
        if (this.selectedTask == null){
            console.log("select a task");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/deleteTask", JSON.stringify({name:this.selectedTask.name, period:this.selectedTask.period, executionTime:this.selectedTask.executionTime}),{headers:headers})
            .map(res => res.json())
            .subscribe((seq) => {
                this.rowData = seq.tasks;
            });
    }
};