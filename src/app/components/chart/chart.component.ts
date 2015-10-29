import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Http,  HTTP_BINDINGS} from 'angular2/http';

//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';

@Component({ selector: 'my-chart' })

@View({
    template: `
		<h3>AG Grid</h3>
		<ag-grid-ng2 id="tasks" class="ag-fresh"  style="height: 500px;"
		[grid-options]="gridOptions"
		[page-size]="pageSize"
        [column-defs]="columnDefs"
        [row-data]="rowData">
      </ag-grid-ng2>
      <br/>
<button type="button" (click)="getGridData()">Refresh Grid</button>
<button type="button" (click)="selectAll()">Select All</button>
<button type="button" (click)="unSelectAll()">Un-Select All</button>
<button type="button" (click)="addTask()">Add task</button>
<button type="button" (click)="removeTask()">Remove task</button>
<br />
<br />
    <div id="menu">
        <ul>
            <li>
                <input type="checkbox" id="enableSorting" (click)="enableDisableSorting()" checked="true"><label for enableSorting>Enable/Disable Sorting</label>
            </li>
            <li>
                <input type="checkbox"  id="enablePagination" (click)="enableDisablePagination()"><label for enablePagination>Enable/Disable Pagination</label>
            </li>
            <li>
                <input type="checkbox"  id="enableFiltering" (click)="enableDisableFiltering()" checked="true"><label for enableFiltering>Enable/Disable Filtering</label>
            </li>
            <li>
                <input type="checkbox"  id="suppressRowSelection" (click)="enableDisableRowSelection()"><label for suppressRowSelection>Enable/Disable Row Selection</label>
            </li>
            <li>
                <input type="checkbox"  id="suppressCellSelection" (click)="enableDisableCellSelection()"><label for suppressCellSelection>Enable/Disable Cell Selection</label>
            </li>
            <li>
                <input type="checkbox"  id="editableCells" (click)="enableDisableCellEdit()"><label for editableCells>Enable/Disable Cell Edit</label>
            </li>
        </ul>
    </div>`,
    directives: [ ag.grid.AgGridNg2, NgFor, NgIf],
})
export class ChartComponent {
    public columnDefs:Array<any>;
    public rowData:Array<any>;
    public gridOptions:any;
    public showToolPanel:boolean;
    //public pageSize:any;
    private _http:Http;
    private sequence:any;


    constructor(public http:Http){

        // put columnDefs directly onto the controller
        this.columnDefs = [
            {headerName: "Name", field: "name", headerTooltip:"Task Name", width: 250, editable:false, comparator: this.sortAlphaNumeric},
            {headerName: "Period", field: "period", headerTooltip:"Task Period", width:150, editable:false, comparator: this.numberComparator, cellStyle: this.sizeCellStyle},
            {headerName: "Time", field: "executionTime", headerTooltip:"Execution Time", width:150, editable:false, comparator: this.numberComparator}
        ];

        this.gridOptions =
        {
            rowSelection: 'single', //single, multiple
            rowDeselection: true, //rows will be deselected if you hold down ctrl + click the row
            //suppressCellSelection: true, // suppresses keyboard navigation as well
            groupHeaders: false,
            enableColResize: true,
            suppressMenuHide: true,

            enableSorting: true,
            enableFilter: true,

            singleClickEdit: true,

            // events
            onReady: this.ready,
            onRowSelected: this.rowSelected,
            onRowDeselected: this.rowDeselected,
            onSelectionChanged: this.selectionChanged,
            resize: this.resize,

            //showToolPanel: true
        }

        //this.pageSize = 5;

        // put data directly onto the controller
        this._http = http;
        this.getGridData();
    }

    ready(){
        window.alert("grid is ready");
    }

    sizeCellStyle() {
        return {'text-align': 'right', 'font-weight': 'bold', color: 'red'};
    }


    resize(){
        this.refreshGrid();
        // get the grid to space out it's columns
        this.gridOptions.columnApi.sizeColumnsToFit(100);
        this.refreshGrid();
    }

    refreshGrid() {
        // get the grid to refresh
        this.gridOptions.api.refreshView();
    }

    enableDisableCellEdit(){
        // not working not sure why
        this.columnDefs.forEach( (columnDef) =>{
            //columnDef.editable = !columnDef.editable;
        });
    }

    enableDisableCellSelection(){
        this.gridOptions.suppressCellSelection = !this.gridOptions.suppressCellSelection;
    }

    enableDisableRowSelection(){
        this.gridOptions.suppressRowClickSelection = !this.gridOptions.suppressRowClickSelection;
    }

    enableDisableSorting(){
        this.gridOptions.enableSorting = !this.gridOptions.enableSorting;
        //this.gridOptions.api.RefreshHeader();
        window.alert("not working and I am not sure why");
    }

    enableDisablePagination(){
        window.alert("not implemented yet");
    }

    enableDisableFiltering(){
        this.gridOptions.enableFilter = !this.gridOptions.enableFilter;
        //this.gridOptions.api.onFilterChanged();
        this.refreshGrid();
        window.alert("not working and I am not sure why");
    }

    selectAll(){
        this.gridOptions.api.selectAll();
    }

    unSelectAll(){
        this.gridOptions.api.deselectAll();
    }

    getGridData(){
        this._http.get("http://localhost:5000/api/task")
            .map(res => res.json())
            .subscribe(seq =>  this.rowData = seq.tasks);
    }

    numberComparator(number1:any, number2:any){
        return number1 - number2;
    }

    sortAlphaNumeric(a:any, b:any){
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        var aA = a.replace(reA, "");
        var bA = b.replace(reA, "");
        if(aA === bA) {
            var aN = parseInt(a.replace(reN, ""), 10);
            var bN = parseInt(b.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        } else {
            return aA > bA ? 1 : -1;
        }
    }

    addTask(){
        window.alert("not implemented yet");
    }

    removeTask(){
        window.alert("not implemented yet");
    }

    rowDeselected(event:any) {
        window.alert("row " + event.node.data.name + " de-selected");
    }

    rowSelected(event:any) {
        window.alert("row " + event.node.data.name + " selected");
    }

    selectionChanged(event:any) {
        window.alert('selection changed, ' + event.selectedRows.length + ' rows selected');
    }
}

