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
var character_service_1 = require('./character.service');
var CharactersComponent = (function () {
    function CharactersComponent(_characterService) {
        this._characterService = _characterService;
    }
    Object.defineProperty(CharactersComponent.prototype, "characters", {
        get: function () {
            return this._characters || this.getCharacters();
        },
        enumerable: true,
        configurable: true
    });
    CharactersComponent.prototype.onSelect = function (character) { this.currentCharacter = character; };
    /////////////////
    CharactersComponent.prototype.getCharacters = function () {
        var _this = this;
        this._characters = [];
        this._characterService.getCharacters()
            .then(function (characters) { return _this._characters = characters; });
        return this._characters;
    };
    CharactersComponent = __decorate([
        angular2_1.Component({ selector: 'my-characters' }),
        angular2_1.View({
            template: "\n    <h2>Select a Character</h2>\n    <ul class=\"characters\">\n      <li *ng-for=\"#character of characters\" (click)=\"onSelect(character)\">\n        <span class=\"badge\">{{character.id}}</span> {{character.name}}</a>\n      </li>\n    </ul>\n    <h2 *ng-if=\"currentCharacter\">\n      {{currentCharacter.name | uppercase}} is my character\n    </h2>\n  ",
            directives: [angular2_1.NgFor, angular2_1.NgIf],
            styles: ["\n    .characters {list-style-type: none; margin-left: 1em; padding: 0; width: 14em;}\n    .characters li { cursor: pointer; }\n    .characters li:hover {color: #369; background-color: #EEE; }\n  "]
        }), 
        __metadata('design:paramtypes', [character_service_1.CharacterService])
    ], CharactersComponent);
    return CharactersComponent;
})();
exports.CharactersComponent = CharactersComponent;
//# sourceMappingURL=characters.component.js.map