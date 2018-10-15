"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var date_editor_component_1 = require("./date-editor.component");
var datepicker_1 = require("ngx-bootstrap/datepicker");
var DateEditorModule = /** @class */ (function () {
    function DateEditorModule() {
    }
    DateEditorModule.forRoot = function () {
        return {
            ngModule: DateEditorModule,
        };
    };
    DateEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        datepicker_1.BsDatepickerModule
                    ],
                    declarations: [
                        date_editor_component_1.DateEditorComponent
                    ],
                    exports: [date_editor_component_1.DateEditorComponent]
                },] },
    ];
    return DateEditorModule;
}());
exports.DateEditorModule = DateEditorModule;
