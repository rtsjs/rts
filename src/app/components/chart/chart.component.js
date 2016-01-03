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
        var _this = this;
        this.http = http;
        this.cellValueChangedFunc = function (event) {
            if (event.newValue == event.oldValue) {
                return;
            }
            if (event.colDef.field == 'name') {
                _this.oldTaskName = event.oldValue;
            }
        };
        this.cellClickedFunc = function ($event) {
            console.log('onCellClicked: ' + $event.rowIndex + ' ' + $event.colDef.field);
            // the binding does not work? so I have to do this
            if ($event.colDef.field == undefined) {
                _this.deleteTask();
                return;
            }
            else {
                if (ChartComponent.rowIndex != $event.rowIndex) {
                    _this.updateTask();
                }
                ChartComponent.rowIndex = $event.rowIndex;
            }
        };
        this.modelUpdatedFunc = function (event) {
        };
        this.readyFunc = function (event) {
            event.api.sizeColumnsToFit();
        };
        this.rowDeselectedFunc = function (event) {
            _this.previousSelectedTask = _this.selectedTask;
        };
        this.rowSelectedFunc = function (event) {
            _this.selectedTask = event.node.data;
        };
        this.selectionChangedFunc = function ($event) {
        };
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
        };
        //this.pageSize = '10';
        // put columnDefs directly onto the controller
        this.columnDefs = [
            //{headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
            { headerName: "Name", field: "name", editable: true, padding: 10, headerTooltip: "Task name", cellStyle: { color: '#000000' } },
            { headerName: "Period", field: "period", editable: true, padding: 10, headerTooltip: "Task period", cellStyle: { color: '#000000' } },
            { headerName: "Time", field: "executionTime", editable: true, padding: 10, headerTooltip: "Task execution time", cellStyle: { color: '#000000' } },
            { headerName: "...", width: 50, suppressSorting: true, suppressMenu: true, suppressSizeToFit: false, editable: false, cellRenderer: this.deleteTaskRendererFunc }
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
    ChartComponent.prototype.deleteTaskRendererFunc = function () {
        console.log("delete task handler");
        return '<button width="14" height="14" align="middle" (click)="this.deleteTask()">' +
            '<img src="../../resources/images/trash.png" width="12" height="12"/>' +
            '</button>';
    };
    ChartComponent.prototype.getGridData = function () {
        var _this = this;
        this._http.get("/api/task")
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) { return _this.rowData = seq.tasks; });
    };
    ChartComponent.prototype.addNewTask = function () {
        this.addTask("(Name)", "(Period)", "(Time)");
    };
    ChartComponent.prototype.addTask = function (name, period, executionTime) {
        var _this = this;
        if (name.length == 0 || period.length == 0 || executionTime.length == 0) {
            console.log("invalid input");
            return;
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var res = this._http.post("/api/addTask", JSON.stringify({ name: name, period: period, executionTime: executionTime }), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) {
            _this.rowData = seq.tasks;
        });
    };
    ChartComponent.prototype.updateTask = function () {
        var _this = this;
        if (this.selectedTask == null) {
            console.log("select a task");
            return;
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post("/api/updateTask", JSON.stringify({
            oldName: this.oldTaskName,
            name: this.previousSelectedTask.name,
            period: this.previousSelectedTask.period,
            executionTime: this.previousSelectedTask.executionTime
        }), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) {
            _this.rowData = seq.tasks;
        });
        this.oldTaskName = "";
    };
    ChartComponent.prototype.deleteTask = function () {
        var _this = this;
        if (this.selectedTask == null) {
            console.log("select a task");
            return;
        }
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        this._http.post("/api/deleteTask", JSON.stringify({ name: this.selectedTask.name, period: this.selectedTask.period, executionTime: this.selectedTask.executionTime }), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) {
            _this.rowData = seq.tasks;
        });
    };
    ChartComponent.rowIndex = 0;
    ChartComponent = __decorate([
        angular2_1.Component({ selector: 'my-chart' }),
        angular2_1.View({
            template: "\n        <table>\n            <tr><h3>AG Grid</h3></tr>\n            <tr>\n                <td align=\"right\" vertical-align=\"middle\">\n                    <button (click)=\"addNewTask()\">\n                        <img src=\"../../resources/images/plus.svg\" width=\"12\" height=\"12\"/>\n                    </button>\n                    <button (click)=\"getGridData()\">\n                        <img src=\"../../resources/images/loop-circular.svg\" width=\"12\" height=\"12\"/>\n                    </button>\n                </td>\n            </tr>\n            <tr>\n                <td>\n                    <ag-grid-ng2 id=\"tasks\" class=\"ag-fresh\"  style=\"height: 500px;\"\n                        [column-defs]=\"columnDefs\"\n                        [row-data]=\"rowData\"\n                        [grid-options]=\"gridOptions\"\n                        [enable-col-resize]=\"true\"\n                        [enable-sorting]=\"true\"\n                        [row-selection]=\"none\"\n                        row-height=\"35\">\n                    </ag-grid-ng2>\n                </td>\n            </tr>\n        </table>\n   ",
            directives: [ag.grid.AgGridNg2],
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof http_1.Http !== 'undefined' && http_1.Http) === 'function' && _a) || Object])
    ], ChartComponent);
    return ChartComponent;
    var _a;
})();
exports.ChartComponent = ChartComponent;
;

//# sourceMappingURL=chart.component.js.map
