"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var HighLightPipe = /** @class */ (function () {
    function HighLightPipe() {
    }
    HighLightPipe.prototype.transform = function (text, search) {
        debugger;
        return search ? text.replace(new RegExp(search, 'i'), "<span class=\"txt-light\">" + search + "</span>") : text;
    };
    HighLightPipe.decorators = [
        { type: core_1.Pipe, args: [{ name: 'highlight' },] },
    ];
    return HighLightPipe;
}());
exports.HighLightPipe = HighLightPipe;
