"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const datetimepicker_editor_component_1 = require("./datetimepicker-editor.component");
const ngx_bootstrap_1 = require("ngx-bootstrap");
class DateTimeEditorModule {
    static forRoot() {
        return {
            ngModule: DateTimeEditorModule,
        };
    }
}
DateTimeEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    ngx_bootstrap_1.BsDatepickerModule.forRoot(),
                    ngx_bootstrap_1.TimepickerModule.forRoot()
                ],
                declarations: [
                    datetimepicker_editor_component_1.DateTimeEditorComponent
                ],
                exports: [datetimepicker_editor_component_1.DateTimeEditorComponent]
            },] },
];
exports.DateTimeEditorModule = DateTimeEditorModule;
