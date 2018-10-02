"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const textarea_editor_component_1 = require("./textarea-editor.component");
class TextAreaEditorModule {
    static forRoot() {
        return {
            ngModule: TextAreaEditorModule,
        };
    }
}
TextAreaEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    textarea_editor_component_1.TextAreaEditorComponent
                ],
                exports: [textarea_editor_component_1.TextAreaEditorComponent]
            },] },
];
exports.TextAreaEditorModule = TextAreaEditorModule;
