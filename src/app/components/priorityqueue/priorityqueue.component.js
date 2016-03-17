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
var priorityqueue_1 = require('./priorityqueue');
var PriorityQueueComponent = (function () {
    function PriorityQueueComponent() {
        //results:Array<number>;
        this.data = [993, 8908, 7, 4, 6, 4, 500, 4, 3, 2, 1, 11];
        this._results = [];
        this.pq = new priorityqueue_1.PriorityQueue(function (a, b) {
            return a < b;
        });
        for (var i = 0; i < this.data.length; i++) {
            this.pq.push(this.data[i]);
        }
        for (var j = 0; j < this.data.length; j++) {
            //document.writeln(pq.peek());
            this._results.push(this.pq.pop());
        }
        //this.results = this._results;
    }
    Object.defineProperty(PriorityQueueComponent.prototype, "results", {
        get: function () {
            return this._results;
        },
        enumerable: true,
        configurable: true
    });
    PriorityQueueComponent = __decorate([
        angular2_1.Component({ selector: 'my-priorityqueue' }),
        angular2_1.View({
            template: "\n\t\t<h2>Priority Queue</h2>\n        <ul >\n          <li *ng-for=\"#result of results\" >\n          {{result}}\n          </li>\n        </ul>\n\t",
            directives: [angular2_1.NgFor, angular2_1.NgIf],
        }), 
        __metadata('design:paramtypes', [])
    ], PriorityQueueComponent);
    return PriorityQueueComponent;
})();
exports.PriorityQueueComponent = PriorityQueueComponent;

//# sourceMappingURL=priorityqueue.component.js.map
