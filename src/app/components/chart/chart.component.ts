import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {Router} from 'angular2/router';
import {Http, Response, Headers, HTTP_BINDINGS} from 'angular2/http';

//import {AgGridNg2} from 'ag-grid/dist/ag-grid';
declare var io: any;

@Component({ selector: 'my-chart' })

@View({
    template: `
        <table>
            <tr><h3>Tasks</h3></tr>
            <tr>
                <td align="right" vertical-align="middle">
                    <button (click)="startSimulation()">Start Simulation</button>
                    <button (click)="addNewGridItem()" type="button" title="Add a new task">
                        <img src="../../resources/images/plus.svg" width="12" height="12"/>
                    </button>
                    <div class="dropdown">
                        <button id="displayMenu" (click)="displayGridMenu()" type="button" title="Display menu"/>
                            <img id="displayMenuImg" src="../../resources/images/menu.svg" width="12" height="12"/>
                        </button>
                        <div id="gridMenuDropdown" class="dropdown-content" width="30">
                            <table>
                                <tr>
                                    <td style="padding-right:25px">
                                        <label style="color:#000000">
                                            <input id="enableSortingCheckbox" type="checkbox" (change)="gridOptions.enableSorting=$event.target.checked" />
                                            Enable sorting
                                        </label>
                                    </td>
                                 </tr>
                                 <tr>
                                    <td style="padding-right: 25px">
                                        <label style="color:#000000">
                                            <input id="enableColumnResizeCheckbox" type="checkbox" (change)="gridOptions.enableColResize=$event.target.checked" />
                                            Enable column re-size
                                        </label>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="padding-right: 25px">
                                        <button (click)="sizeToFit()" type="button" title="Size columns to fit" title="Size to fit">
                                            <img src="../../resources/images/resize.png" width="10" height="10"/>
                                        </button>
                                        <label style="color:#000000">Columns size to fit</label>
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
    directives: [(<any>window).ag.grid.AgGridNg2]
})

export class ChartComponent {
    public static http:Http;
    public static showDropDown:boolean;
    public columnDefs:Array<any>;
    public gridOptions:any;
    public rowData:Array<any>;
    socket: any;

    constructor(public http:Http){
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

        this.socket = io();

        // put columnDefs directly onto the controller
        this.columnDefs = [
            //{headerName: "...", width: 30, checkboxSelection: true, suppressSorting: true, suppressMenu: true, suppressSizeToFit: true },
            {headerName: "Name", minWidth: 100, field: "name", editable:true, padding: 10, headerTooltip:"Task name", cellStyle: {color: '#000000'}},
            {headerName: "Period", minWidth: 100, field: "period", editable:true, padding: 10,  headerTooltip:"Task period", cellStyle: {color: '#000000'}},
            {headerName: "Time", minWidth: 100, field: "executionTime", editable:true, padding: 10,  headerTooltip:"Task execution time", cellStyle: {color: '#000000'}},
            {headerName: "...", width: 60, minWidth: 60, suppressSorting: true, suppressMenu: true, suppressSizeToFit: false, editable:false, cellRenderer: this.commandsTaskRendererFunc}
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

    cellValueChanged = (event:any) => {
        if (event.oldValue == event.newValue)
            return;
    }

    modelUpdated = (event:any) => {
        console.log("model updated");
        this.refreshGrid();
    }

    readyFunc = (event:any)=> {
        console.log("grid ready");
        this.loadGridSettings();
    }

    commandsTaskRendererFunc(params:any) {
        var imageRefresh = document.createElement("img");
        imageRefresh.setAttribute("src", "../../resources/images/loop-circular.svg");
        imageRefresh.style.width = "12px";
        imageRefresh.style.height = "12px";
        imageRefresh.style.align = "middle";

        var buttonRefresh = document.createElement("button");
        buttonRefresh.style.width = 14;
        buttonRefresh.style.height = 14;
        buttonRefresh.style.align = "middle";
        buttonRefresh.style.title = "Refresh";
        buttonRefresh.appendChild(imageRefresh);
        buttonRefresh.addEventListener('click', function() {
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
        buttonDelete.addEventListener('click', function() {
            ChartComponent.prototype.deleteGridItem(params);
        });

        var parentElement = document.createElement("table");
        var row = parentElement.insertRow(0);
        var cellRefresh = row.insertCell(0);
        cellRefresh.appendChild(buttonRefresh);
        var cellDelete = row.insertCell(1);
        cellDelete.appendChild(buttonDelete);
        return parentElement;
    }

    displayGridMenu() {
        var showDropdown = document.getElementById("gridMenuDropdown").classList.toggle("show");
        if (showDropdown) {
            this.loadGridSettings();
            ChartComponent.showDropDown = true;
        }else {
            ChartComponent.showDropDown = false;
            this.saveGridSettings();
        }
    }

    sizeToFit(){
        this.gridOptions.api.sizeColumnsToFit();
    }

    loadGridSettings(){
        if (typeof(Storage) !== "undefined") {
            this.gridOptions.enableSorting = (localStorage.getItem("enableSorting") === 'true');
            document.getElementById("enableSortingCheckbox").checked = this.gridOptions.enableSorting;
            this.gridOptions.enableColResize = (localStorage.getItem("enableColResize") === 'true');
            document.getElementById("enableColumnResizeCheckbox").checked = this.gridOptions.enableColResize;
            this.gridOptions.api.refreshHeader();
        }
    }

    saveGridSettings(){
        if (typeof(Storage) !== "undefined") {
            this.gridOptions.api.refreshHeader();
            localStorage.setItem("enableSorting", this.gridOptions.enableSorting);
            localStorage.setItem("enableColResize", this.gridOptions.enableColResize);
        }
    }

    getGridData = function() {
        ChartComponent.http.get("/api/task")
            .map((res:any) => res.json())
            .subscribe((seq:any) =>  this.rowData = seq.tasks);
    }

    receiveData(){
        this.socket.on('Task data',function(msg){
            console.log(msg);
        })
    }

    addNewGridItem() {
        this.addGridItem("(click to edit name)",
            "(click to edit period)",
            "(click to edit time)");
    }

    addGridItem(name:string, period:string, executionTime:string) {
        console.log("add");
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');

        var id = (S4() + S4() + "-" + S4() + "-4" + S4().substr(0,3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();
        ChartComponent.http.post("/api/task", JSON.stringify({id:id,name:name,period:period,executionTime:executionTime}),{headers:headers})
            .map((res:any) => res.json())
            .subscribe(
                (seq:any) =>  {
                    //console.log(seq.tasks.length);
                    this.rowData = seq.tasks;
                    console.log("No Error");
                },
                (err:any) => {
                    console.log("Error:" + err);
                },
                ()=> {
                    console.log("add grid item success");
                    this.getGridData();
                });
    }

    refreshGrid() {
        // get the grid to refresh
        this.gridOptions.api.refreshView();
    }

    startSimulation() {
        ChartComponent.http.get("/api/start")
            .map((res:any) => res.json())
            .subscribe(
                (err:any) => {
                    console.log("Error:" + err);
                },
                ()=> {
                    console.log("startSimulation success");
                    this.receiveData();
                });
    }
};

ChartComponent.prototype.refreshGridItem = function(params:any) {
    var data = params.data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var updateUrl = "/api/task/:" + data.id;
    ChartComponent.http.patch(updateUrl, JSON.stringify({
            id: data.id,
            name: data.name,
            period: data.period,
            executionTime: data.executionTime
        }), {headers: headers})
        .map((res:any) => res.json())
        .subscribe(
            (seq:any) => {
                this.rowData = seq.tasks
            },
            (err:any) => {
                console.log("Error:" + err.tasks);
            },
            ()=> {
                console.log("refresh grid item success");
            });
}

ChartComponent.prototype.deleteGridItem = function(params:any) {
    var data = params.data;
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var deleteUrl = "/api/task/:" + data.id;
    ChartComponent.http.delete(deleteUrl,
        {headers:headers})
        .map((res:any) => res.json())
        .subscribe(
            (seq:any) =>  {
                console.log(seq.tasks.length);
                console.log("delete");
                this.rowData = seq.tasks
            },
            (err:any) => {
                console.log("Error:" + err);
            },
            ()=> {
                console.log("delete grid item success");
            });
}

window.onclick = function(event:any){
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
}

function S4() {
    return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
};