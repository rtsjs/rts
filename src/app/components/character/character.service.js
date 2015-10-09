var CharacterService = (function () {
    function CharacterService() {
    }
    CharacterService.prototype.getCharacters = function () { return Promise.resolve(CHARACTERS); };
    CharacterService.prototype.getCharacter = function (id) {
        return Promise.resolve(CHARACTERS)
            .then(function (characters) {
            return characters.filter(function (c) {
                return c.id === id;
            })[0];
        });
    };
    return CharacterService;
})();
exports.CharacterService = CharacterService;
var CHARACTERS = [
    {
        "id": 11,
        "name": "Aragorn"
    },
    {
        "id": 12,
        "name": "Meriadoc Brandybuck"
    },
    {
        "id": 13,
        "name": "Pippin Took"
    },
    {
        "id": 14,
        "name": "Frodo Baggins"
    },
    {
        "id": 15,
        "name": "Samwise Gamgee"
    },
    {
        "id": 16,
        "name": "Gandalf"
    },
    {
        "id": 17,
        "name": "Boromir"
    },
    {
        "id": 18,
        "name": "Gimli"
    },
    {
        "id": 19,
        "name": "Legolas"
    },
    {
        "id": 20,
        "name": "Elrond"
    }
];
//# sourceMappingURL=character.service.js.map