"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class DisplayFieldNameFilter {
    transform(item, displayValue) {
        if (item == null || item == undefined || displayValue == "" || displayValue == null || displayValue == undefined) {
            return null;
        }
        return item[displayValue];
    }
}
DisplayFieldNameFilter.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'displayFieldName',
                pure: false
            },] },
];
exports.DisplayFieldNameFilter = DisplayFieldNameFilter;
class DisplayNameFilter {
    transform(item, displayValue) {
        if (item == null || item == undefined || displayValue == "" || displayValue == null || displayValue == undefined) {
            return null;
        }
        return item[displayValue];
    }
}
DisplayNameFilter.decorators = [
    { type: core_1.Pipe, args: [{
                name: 'displayName',
                pure: false
            },] },
];
exports.DisplayNameFilter = DisplayNameFilter;
