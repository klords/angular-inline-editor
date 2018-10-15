"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var number_editor_component_1 = require("./number-editor.component");
var NumberEditorModule = /** @class */ (function () {
    function NumberEditorModule() {
    }
    NumberEditorModule.forRoot = function () {
        return {
            ngModule: NumberEditorModule,
        };
    };
    NumberEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        number_editor_component_1.NumberEditorComponent
                    ],
                    exports: [number_editor_component_1.NumberEditorComponent]
                },] },
    ];
    return NumberEditorModule;
}());
exports.NumberEditorModule = NumberEditorModule;
