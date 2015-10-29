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
            { headerName: "Name", field: "name", headerTooltip: "Task Name", width: 250, editable: false, comparator: this.sortAlphaNumeric },
            { headerName: "Period", field: "period", headerTooltip: "Task Period", width: 150, editable: false, comparator: this.numberComparator, cellStyle: this.sizeCellStyle },
            { headerName: "Time", field: "executionTime", headerTooltip: "Execution Time", width: 150, editable: false, comparator: this.numberComparator }
        ];
        this.gridOptions =
            {
                rowSelection: 'single',
                rowDeselection: true,
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
            };
        //this.pageSize = 5;
        // put data directly onto the controller
        this._http = http;
        this.getGridData();
    }
    ChartComponent.prototype.ready = function () {
        window.alert("grid is ready");
    };
    ChartComponent.prototype.sizeCellStyle = function () {
        return { 'text-align': 'right', 'font-weight': 'bold', color: 'red' };
    };
    ChartComponent.prototype.resize = function () {
        this.refreshGrid();
        // get the grid to space out it's columns
        this.gridOptions.columnApi.sizeColumnsToFit(100);
        this.refreshGrid();
    };
    ChartComponent.prototype.refreshGrid = function () {
        // get the grid to refresh
        this.gridOptions.api.refreshView();
    };
    ChartComponent.prototype.enableDisableCellEdit = function () {
        // not working not sure why
        this.columnDefs.forEach(function (columnDef) {
            //columnDef.editable = !columnDef.editable;
        });
    };
    ChartComponent.prototype.enableDisableCellSelection = function () {
        this.gridOptions.suppressCellSelection = !this.gridOptions.suppressCellSelection;
    };
    ChartComponent.prototype.enableDisableRowSelection = function () {
        this.gridOptions.suppressRowClickSelection = !this.gridOptions.suppressRowClickSelection;
    };
    ChartComponent.prototype.enableDisableSorting = function () {
        this.gridOptions.enableSorting = !this.gridOptions.enableSorting;
        //this.gridOptions.api.RefreshHeader();
        window.alert("not working and I am not sure why");
    };
    ChartComponent.prototype.enableDisablePagination = function () {
        window.alert("not implemented yet");
    };
    ChartComponent.prototype.enableDisableFiltering = function () {
        this.gridOptions.enableFilter = !this.gridOptions.enableFilter;
        //this.gridOptions.api.onFilterChanged();
        this.refreshGrid();
        window.alert("not working and I am not sure why");
    };
    ChartComponent.prototype.selectAll = function () {
        this.gridOptions.api.selectAll();
    };
    ChartComponent.prototype.unSelectAll = function () {
        this.gridOptions.api.deselectAll();
    };
    ChartComponent.prototype.getGridData = function () {
        var _this = this;
        this._http.get("http://localhost:5000/api/task")
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) { return _this.rowData = seq.tasks; });
    };
    ChartComponent.prototype.numberComparator = function (number1, number2) {
        return number1 - number2;
    };
    ChartComponent.prototype.sortAlphaNumeric = function (a, b) {
        var reA = /[^a-zA-Z]/g;
        var reN = /[^0-9]/g;
        var aA = a.replace(reA, "");
        var bA = b.replace(reA, "");
        if (aA === bA) {
            var aN = parseInt(a.replace(reN, ""), 10);
            var bN = parseInt(b.replace(reN, ""), 10);
            return aN === bN ? 0 : aN > bN ? 1 : -1;
        }
        else {
            return aA > bA ? 1 : -1;
        }
    };
    ChartComponent.prototype.addTask = function () {
        window.alert("not implemented yet");
    };
    ChartComponent.prototype.removeTask = function () {
        window.alert("not implemented yet");
    };
    ChartComponent.prototype.rowDeselected = function (event) {
        window.alert("row " + event.node.data.name + " de-selected");
    };
    ChartComponent.prototype.rowSelected = function (event) {
        window.alert("row " + event.node.data.name + " selected");
    };
    ChartComponent.prototype.selectionChanged = function (event) {
        window.alert('selection changed, ' + event.selectedRows.length + ' rows selected');
    };
    ChartComponent = __decorate([
        angular2_1.Component({ selector: 'my-chart' }),
        angular2_1.View({
            template: "\n\t\t<h3>AG Grid</h3>\n\t\t<ag-grid-ng2 id=\"tasks\" class=\"ag-fresh\"  style=\"height: 500px;\"\n\t\t[grid-options]=\"gridOptions\"\n\t\t[page-size]=\"pageSize\"\n        [column-defs]=\"columnDefs\"\n        [row-data]=\"rowData\">\n      </ag-grid-ng2>\n      <br/>\n<button type=\"button\" (click)=\"getGridData()\">Refresh Grid</button>\n<button type=\"button\" (click)=\"selectAll()\">Select All</button>\n<button type=\"button\" (click)=\"unSelectAll()\">Un-Select All</button>\n<button type=\"button\" (click)=\"addTask()\">Add task</button>\n<button type=\"button\" (click)=\"removeTask()\">Remove task</button>\n<br />\n<br />\n    <div id=\"menu\">\n        <ul>\n            <li>\n                <input type=\"checkbox\" id=\"enableSorting\" (click)=\"enableDisableSorting()\" checked=\"true\"><label for enableSorting>Enable/Disable Sorting</label>\n            </li>\n            <li>\n                <input type=\"checkbox\"  id=\"enablePagination\" (click)=\"enableDisablePagination()\"><label for enablePagination>Enable/Disable Pagination</label>\n            </li>\n            <li>\n                <input type=\"checkbox\"  id=\"enableFiltering\" (click)=\"enableDisableFiltering()\" checked=\"true\"><label for enableFiltering>Enable/Disable Filtering</label>\n            </li>\n            <li>\n                <input type=\"checkbox\"  id=\"suppressRowSelection\" (click)=\"enableDisableRowSelection()\"><label for suppressRowSelection>Enable/Disable Row Selection</label>\n            </li>\n            <li>\n                <input type=\"checkbox\"  id=\"suppressCellSelection\" (click)=\"enableDisableCellSelection()\"><label for suppressCellSelection>Enable/Disable Cell Selection</label>\n            </li>\n            <li>\n                <input type=\"checkbox\"  id=\"editableCells\" (click)=\"enableDisableCellEdit()\"><label for editableCells>Enable/Disable Cell Edit</label>\n            </li>\n        </ul>\n    </div>",
            directives: [ag.grid.AgGridNg2, angular2_1.NgFor, angular2_1.NgIf],
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChartComponent);
    return ChartComponent;
})();
exports.ChartComponent = ChartComponent;

//# sourceMappingURL=chart.component.js.map
