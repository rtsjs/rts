import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Http, Response, Headers, HTTP_BINDINGS} from 'angular2/http';

//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';

@Component({ selector: 'my-chart' })

@View({
    template: `
		<h3>AG Grid</h3>
		<ag-grid-ng2 id="cars" class="ag-fresh"  style="height: 500px;"
            [column-defs]="columnDefs" [row-data]="rowData">
        </ag-grid-ng2>
        <br/>
        <button type="button" (click)="getGridData()">Refresh Grid</button>
	`,

    directives: [ ag.grid.AgGridNg2, NgFor, NgIf],
})
export class ChartComponent {
    public columnDefs:Array<any>;
    public rowData:Array<any>;
    private _http:Http;
    private sequence:any;


    constructor(public http:Http){

        // put columnDefs directly onto the controller
        this.columnDefs = [
            {headerName: "Name", field: "name"},
            {headerName: "Period", field: "period"},
            {headerName: "Time", field: "executionTime"}
        ];

/*
        this.rowData = [
            {name: "T1", period: "1", executionTime: 12},
            {name: "T2", period: "2", executionTime: 13},
            {name: "T3", period: "3", executionTime: 14}
        ];
*/

        // put data directly onto the controller
        this._http = http;
        this.getGridData();
/*
        this.getGridData()
        this.refreshGrid();
*/
    }

    getGridData() {
        this._http.get("/api/task")
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    addTask(name:string, period:string, executionTime:string){
        if (name.length == 0 || period.length == 0 || executionTime.length == 0){
            console.log("invalid input");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/addTask", JSON.stringify({name:name,period:period,executionTime:executionTime}),{headers:headers})
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    deleteTask(name:string){
        if (name.length == 0){
            console.log("invalid input");
            return;
        }

        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        this._http.post("/api/deleteTask", JSON.stringify({name:name}),{headers:headers})
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }
}

