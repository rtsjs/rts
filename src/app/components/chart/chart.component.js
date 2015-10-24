var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';
var ChartComponent = (function () {
    function ChartComponent() {
        // put columnDefs directly onto the controller
        this.columnDefs = [
            { headerName: "Make", field: "make" },
            { headerName: "Model", field: "model" },
            { headerName: "Price", field: "price" }
        ];
        // put data directly onto the controller
        this.rowData = [
            { make: "Toyota", model: "Celica", price: 35000 },
            { make: "Ford", model: "Mondeo", price: 32000 },
            { make: "Porsche", model: "Boxter", price: 72000 }
        ];
    }
    ChartComponent = __decorate([
        angular2_1.Component({ selector: 'my-chart' }),
        angular2_1.View({
            template: "\n\t\t<h3>AG Grid</h3>\n\t\t<ag-grid-ng2 id=\"cars\" class=\"ag-fresh\"\n        [column-defs]=\"columnDefs\" [row-data]=\"rowData\">\n      </ag-grid-ng2>\n\t",
            directives: [ag.grid.AgGridNg2, angular2_1.NgFor, angular2_1.NgIf],
        }), 
        __metadata('design:paramtypes', [])
    ], ChartComponent);
    return ChartComponent;
})();
exports.ChartComponent = ChartComponent;

//# sourceMappingURL=chart.component.js.map
