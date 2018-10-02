"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const number_editor_component_1 = require("./number-editor.component");
class NumberEditorModule {
    static forRoot() {
        return {
            ngModule: NumberEditorModule,
        };
    }
}
NumberEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    number_editor_component_1.NumberEditorComponent
                ],
                exports: [number_editor_component_1.NumberEditorComponent]
            },] },
];
exports.NumberEditorModule = NumberEditorModule;
