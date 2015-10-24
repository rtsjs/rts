import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';

@Component({ selector: 'my-chart' })

@View({
    template: `
		<h3>AG Grid</h3>
		<ag-grid-ng2 id="cars" class="ag-fresh"
        [column-defs]="columnDefs" [row-data]="rowData">
      </ag-grid-ng2>
	`,

    directives: [ ag.grid.AgGridNg2, NgFor, NgIf],
})
export class ChartComponent {
    public columnDefs:Array<any>;
    public rowData:Array<any>;

    constructor(){
        // put columnDefs directly onto the controller
        this.columnDefs = [
            {headerName: "Make", field: "make"},
            {headerName: "Model", field: "model"},
            {headerName: "Price", field: "price"}
        ];
        // put data directly onto the controller
        this.rowData = [
            {make: "Toyota", model: "Celica", price: 35000},
            {make: "Ford", model: "Mondeo", price: 32000},
            {make: "Porsche", model: "Boxter", price: 72000}
        ];

    }
}

