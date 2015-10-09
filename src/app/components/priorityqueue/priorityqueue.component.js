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
var priorityqueue_1 = require('./priorityqueue');
var PriorityQueueComponent = (function () {
    function PriorityQueueComponent() {
        /*
            public name = 'Janos';
            public message = '';
        */
        this.data = [10, 9, 8908, 7, 4, 6, 4, 500, 4, 3, 2, 1];
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
            template: "\n\t\t<h2>Priority Queue</h2>\n            {{1+1}}\n\t\t<span>{{results}}</span>\n        <ul >\n          <li *ng-for=\"#result of results\" \">\n          </li>\n        </ul>\n\t",
            directives: [angular2_1.NgFor, angular2_1.NgIf],
        }), 
        __metadata('design:paramtypes', [])
    ], PriorityQueueComponent);
    return PriorityQueueComponent;
})();
exports.PriorityQueueComponent = PriorityQueueComponent;
//# sourceMappingURL=priorityqueue.component.js.map