"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var checkbox_editor_component_1 = require("./checkbox-editor.component");
var CheckBoxEditorModule = /** @class */ (function () {
    function CheckBoxEditorModule() {
    }
    CheckBoxEditorModule.forRoot = function () {
        return {
            ngModule: CheckBoxEditorModule,
        };
    };
    CheckBoxEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        checkbox_editor_component_1.CheckBoxEditorComponent
                    ],
                    exports: [checkbox_editor_component_1.CheckBoxEditorComponent]
                },] },
    ];
    return CheckBoxEditorModule;
}());
exports.CheckBoxEditorModule = CheckBoxEditorModule;
