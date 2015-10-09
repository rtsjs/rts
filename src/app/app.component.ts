import {View, Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {CharactersComponent} from './components/character/characters.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PriorityQueueComponent} from './components/priorityqueue/priorityqueue.component';

@Component({ selector: 'my-app' })
@View({
  template: `
    <a [router-link]="['./Dashboard']">Dashboard</a>
    <a [router-link]="['./Characters']">Characters</a>
    <a [router-link]="['./PriorityQueue']">PriorityQueue</a>
    <router-outlet></router-outlet>
    `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', as: 'Dashboard', component: DashboardComponent },
  { path: '/characters', as: 'Characters', component: CharactersComponent },
  { path: '/priorityqueue', as: 'PriorityQueue', component: PriorityQueueComponent }
])
export class AppComponent { }
