"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const checkbox_editor_component_1 = require("./checkbox-editor.component");
class CheckBoxEditorModule {
    static forRoot() {
        return {
            ngModule: CheckBoxEditorModule,
        };
    }
}
CheckBoxEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    checkbox_editor_component_1.CheckBoxEditorComponent
                ],
                exports: [checkbox_editor_component_1.CheckBoxEditorComponent]
            },] },
];
exports.CheckBoxEditorModule = CheckBoxEditorModule;
