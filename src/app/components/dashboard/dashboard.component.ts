import {Component, CORE_DIRECTIVES, FORM_DIRECTIVES, View} from 'angular2/angular2';
import {TreeView} from '../treeview/treeview.component'
import {Directory} from '../treeview/Directory'
import {Router} from 'angular2/router';
import {Http, Response, Headers, HTTP_BINDINGS} from 'angular2/http';

@Component({ selector: 'my-dashboard' })
@View({
	template: `
		<h2>Dashboard</h2>
		<div>Hello {{name}}</div>
		<input [(ng-model)]="name" />
		<button (click)="sayHello()">Say Hello</button>
		<p>{{message}}</p>
		<button (click)="startSimulation()">Start Simulation</button>
		<h3>Hierarchical content</h3>
		<tree-view [directories]="directories"></tree-view>
	`,
	directives: [CORE_DIRECTIVES, TreeView, FORM_DIRECTIVES]
})

export class DashboardComponent {
	private _http:Http;
	public name = 'RTS team';
	public message = '';
	directories:Array<Directory>;

	constructor(public http:Http) {
		let queue1 = new Directory('Queue1', [], ['4', '3', '1']);
		let simulation = new Directory('Simulation', [], ['Scheduled', 'Processing', 'Processed']);
		let status = new Directory('Status', [queue1, simulation], []);

		let processed = new Directory('Homepage for processing', [], ['Task1', 'Task2', 'Task3']);
		let history = new Directory('Processed', [processed], []);
		this.directories = [status, history];
		this._http = http;
	}

	sayHello() {
		this.message = 'Hello ' + this.name + '!';
	}

	startSimulation() {
		this._http.get("/api/start")
			.map(res => res.json())
			.subscribe(seq =>  seq);
	}
}
