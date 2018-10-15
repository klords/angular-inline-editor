"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var time_editor_component_1 = require("./time-editor.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var TimeEditorModule = /** @class */ (function () {
    function TimeEditorModule() {
    }
    TimeEditorModule.forRoot = function () {
        return {
            ngModule: TimeEditorModule,
        };
    };
    TimeEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        ngx_bootstrap_1.TimepickerModule
                    ],
                    declarations: [
                        time_editor_component_1.TimeEditorComponent
                    ],
                    exports: [time_editor_component_1.TimeEditorComponent]
                },] },
    ];
    return TimeEditorModule;
}());
exports.TimeEditorModule = TimeEditorModule;
