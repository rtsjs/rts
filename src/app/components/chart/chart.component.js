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
var http_1 = require('angular2/http');
//import {ag.grid.AgGridNg2} from 'ag-grid/dist/ag-grid';
var ChartComponent = (function () {
    function ChartComponent(http) {
        this.http = http;
        // put columnDefs directly onto the controller
        this.columnDefs = [
            { headerName: "Name", field: "name" },
            { headerName: "Period", field: "period" },
            { headerName: "Time", field: "executionTime" }
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
    ChartComponent.prototype.getGridData = function () {
        var _this = this;
        this._http.get("http://localhost:5000/api/task")
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) { return _this.rowData = seq.tasks; });
    };
    ChartComponent = __decorate([
        angular2_1.Component({ selector: 'my-chart' }),
        angular2_1.View({
            template: "\n\t\t<h3>AG Grid</h3>\n\t\t<ag-grid-ng2 id=\"cars\" class=\"ag-fresh\"  style=\"height: 500px;\"\n        [column-defs]=\"columnDefs\" [row-data]=\"rowData\">\n      </ag-grid-ng2>\n      <br/>\n<button type=\"button\" (click)=\"getGridData()\">Refresh Grid</button>\n\t",
            directives: [ag.grid.AgGridNg2, angular2_1.NgFor, angular2_1.NgIf],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChartComponent);
    return ChartComponent;
})();
exports.ChartComponent = ChartComponent;

//# sourceMappingURL=chart.component.js.map
