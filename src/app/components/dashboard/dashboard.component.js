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
var treeview_component_1 = require('../treeview/treeview.component');
var Directory_1 = require('../treeview/Directory');
var http_1 = require('angular2/http');
var DashboardComponent = (function () {
    function DashboardComponent(http) {
        this.http = http;
        this.name = 'RTS team';
        this.message = '';
        var queue1 = new Directory_1.Directory('Queue1', [], ['4', '3', '1']);
        var simulation = new Directory_1.Directory('Simulation', [], ['Scheduled', 'Processing', 'Processed']);
        var status = new Directory_1.Directory('Status', [queue1, simulation], []);
        var processed = new Directory_1.Directory('Homepage for processing', [], ['Task1', 'Task2', 'Task3']);
        var history = new Directory_1.Directory('Processed', [processed], []);
        this.directories = [status, history];
        this._http = http;
    }
    DashboardComponent.prototype.sayHello = function () {
        this.message = 'Hello ' + this.name + '!';
    };
    DashboardComponent.prototype.startSimulation = function () {
        this._http.get("/api/start")
            .map(function (res) { return res.json(); })
            .subscribe(function (err) {
            console.log("Error:" + err);
        }, function () {
            console.log("startSimulation success");
        });
    };
    DashboardComponent = __decorate([
        angular2_1.Component({ selector: 'my-dashboard' }),
        angular2_1.View({
            template: "\n\t\t<h2>Dashboard</h2>\n\t\t<div>Hello {{name}}</div>\n\t\t<input [(ng-model)]=\"name\" />\n\t\t<button (click)=\"sayHello()\">Say Hello</button>\n\t\t<p>{{message}}</p>\n\t\t<button (click)=\"startSimulation()\">Start Simulation</button>\n\t\t<h3>Hierarchical content</h3>\n\t\t<tree-view [directories]=\"directories\"></tree-view>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, treeview_component_1.TreeView, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DashboardComponent);
    return DashboardComponent;
})();
exports.DashboardComponent = DashboardComponent;

//# sourceMappingURL=dashboard.component.js.map
