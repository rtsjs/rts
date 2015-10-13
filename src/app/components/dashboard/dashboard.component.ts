import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, View} from 'angular2/angular2';
import {TreeView} from '../treeview/treeview.component'
import {Directory} from '../treeview/Directory'

@Component({ selector: 'my-dashboard' })
@View({
	template: `
		<h2>Dashboard</h2>
		<div>Hello {{name}}</div>
		<input [(ng-model)]="name" />
		<button (click)="sayHello()">Say Hello</button>
		<p>{{message}}</p>
		<h3>Hierarchical content</h3>
		<tree-view [directories]="directories"></tree-view>
	`,
	directives: [CORE_DIRECTIVES, TreeView, FORM_DIRECTIVES]
})

export class DashboardComponent {
	public name = 'RTS team';
	public message = '';
	directories:Array<Directory>;


	constructor() {
		let queue1 = new Directory('Queue1', [], ['4', '3', '1']);
		let simulation = new Directory('Simulation', [], ['Scheduled', 'Processing', 'Processed']);
		let status = new Directory('Status', [queue1, simulation], []);

		let processed = new Directory('Homepage for processing', [], ['Task1', 'Task2', 'Task3']);
		let history = new Directory('Processed', [processed], []);
		this.directories = [status, history];

	}

	sayHello() {
		this.message = 'Hello ' + this.name + '!';
	}
}
