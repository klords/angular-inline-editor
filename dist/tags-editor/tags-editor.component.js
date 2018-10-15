"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TAGS_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TagsEditorComponent; }),
    multi: true
};
var TagsEditorComponent = /** @class */ (function () {
    function TagsEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.tags = [];
        this.preValue = []; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.tagsReqflag = false;
        this._value = []; // Private variable for input value
    }
    TagsEditorComponent.prototype.onSaveTags = function () {
        if (this.required == "true") {
            if (this.value == null || this.value.length <= 0 || this.value == undefined) {
                this.tagsReqflag = true;
                return;
            }
            else {
                this.tagsReqflag = false;
            }
        }
        else {
            this.tagsReqflag = false;
        }
        this.onSave.emit('clicked save');
        this.editing = false;
    };
    TagsEditorComponent.prototype.onCancelTags = function () {
        this.editing = false;
        this.value = this._originalValue;
        this.tagsReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    TagsEditorComponent.prototype.onCloseTags = function () {
        this.editing = false;
        this.tagsReqflag = false;
    };
    Object.defineProperty(TagsEditorComponent.prototype, "value", {
        // Control Value Accessors for ngModel
        get: function () {
            return this._value;
        },
        set: function (v) {
            if (v !== this._value) {
                this._value = v;
                this.onChange(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    // Required for ControlValueAccessor interface
    TagsEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    TagsEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    TagsEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    TagsEditorComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this.tags = this.value;
        if (value != null || value != undefined)
            this._originalValue = value.slice(0);
        setTimeout(function () { _this.tagsEditorControl.nativeElement.focus(); }, 300);
    };
    TagsEditorComponent.prototype.IsTagsEmpty = function (value) {
        var r;
        r = (this.value === null || this.value === undefined);
        if (r === false) {
            if (value.length <= 0) {
                r = true;
            }
        }
        return r;
    };
    TagsEditorComponent.prototype.removeTagItem = function (i) {
        this.tags.splice(i, 1);
        this._value = this.tags;
    };
    TagsEditorComponent.prototype.addTag = function (event) {
        debugger;
        var input = event.target;
        var ta = input.value;
        if (this.tags === null || this.tags === undefined)
            this.tags = [];
        var foundI = this.tags.indexOf(ta);
        if (foundI == -1) {
            input.value = '';
            input.focus();
            this.tags.push(ta);
            this.value = this.tags;
        }
        else {
            return;
        }
    };
    TagsEditorComponent.prototype.ngOnInit = function () {
    };
    TagsEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tags-editor',
                    template: "<div *ngIf=\"editing\">\n  <label class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <div class=\"tags\" [class.tags-is-invalid]=\"tagsReqflag\">\n          <ul class=\"tag-list\">\n              <li class=\"tag-item\" *ngFor=\"let t of value; let i = index\">\n                  <span>{{t}}</span>\n                  <a class=\"tag-remove-button\" (click)=\"removeTagItem(i)\">\u00D7</a>\n              </li>\n          </ul>\n          <input #tagsEditorControl id=\"ngtags-control\" type=\"text\" class=\"tag-input\" autocomplete=\"off\" (keydown.enter)=\"addTag($event)\" [placeholder]=\"placeholder\">\n      </div>\n  </div>\n  <div *ngIf=\"tagsReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n  <div class=\"text-right\">\n      <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveTags()\">\n          <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelTags()\">\n          <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n      </button>\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsTagsEmpty(value)\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsTagsEmpty(value)\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">\n          <ul class=\"tag-list\">\n              <li class=\"tag-item\" *ngFor=\"let t of value;\">\n                  <span>{{t}}</span>\n              </li>\n          </ul>\n      </div>\n  </div>\n</div>",
                    styles: [
                        '.tags { -moz-appearance: none; -webkit-appearance: none;  border: 1px solid #ccc; border-radius: 4px; width: 100%; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);   -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  -moz-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  -moz-appearance: textfield; -webkit-appearance: textfield; padding: 1px; overflow: hidden; word-wrap: break-word; cursor: text; background-color: #fff; border: 1px solid darkgray; box-shadow: 1px 1px 1px 0 lightgrey inset; height: 100%; }',
                        '.tag-list { margin: 0;padding: 0; list-style-type: none; }',
                        '.tag-input { border: 0; outline: none; margin: 2px; padding: 0; padding-left: 5px; float: left; height: 26px; width: 100%; font: 14px; }',
                        '.tag-item { margin: 2px; padding: 0 5px; display: inline-block; font: 14px; height: 26px; line-height: 25px; border: 1px solid #acacac; border-radius: 3px; background: -webkit-linear-gradient(top, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%); background: linear-gradient(to bottom, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%); color: #fff; background: #428bca; border: 1px solid #357ebd; }',
                        '.tag-remove-button { margin: 0 0 0 5px; padding: 0; border: none; background: none; cursor: pointer; vertical-align: middle; font: bold 16px Arial, sans-serif; color: #585858; }',
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                        '.tags-is-invalid { border-color: red; }'
                    ],
                    providers: [TAGS_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    TagsEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    TagsEditorComponent.propDecorators = {
        tagsEditorControl: [{ type: core_1.ViewChild, args: ['tagsEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        stringlength: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return TagsEditorComponent;
}());
exports.TagsEditorComponent = TagsEditorComponent;
