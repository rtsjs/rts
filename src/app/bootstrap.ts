import {bind, bootstrap} from 'angular2/angular2';
import {routerBindings, HashLocationStrategy, LocationStrategy} from 'angular2/router';
import {HTTP_BINDINGS} from "angular2/http";
import {CharacterService} from './components/character/character.service';
import {AppComponent} from './app.component';

bootstrap(AppComponent, [
	routerBindings(AppComponent),
	CharacterService,
	bind(LocationStrategy).toClass(HashLocationStrategy),
	HTTP_BINDINGS
]);
