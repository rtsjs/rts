var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var http_1 = require('angular2/http');
//import {AgGridNg2} from 'ag-grid/dist/ag-grid';
var ChartComponent = (function () {
    function ChartComponent(http) {
        var _this = this;
        this.http = http;
        this.cellValueChanged = function (event) {
            if (event.oldValue == event.newValue)
                return;
        };
        this.modelUpdated = function (event) {
            console.log("model updated");
            _this.refreshGrid();
        };
        this.readyFunc = function (event) {
            console.log("grid ready");
            _this.loadGridSettings();
        };
        this.getGridData = function () {
            var _this = this;
            ChartComponent.http.get("/api/task")
                .map(function (res) { return res.json(); })
                .subscribe(function (seq) { return _this.rowData = seq.tasks; });
        };
        ChartComponent.showDropDown = false;
        this.gridOptions = {
            pinnedColumnCount: 0,
            rowSelection: 'none',
            onModelUpdated: this.modelUpdated,
            onCellValueChanged: this.cellValueChanged,
            onReady: this.readyFunc,
            rowData: null,
            sizeToFit: true,
            enableSorting: false,
            enableColResize: false,
            suppressCellSelection: true,
            singleClickEdit: true
        };
        // put columnDefs directly onto the controller
        this.columnDefs = [
            //{headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
            { headerName: "Name", minWidth: 100, field: "name", editable: true, padding: 10, headerTooltip: "Task name", cellStyle: { color: '#000000' } },
            { headerName: "Period", minWidth: 100, field: "period", editable: true, padding: 10, headerTooltip: "Task period", cellStyle: { color: '#000000' } },
            { headerName: "Time", minWidth: 100, field: "executionTime", editable: true, padding: 10, headerTooltip: "Task execution time", cellStyle: { color: '#000000' } },
            { headerName: "...", width: 60, minWidth: 60, suppressSorting: true, suppressMenu: true, suppressSizeToFit: false, editable: false, cellRenderer: this.commandsTaskRendererFunc }
        ];
        /*
         this.rowData = [
         {name: "T1", period: "1", executionTime: 12},
         {name: "T2", period: "2", executionTime: 13},
         {name: "T3", period: "3", executionTime: 14}
         ];
         */
        // put data directly onto the controller
        ChartComponent.http = http;
        this.getGridData();
    }
    ChartComponent.prototype.commandsTaskRendererFunc = function (params) {
        var imageRefresh = document.createElement("img");
        imageRefresh.setAttribute("src", "../../resources/images/loop-circular.svg");
        imageRefresh.style.width = "12px";
        imageRefresh.style.height = "12px";
        imageRefresh.style.align = "middle";
        var buttonRefresh = document.createElement("button");
        buttonRefresh.style.width = "14px";
        buttonRefresh.style.height = "14px";
        buttonRefresh.style.align = "middle";
        buttonRefresh.style.title = "Refresh";
        buttonRefresh.appendChild(imageRefresh);
        buttonRefresh.addEventListener('click', function () {
            ChartComponent.prototype.refreshGridItem(params);
        });
        var imageDelete = document.createElement("img");
        imageDelete.setAttribute("src", "../../resources/images/trash.png");
        imageDelete.style.width = "12px";
        imageDelete.style.height = "12px";
        imageDelete.style.align = "middle";
        var buttonDelete = document.createElement("button");
        buttonDelete.style.width = 14;
        buttonDelete.style.height = 14;
        buttonDelete.style.align = "middle";
        buttonDelete.style.title = "Delete task";
        buttonDelete.appendChild(imageDelete);
        buttonDelete.addEventListener('click', function () {
            ChartComponent.prototype.deleteGridItem(params);
        });
        var parentElement = document.createElement("table");
        var row = parentElement.insertRow(0);
        var cellRefresh = row.insertCell(0);
        cellRefresh.appendChild(buttonRefresh);
        var cellDelete = row.insertCell(1);
        cellDelete.appendChild(buttonDelete);
        return parentElement;
    };
    ChartComponent.prototype.displayGridMenu = function () {
        var showDropdown = document.getElementById("gridMenuDropdown").classList.toggle("show");
        if (showDropdown) {
            this.loadGridSettings();
            ChartComponent.showDropDown = true;
        }
        else {
            ChartComponent.showDropDown = false;
            this.saveGridSettings();
        }
    };
    ChartComponent.prototype.sizeToFit = function () {
        this.gridOptions.api.sizeColumnsToFit();
    };
    ChartComponent.prototype.loadGridSettings = function () {
        if (typeof (Storage) !== "undefined") {
            this.gridOptions.enableSorting = (localStorage.getItem("enableSorting") === 'true');
            document.getElementById("enableSortingCheckbox").checked = this.gridOptions.enableSorting;
            this.gridOptions.enableColResize = (localStorage.getItem("enableColResize") === 'true');
            document.getElementById("enableColumnResizeCheckbox").checked = this.gridOptions.enableColResize;
            this.gridOptions.api.refreshHeader();
        }
    };
    ChartComponent.prototype.saveGridSettings = function () {
        if (typeof (Storage) !== "undefined") {
            this.gridOptions.api.refreshHeader();
            localStorage.setItem("enableSorting", this.gridOptions.enableSorting);
            localStorage.setItem("enableColResize", this.gridOptions.enableColResize);
        }
    };
    ChartComponent.prototype.addNewGridItem = function () {
        this.addGridItem("(click to edit name)", "(click to edit period)", "(click to edit time)");
    };
    ChartComponent.prototype.addGridItem = function (name, period, executionTime) {
        var _this = this;
        console.log("add");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        var id = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        ChartComponent.http.post("/api/task", JSON.stringify({ id: id, name: name, period: period, executionTime: executionTime }), { headers: headers })
            .map(function (res) { return res.json(); })
            .subscribe(function (seq) {
            //console.log(seq.tasks.length);
            _this.rowData = seq.tasks;
            console.log("No Error");
        }, function (err) {
            console.log("Error:" + err);
        }, function () {
            console.log("add grid item success");
            _this.getGridData();
        });
    };
    ChartComponent.prototype.refreshGrid = function () {
        // get the grid to refresh
        this.gridOptions.api.refreshView();
    };
    ChartComponent.prototype.startSimulation = function () {
        ChartComponent.http.get("/api/start")
            .map(function (res) { return res.json(); })
            .subscribe(function (err) {
            console.log("Error:" + err);
        }, function () {
            console.log("startSimulation success");
        });
    };
    ChartComponent = __decorate([
        angular2_1.Component({ selector: 'my-chart' }),
        angular2_1.View({
            template: "\n        <table>\n            <tr><h3>Tasks</h3></tr>\n            <tr>\n                <td align=\"right\" vertical-align=\"middle\">\n                    <button (click)=\"startSimulation()\">Start Simulation</button>\n                    <button (click)=\"addNewGridItem()\" type=\"button\" title=\"Add a new task\">\n                        <img src=\"../../resources/images/plus.svg\" width=\"12\" height=\"12\"/>\n                    </button>\n                    <div class=\"dropdown\">\n                        <button id=\"displayMenu\" (click)=\"displayGridMenu()\" type=\"button\" title=\"Display menu\"/>\n                            <img id=\"displayMenuImg\" src=\"../../resources/images/menu.svg\" width=\"12\" height=\"12\"/>\n                        </button>\n                        <div id=\"gridMenuDropdown\" class=\"dropdown-content\" width=\"30\">\n                            <table>\n                                <tr>\n                                    <td style=\"padding-right:25px\">\n                                        <label style=\"color:#000000\">\n                                            <input id=\"enableSortingCheckbox\" type=\"checkbox\" (change)=\"gridOptions.enableSorting=$event.target.checked\" />\n                                            Enable sorting\n                                        </label>\n                                    </td>\n                                 </tr>\n                                 <tr>\n                                    <td style=\"padding-right: 25px\">\n                                        <label style=\"color:#000000\">\n                                            <input id=\"enableColumnResizeCheckbox\" type=\"checkbox\" (change)=\"gridOptions.enableColResize=$event.target.checked\" />\n                                            Enable column re-size\n                                        </label>\n                                    </td>\n                                </tr>\n\n                                <tr>\n                                    <td style=\"padding-right: 25px\">\n                                        <button (click)=\"sizeToFit()\" type=\"button\" title=\"Size columns to fit\" title=\"Size to fit\">\n                                            <img src=\"../../resources/images/resize.png\" width=\"10\" height=\"10\"/>\n                                        </button>\n                                        <label style=\"color:#000000\">Columns size to fit</label>\n                                    </td>\n                                </tr>\n                            </table>\n                        </div>\n                    </div>\n                </td>\n            </tr>\n            <tr>\n                <td>\n                    <ag-grid-ng2 id=\"tasks\" class=\"ag-fresh\"  style=\"height: 500px;\"\n                        [column-defs]=\"columnDefs\"\n                        [row-data]=\"rowData\"\n                        [grid-options]=\"gridOptions\"\n                        [row-selection]=\"none\"\n                        row-height=\"35\">\n                    </ag-grid-ng2>\n                </td>\n            </tr>\n        </table>\n   ",
            directives: [window.ag.grid.AgGridNg2]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ChartComponent);
    return ChartComponent;
})();
exports.ChartComponent = ChartComponent;
;
ChartComponent.prototype.refreshGridItem = function (params) {
    var _this = this;
    var data = params.data;
    var headers = new http_1.Headers();
    headers.append('Content-Type', 'application/json');
    var updateUrl = "/api/task/:" + data.id;
    ChartComponent.http.patch(updateUrl, JSON.stringify({
        id: data.id,
        name: data.name,
        period: data.period,
        executionTime: data.executionTime
    }), { headers: headers })
        .map(function (res) { return res.json(); })
        .subscribe(function (seq) {
        _this.rowData = seq.tasks;
    }, function (err) {
        console.log("Error:" + err.tasks);
    }, function () {
        console.log("refresh grid item success");
    });
};
ChartComponent.prototype.deleteGridItem = function (params) {
    var _this = this;
    var data = params.data;
    var headers = new http_1.Headers();
    headers.append('Content-Type', 'application/json');
    var deleteUrl = "/api/task/:" + data.id;
    ChartComponent.http.delete(deleteUrl, { headers: headers })
        .map(function (res) { return res.json(); })
        .subscribe(function (seq) {
        console.log(seq.tasks.length);
        console.log("delete");
        _this.rowData = seq.tasks;
    }, function (err) {
        console.log("Error:" + err);
    }, function () {
        console.log("delete grid item success");
    });
};
window.onclick = function (event) {
    event = event || window.event;
    event = event.target || event.srcElement;
    if (event.matches('.dropdown')) {
        if (ChartComponent.showDropDown) {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (var i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
};
function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
;

//# sourceMappingURL=chart.component.js.map
