import {Component, FORM_DIRECTIVES, View} from 'angular2/angular2';

@Component({ selector: 'my-priorityqueue' })
@View({
    template: `
		<h2>Priority Queue</h2>
		<div>Hello {{name}}</div>
		<input [(ng-model)]="name" />
		<button (click)="sayHello()">Say Hello</button>
		<p>{{message}}</p>
	`,
    directives: [FORM_DIRECTIVES]
})
export class PriorityQueueComponent {
    public name = 'Janos';
    public message = '';

    sayHello() {
        this.message = 'Hello ' + this.name + '!';
    }
}
