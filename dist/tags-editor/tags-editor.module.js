"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var tags_editor_component_1 = require("./tags-editor.component");
var TagsEditorModule = /** @class */ (function () {
    function TagsEditorModule() {
    }
    TagsEditorModule.forRoot = function () {
        return {
            ngModule: TagsEditorModule,
        };
    };
    TagsEditorModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_1.CommonModule, forms_1.FormsModule],
                    declarations: [
                        tags_editor_component_1.TagsEditorComponent
                    ],
                    exports: [tags_editor_component_1.TagsEditorComponent]
                },] },
    ];
    return TagsEditorModule;
}());
exports.TagsEditorModule = TagsEditorModule;
