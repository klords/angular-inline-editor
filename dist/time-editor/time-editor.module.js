"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const time_editor_component_1 = require("./time-editor.component");
const ngx_bootstrap_1 = require("ngx-bootstrap");
class TimeEditorModule {
    static forRoot() {
        return {
            ngModule: TimeEditorModule,
        };
    }
}
TimeEditorModule.decorators = [
    { type: core_1.NgModule, args: [{
                imports: [
                    common_1.CommonModule,
                    forms_1.FormsModule,
                    ngx_bootstrap_1.TimepickerModule.forRoot()
                ],
                declarations: [
                    time_editor_component_1.TimeEditorComponent
                ],
                exports: [time_editor_component_1.TimeEditorComponent]
            },] },
];
exports.TimeEditorModule = TimeEditorModule;
