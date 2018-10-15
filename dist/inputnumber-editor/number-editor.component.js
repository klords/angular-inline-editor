"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var NUMBER_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return NumberEditorComponent; }),
    multi: true
};
var NumberEditorComponent = /** @class */ (function () {
    function NumberEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.step = 1;
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.numberReqflag = false;
        this.numberBigflag = false;
    }
    NumberEditorComponent.prototype.onSaveInputNumber = function () {
        var enteredValue = this.numberEditorControl.nativeElement.value;
        this.numberReqflag = this.required === "true" && !enteredValue;
        this.numberBigflag = enteredValue && (Number(enteredValue) > this.maxNumber || Number(enteredValue) < this.minNumber);
        if (this.numberBigflag || this.numberReqflag)
            return;
        this.onSave.emit('clicked save');
        this.editing = false;
    };
    NumberEditorComponent.prototype.onCancelInputNumber = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.numberReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    NumberEditorComponent.prototype.onCloseInputNumber = function () {
        this.editing = false;
        this.numberReqflag = false;
    };
    Object.defineProperty(NumberEditorComponent.prototype, "value", {
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
    NumberEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    NumberEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    NumberEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    NumberEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    NumberEditorComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(function () { _this.numberEditorControl.nativeElement.focus(); }, 300);
    };
    NumberEditorComponent.prototype.IsInputTextEmpty = function () {
        return (this._value === undefined || this._value == null);
    };
    NumberEditorComponent.prototype.ngOnInit = function () {
    };
    NumberEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'number-editor',
                    template: "<div *ngIf=\"editing\">\n  <label class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <input #numberEditorControl class=\"form-control\" \n          [class.is-invalid]=\"numberReqflag || numberBigflag\"\n          [id]=\"id\" \n          [(ngModel)]=\"value\" \n          type=\"number\" \n          [placeholder]=\"placeholder\"\n          [max]=\"maxNumber\"\n          [min]=\"minNumber\"\n          [step]=\"step\">\n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveInputNumber()\">\n              <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelInputNumber()\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n          </button>\n      </span>\n  </div>\n  <div *ngIf=\"numberReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n  <div *ngIf=\"numberBigflag\" class=\"text-danger\">\n      Number enter is out of bound MAX:{{maxNumber}} MIN:{{minNumber}}\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsInputTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsInputTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{value}}&nbsp;</div>\n  </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [NUMBER_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    NumberEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    NumberEditorComponent.propDecorators = {
        numberEditorControl: [{ type: core_1.ViewChild, args: ['numberEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        maxNumber: [{ type: core_1.Input }],
        minNumber: [{ type: core_1.Input }],
        step: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return NumberEditorComponent;
}());
exports.NumberEditorComponent = NumberEditorComponent;
