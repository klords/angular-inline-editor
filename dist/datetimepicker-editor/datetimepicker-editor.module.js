"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var datetimepicker_editor_component_1 = require("./datetimepicker-editor.component");
var ngx_bootstrap_1 = require("ngx-bootstrap");
var DateTimeEditorModule = /** @class */ (function () {
    function DateTimeEditorModule() {
    }
    DateTimeEditorModule.forRoot = function () {
        return {
            ngModule: DateTimeEditorModule,
        };
    };
    DateTimeEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        ngx_bootstrap_1.BsDatepickerModule,
                        ngx_bootstrap_1.TimepickerModule
                    ],
                    declarations: [
                        datetimepicker_editor_component_1.DateTimeEditorComponent
                    ],
                    exports: [datetimepicker_editor_component_1.DateTimeEditorComponent]
                },] },
    ];
    return DateTimeEditorModule;
}());
exports.DateTimeEditorModule = DateTimeEditorModule;
