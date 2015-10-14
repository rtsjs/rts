import {Component, NgFor, NgIf, View} from 'angular2/angular2';
import {PriorityQueue} from './priorityqueue'

@Component({ selector: 'my-priorityqueue' })
@View({
    template: `
		<h2>Priority Queue</h2>
        <ul >
          <li *ng-for="#result of results" >
          {{result}}
          </li>
        </ul>
	`,
    directives: [NgFor, NgIf],
})
export class PriorityQueueComponent {
    //results:Array<number>;
    private data:Array<number> = [ 9, 8908, 7, 4, 6, 4, 500, 4, 3, 2, 1, 11];
    private _results:Array<number> = [];


    private pq:PriorityQueue;

    constructor () {
        this.pq = new PriorityQueue(function (a:number, b:number) {
            return a < b
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

    public get results() {
        return this._results;
    }
}
