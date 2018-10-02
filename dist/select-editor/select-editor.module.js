"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const select_editor_component_1 = require("./select-editor.component");
const displayvalue_pipe_1 = require("../pipes/displayvalue.pipe");
// import { OutSideClickDirective } from "../directives/outsideclick.directive";
class SelectEditorModule {
    static forRoot() {
        return {
            ngModule: SelectEditorModule,
        };
    }
}
SelectEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule
                ],
                declarations: [
                    select_editor_component_1.SelectEditorComponent,
                    displayvalue_pipe_1.DisplayNameFilter
                ],
                exports: [select_editor_component_1.SelectEditorComponent]
            },] },
];
exports.SelectEditorModule = SelectEditorModule;
