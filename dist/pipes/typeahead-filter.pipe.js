"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var typeaheadfilter = /** @class */ (function () {
    function typeaheadfilter() {
    }
    typeaheadfilter.prototype.transform = function (items, filter, displayValue) {
        if (!items || !filter) {
            return items;
        }
        return items.filter(function (item) { return item[displayValue].toLowerCase().indexOf(filter.toLowerCase()) !== -1; });
    };
    typeaheadfilter.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'typeaheadfilter',
                    pure: false
                },] },
        { type: core_1.Injectable },
    ];
    return typeaheadfilter;
}());
exports.typeaheadfilter = typeaheadfilter;
