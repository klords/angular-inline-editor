"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const checklist_editor_component_1 = require("./checklist-editor.component");
class CheckListEditorModule {
    static forRoot() {
        return {
            ngModule: CheckListEditorModule,
        };
    }
}
CheckListEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    checklist_editor_component_1.CheckListEditorComponent
                ],
                exports: [checklist_editor_component_1.CheckListEditorComponent]
            },] },
];
exports.CheckListEditorModule = CheckListEditorModule;
