"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var input_editor_component_1 = require("./input-editor.component");
var InputEditorModule = /** @class */ (function () {
    function InputEditorModule() {
    }
    InputEditorModule.forRoot = function () {
        return {
            ngModule: InputEditorModule,
        };
    };
    InputEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        input_editor_component_1.InputEditorComponent
                    ],
                    exports: [input_editor_component_1.InputEditorComponent]
                },] },
    ];
    return InputEditorModule;
}());
exports.InputEditorModule = InputEditorModule;
