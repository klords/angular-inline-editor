"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var select_editor_component_1 = require("./select-editor.component");
var displayvalue_pipe_1 = require("../pipes/displayvalue.pipe");
// import { OutSideClickDirective } from "../directives/outsideclick.directive";
var SelectEditorModule = /** @class */ (function () {
    function SelectEditorModule() {
    }
    SelectEditorModule.forRoot = function () {
        return {
            ngModule: SelectEditorModule,
        };
    };
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
    return SelectEditorModule;
}());
exports.SelectEditorModule = SelectEditorModule;
