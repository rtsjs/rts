export class Directory {
    name: string;
    directories: Array<Directory>;
    files: Array<string>;
    expanded: boolean;
    checked: boolean;

    constructor(name:string, directories:Array<Directory>, files:Array<string>){
        this.name = name;
        this.directories = directories;
        this.files= files;
        this.expanded = true;
        this.checked = true;
    }

    toggle() {
        this.expanded = !this.expanded;;
    }

    check() {
        let newState = !this.checked;
        this.checked = newState;
        this.checkRecursive(newState);
    }

    checkRecursive(state:boolean) {
        this.directories.forEach(d => {
            d.checked = state;
            d.checkRecursive(state);
        })
    }
}
