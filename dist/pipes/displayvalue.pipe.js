"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var DisplayFieldNameFilter = /** @class */ (function () {
    function DisplayFieldNameFilter() {
    }
    DisplayFieldNameFilter.prototype.transform = function (item, displayValue) {
        if (item == null || item == undefined || displayValue == "" || displayValue == null || displayValue == undefined) {
            return null;
        }
        return item[displayValue];
    };
    DisplayFieldNameFilter.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'displayFieldName',
                    pure: false
                },] },
    ];
    return DisplayFieldNameFilter;
}());
exports.DisplayFieldNameFilter = DisplayFieldNameFilter;
var DisplayNameFilter = /** @class */ (function () {
    function DisplayNameFilter() {
    }
    DisplayNameFilter.prototype.transform = function (item, displayValue) {
        if (item == null || item == undefined || displayValue == "" || displayValue == null || displayValue == undefined) {
            return null;
        }
        return item[displayValue];
    };
    DisplayNameFilter.decorators = [
        { type: core_1.Pipe, args: [{
                    name: 'displayName',
                    pure: false
                },] },
    ];
    return DisplayNameFilter;
}());
exports.DisplayNameFilter = DisplayNameFilter;
