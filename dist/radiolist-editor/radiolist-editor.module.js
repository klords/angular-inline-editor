"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var radiolist_editor_component_1 = require("./radiolist-editor.component");
var RadioListEditorModule = /** @class */ (function () {
    function RadioListEditorModule() {
    }
    RadioListEditorModule.forRoot = function () {
        return {
            ngModule: RadioListEditorModule,
        };
    };
    RadioListEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        radiolist_editor_component_1.RadioListEditorComponent
                    ],
                    exports: [radiolist_editor_component_1.RadioListEditorComponent]
                },] },
    ];
    return RadioListEditorModule;
}());
exports.RadioListEditorModule = RadioListEditorModule;
