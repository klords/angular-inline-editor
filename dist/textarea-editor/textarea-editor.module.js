"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var textarea_editor_component_1 = require("./textarea-editor.component");
var TextAreaEditorModule = /** @class */ (function () {
    function TextAreaEditorModule() {
    }
    TextAreaEditorModule.forRoot = function () {
        return {
            ngModule: TextAreaEditorModule,
        };
    };
    TextAreaEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        textarea_editor_component_1.TextAreaEditorComponent
                    ],
                    exports: [textarea_editor_component_1.TextAreaEditorComponent]
                },] },
    ];
    return TextAreaEditorModule;
}());
exports.TextAreaEditorModule = TextAreaEditorModule;
