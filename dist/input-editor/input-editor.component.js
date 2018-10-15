"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return InputEditorComponent; }),
    multi: true
};
var InputEditorComponent = /** @class */ (function () {
    function InputEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.type = 'text'; // The type of input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.inputReqflag = false;
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this._value = ''; // Private variable for input value
    }
    InputEditorComponent.prototype.onSaveInput = function () {
        if (this.required == "true") {
            if (this.inputEditorControl.nativeElement.value == null || this.inputEditorControl.nativeElement.value === undefined || this.inputEditorControl.nativeElement.value === "") {
                this.inputReqflag = true;
                return;
            }
            else {
                this.inputReqflag = false;
            }
        }
        else {
            this.inputReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    InputEditorComponent.prototype.onCancelInput = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.inputReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    InputEditorComponent.prototype.onCloseInput = function () {
        this.editing = false;
        this.inputReqflag = false;
    };
    Object.defineProperty(InputEditorComponent.prototype, "value", {
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
    InputEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    InputEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    InputEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    InputEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    InputEditorComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(function () { _this.inputEditorControl.nativeElement.focus(); }, 300);
    };
    InputEditorComponent.prototype.IsInputTextEmpty = function () {
        return (this._value === undefined || this._value === '' || this._value === null);
    };
    InputEditorComponent.prototype.ngOnInit = function () {
    };
    InputEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'input-editor',
                    template: "<div *ngIf=\"editing\">\n  <label *ngIf=\"label\" class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <input #inputEditorControl class=\"form-control\" [class.is-invalid]=\"inputReqflag\" [required]=\"required\" [id]=\"id\" [(ngModel)]=\"value\" type=\"text\" [placeholder]=\"placeholder\"\n          [maxlength]=\"stringlength\">\n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveInput()\">\n              <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelInput()\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n          </button>\n      </span>\n  </div>\n  <div *ngIf=\"inputReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label *ngIf=\"label\" class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsInputTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsInputTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{value}}&nbsp;</div>\n  </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    InputEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    InputEditorComponent.propDecorators = {
        inputEditorControl: [{ type: core_1.ViewChild, args: ['inputEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        stringlength: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return InputEditorComponent;
}());
exports.InputEditorComponent = InputEditorComponent;
