import {View, Component} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {CharactersComponent} from './components/character/characters.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {PriorityQueueComponent} from './components/priorityqueue/priorityqueue.component';
import {ChartComponent} from './components/chart/chart.component';

@Component({ selector: 'my-app' })
@View({
  template: `
    <a [router-link]="['./PriorityQueue']">PriorityQueue</a>
    <a [router-link]="['./Dashboard']">Dashboard</a>
    <a [router-link]="['./Characters']">Characters</a>
    <a [router-link]="['./Chart']">Chart</a>
    <router-outlet></router-outlet>
    `,
  directives: [ROUTER_DIRECTIVES]
})
@RouteConfig([
  { path: '/', as: 'PriorityQueue', component: PriorityQueueComponent },
  { path: '/dashboard', as: 'Dashboard', component: DashboardComponent },
  { path: '/characters', as: 'Characters', component: CharactersComponent },
  { path: '/chart', as: 'Chart', component: ChartComponent },
])
export class AppComponent { }
