"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var checklist_editor_component_1 = require("./checklist-editor.component");
var CheckListEditorModule = /** @class */ (function () {
    function CheckListEditorModule() {
    }
    CheckListEditorModule.forRoot = function () {
        return {
            ngModule: CheckListEditorModule,
        };
    };
    CheckListEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        checklist_editor_component_1.CheckListEditorComponent
                    ],
                    exports: [checklist_editor_component_1.CheckListEditorComponent]
                },] },
    ];
    return CheckListEditorModule;
}());
exports.CheckListEditorModule = CheckListEditorModule;
