"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var typeahead_editor_component_1 = require("./typeahead-editor.component");
var typeahead_filter_pipe_1 = require("../pipes/typeahead-filter.pipe");
var displayvalue_pipe_1 = require("../pipes/displayvalue.pipe");
var texthighlight_pipe_1 = require("../pipes/texthighlight.pipe");
var TypeAheadEditorModule = /** @class */ (function () {
    function TypeAheadEditorModule() {
    }
    TypeAheadEditorModule.forRoot = function () {
        return {
            ngModule: TypeAheadEditorModule,
        };
    };
    TypeAheadEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        typeahead_filter_pipe_1.typeaheadfilter,
                        typeahead_editor_component_1.TypeAheadEditorComponent,
                        displayvalue_pipe_1.DisplayFieldNameFilter, texthighlight_pipe_1.HighLightPipe
                    ],
                    exports: [typeahead_editor_component_1.TypeAheadEditorComponent]
                },] },
    ];
    return TypeAheadEditorModule;
}());
exports.TypeAheadEditorModule = TypeAheadEditorModule;
