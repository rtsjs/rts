import {Component, View, CORE_DIRECTIVES} from  'angular2/angular2' ;
import {Directory} from './directory';

@Component({
    selector: 'tree-view',
    properties: ['directories:directories']
})
@View({
    templateUrl: './app/components/treeview/tree-view.html',
    directives: [CORE_DIRECTIVES, TreeView]
})

export class TreeView {
    directories:Array<Directory>;
}

