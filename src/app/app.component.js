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
var router_1 = require('angular2/router');
var characters_component_1 = require('./components/character/characters.component');
var dashboard_component_1 = require('./components/dashboard/dashboard.component');
var priorityqueue_component_1 = require('./components/priorityqueue/priorityqueue.component');
var chart_component_1 = require('./components/chart/chart.component');
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        angular2_1.Component({ selector: 'my-app' }),
        angular2_1.View({
            template: "\n    <a [router-link]=\"['./PriorityQueue']\">PriorityQueue</a>\n    <a [router-link]=\"['./Dashboard']\">Dashboard</a>\n    <a [router-link]=\"['./Characters']\">Characters</a>\n    <a [router-link]=\"['./Chart']\">Tasks</a>\n    <router-outlet></router-outlet>\n    ",
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/', as: 'PriorityQueue', component: priorityqueue_component_1.PriorityQueueComponent },
            { path: '/dashboard', as: 'Dashboard', component: dashboard_component_1.DashboardComponent },
            { path: '/characters', as: 'Characters', component: characters_component_1.CharactersComponent },
            { path: '/chart', as: 'Chart', component: chart_component_1.ChartComponent },
        ]), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
})();
exports.AppComponent = AppComponent;

//# sourceMappingURL=app.component.js.map
