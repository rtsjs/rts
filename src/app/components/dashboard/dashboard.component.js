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
var DashboardComponent = (function () {
    function DashboardComponent() {
        this.name = 'Janos';
        this.message = '';
    }
    DashboardComponent.prototype.sayHello = function () {
        this.message = 'Hello ' + this.name + '!';
    };
    DashboardComponent = __decorate([
        angular2_1.Component({ selector: 'my-dashboard' }),
        angular2_1.View({
            template: "\n\t\t<h2>Dashboard</h2>\n\t\t<div>Hello {{name}}</div>\n\t\t<input [(ng-model)]=\"name\" />\n\t\t<button (click)=\"sayHello()\">Say Hello</button>\n\t\t<p>{{message}}</p>\n\t",
            directives: [angular2_1.FORM_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [])
    ], DashboardComponent);
    return DashboardComponent;
})();
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map