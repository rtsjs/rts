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
var treeview_component_1 = require('../treeview/treeview.component');
var Directory_1 = require('../treeview/Directory');
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.name = 'RTS team';
        this.message = '';
        var queue1 = new Directory_1.Directory('Queue1', [], ['4', '3', '1']);
        var simulation = new Directory_1.Directory('Simulation', [], ['Scheduled', 'Processing', 'Processed']);
        var status = new Directory_1.Directory('Status', [queue1, simulation], []);
        var processed = new Directory_1.Directory('[Homepage] - C:\\ccu2.sld', [], ['Task1', 'Task2', 'Task3']);
        var history = new Directory_1.Directory('Processed', [processed], []);
        this.directories = [status, history];
    }
    DashboardComponent.prototype.sayHello = function () {
        this.message = 'Hello ' + this.name + '!';
    };
    DashboardComponent = __decorate([
        angular2_1.Component({ selector: 'my-dashboard' }),
        angular2_1.View({
            template: "\n\t\t<h2>Dashboard</h2>\n\t\t<div>Hello {{name}}</div>\n\t\t<input [(ng-model)]=\"name\" />\n\t\t<button (click)=\"sayHello()\">Say Hello</button>\n\t\t<p>{{message}}</p>\n\t\t<h3>Hierarchical content</h3>\n\t\t<tree-view [directories]=\"directories\"></tree-view>\n\t",
            directives: [angular2_1.CORE_DIRECTIVES, treeview_component_1.TreeView, angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
})();
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map