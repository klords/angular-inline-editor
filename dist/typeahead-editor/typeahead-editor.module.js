"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const common_1 = require("@angular/common");
const typeahead_editor_component_1 = require("./typeahead-editor.component");
const typeahead_filter_pipe_1 = require("../pipes/typeahead-filter.pipe");
const displayvalue_pipe_1 = require("../pipes/displayvalue.pipe");
const texthighlight_pipe_1 = require("../pipes/texthighlight.pipe");
class TypeAheadEditorModule {
    static forRoot() {
        return {
            ngModule: TypeAheadEditorModule,
        };
    }
}
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
exports.TypeAheadEditorModule = TypeAheadEditorModule;
