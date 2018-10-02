"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const date_editor_component_1 = require("./date-editor.component");
const ngx_bootstrap_1 = require("ngx-bootstrap");
class DateEditorModule {
    static forRoot() {
        return {
            ngModule: DateEditorModule,
        };
    }
}
DateEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    ngx_bootstrap_1.BsDatepickerModule.forRoot()
                ],
                declarations: [
                    date_editor_component_1.DateEditorComponent
                ],
                exports: [date_editor_component_1.DateEditorComponent]
            },] },
];
exports.DateEditorModule = DateEditorModule;
