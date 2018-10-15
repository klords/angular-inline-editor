"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TEXTAREA_EDIT_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TextAreaEditorComponent; }),
    multi: true
};
var TextAreaEditorComponent = /** @class */ (function () {
    function TextAreaEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.required = "false";
        this.requiredMessage = '';
        this.disabled = "false";
        this.id = '';
        this.stringlength = '';
        this.maxheight = 'auto';
        this.minheight = 'auto';
        this.placeholder = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.textareaReqflag = false;
        this._value = ''; // Private variable for input value
    }
    TextAreaEditorComponent.prototype.onSaveTextarea = function () {
        if (this.required == "true") {
            if (this.textareaEditorControl.nativeElement.value == null || this.textareaEditorControl.nativeElement.value === undefined || this.textareaEditorControl.nativeElement.value === "") {
                this.textareaReqflag = true;
                return;
            }
            else {
                this.textareaReqflag = false;
            }
        }
        else {
            this.textareaReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    TextAreaEditorComponent.prototype.onCancelTextarea = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.textareaReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    TextAreaEditorComponent.prototype.onCloseTextarea = function () {
        this.editing = false;
        this.textareaReqflag = false;
    };
    Object.defineProperty(TextAreaEditorComponent.prototype, "value", {
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
    TextAreaEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    TextAreaEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    TextAreaEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    TextAreaEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    TextAreaEditorComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(function () { _this.textareaEditorControl.nativeElement.focus(); }, 300);
    };
    TextAreaEditorComponent.prototype.IsTextareaEmpty = function () {
        return (this._value === undefined || this._value == '');
    };
    TextAreaEditorComponent.prototype.ngOnInit = function () {
    };
    TextAreaEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'textarea-editor',
                    template: "<div *ngIf=\"editing\">\n    <label class=\"col-form-label\">{{label}}</label>\n    <div class=\"input-group\">\n        <textarea [id]=\"id\" #textareaEditorControl [(ngModel)]=\"value\" [class.is-invalid]=\"textareaReqflag\" style=\"word-wrap: break-word;\"\n            [maxlength]=\"stringlength\" [style.height]=\"maxheight\" class=\"form-control\" wrap=\"hard\">\n            </textarea>\n    </div>\n    <div *ngIf=\"textareaReqflag\" class=\"text-danger\">\n        {{requiredMessage}}\n    </div>\n    <div class=\"text-right\">\n        <button class=\"btn btn-success\" type=\"button\" (click)=\"onSaveTextarea()\">\n            <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n        </button>\n        <button class=\"btn btn-danger\" type=\"button\" (click)=\"onCancelTextarea()\">\n            <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n        </button>\n    </div>\n\n</div>\n<div *ngIf=\"!editing\">\n    <div class=\"form-group\">\n        <label class=\"col-form-label\">{{label}}</label>\n        <div *ngIf=\"IsTextareaEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">{{placeholder}}&nbsp;</div>\n        <div *ngIf=\"!IsTextareaEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" [style.height]=\"minheight\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{value}}&nbsp;</div>\n    </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [TEXTAREA_EDIT_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    TextAreaEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    TextAreaEditorComponent.propDecorators = {
        textareaEditorControl: [{ type: core_1.ViewChild, args: ['textareaEditorControl',] }],
        label: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        stringlength: [{ type: core_1.Input }],
        maxheight: [{ type: core_1.Input }],
        minheight: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return TextAreaEditorComponent;
}());
exports.TextAreaEditorComponent = TextAreaEditorComponent;
