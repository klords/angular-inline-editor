"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
class HighLightPipe {
    transform(text, search) {
        debugger;
        return search ? text.replace(new RegExp(search, 'i'), `<span class="txt-light">${search}</span>`) : text;
    }
}
HighLightPipe.decorators = [
    { type: core_1.Pipe, args: [{ name: 'highlight' },] },
];
exports.HighLightPipe = HighLightPipe;
