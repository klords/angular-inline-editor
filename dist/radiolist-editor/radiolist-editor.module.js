"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const radiolist_editor_component_1 = require("./radiolist-editor.component");
class RadioListEditorModule {
    static forRoot() {
        return {
            ngModule: RadioListEditorModule,
        };
    }
}
RadioListEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [common_1.CommonModule, forms_1.FormsModule],
                declarations: [
                    radiolist_editor_component_1.RadioListEditorComponent
                ],
                exports: [radiolist_editor_component_1.RadioListEditorComponent]
            },] },
];
exports.RadioListEditorModule = RadioListEditorModule;
