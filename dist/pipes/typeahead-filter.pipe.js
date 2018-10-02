"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class typeaheadfilter {
    transform(items, filter, displayValue) {
        if (!items || !filter) {
            return items;
        }
        return items.filter(item => item[displayValue].toLowerCase().indexOf(filter.toLowerCase()) !== -1);
    }
}
typeaheadfilter.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'typeaheadfilter',
                pure: false
            },] },
    { type: core_1.Injectable },
];
exports.typeaheadfilter = typeaheadfilter;
