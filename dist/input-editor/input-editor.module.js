"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const input_editor_component_1 = require("./input-editor.component");
class InputEditorModule {
    static forRoot() {
        return {
            ngModule: InputEditorModule,
        };
    }
}
InputEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    input_editor_component_1.InputEditorComponent
                ],
                exports: [input_editor_component_1.InputEditorComponent]
            },] },
];
exports.InputEditorModule = InputEditorModule;
