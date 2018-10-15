"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RADIOLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return RadioListEditorComponent; }),
    multi: true
};
var RadioListEditorComponent = /** @class */ (function () {
    function RadioListEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.options = [];
        this.displayValue = '';
        this.dataValue = '';
        this.placeholder = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.radiolistReqflag = false;
        this.isEmpty = true;
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this._value = []; // Private variable for input value
    }
    RadioListEditorComponent.prototype.onSaveRadiolist = function () {
        if (this.required == "true") {
            if (this.value == null || this.value.length <= 0 || this.value == undefined) {
                this.radiolistReqflag = true;
                return;
            }
            else {
                this.radiolistReqflag = false;
            }
        }
        else {
            this.radiolistReqflag = false;
        }
        this.onSave.emit('clicked save');
        this.editing = false;
    };
    RadioListEditorComponent.prototype.onCancelRadiolist = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.radiolistReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    RadioListEditorComponent.prototype.onCloseRadiolist = function () {
        this.editing = false;
        this.radiolistReqflag = false;
    };
    Object.defineProperty(RadioListEditorComponent.prototype, "value", {
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
    RadioListEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    RadioListEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    RadioListEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    RadioListEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    RadioListEditorComponent.prototype.edit = function (value) {
        if (this.disabled === 'true') {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    RadioListEditorComponent.prototype.IsRadioListEmpty = function () {
        return (this._value == undefined || this._value.length <= 0);
    };
    RadioListEditorComponent.prototype.updateSelectedChecks = function (event) {
        if (this._value === null || this._value === undefined)
            this._value = [];
        if (event.target.checked) {
            if (this._value.indexOf(event.target.value) < 0) {
                this._value = [];
                this._value.push(event.target.value);
            }
        }
        else {
            if (this._value.indexOf(event.target.name) > -1) {
                this._value.splice(this._value.indexOf(event.target.value), 1);
            }
        }
    };
    RadioListEditorComponent.prototype.GetDisplayText = function (c) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i][this.dataValue] == c) {
                return this.options[i][this.displayValue];
            }
        }
    };
    RadioListEditorComponent.prototype.ngOnInit = function () {
    };
    RadioListEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'radiolist-editor',
                    template: "<div *ngIf=\"editing\">\n    <label class=\"col-form-label\">{{label}}</label>\n    <div class=\"\">\n        <div class=\"form-check\">\n            <label #radiolistEditorControl *ngFor=\"let item of options\" class=\"form-check-label\">\n                <input type=\"radio\" class=\"form-check-input\" [class.is-invalid]=\"radiolistReqflag\" [value]=\"item[dataValue]\" [name]=\"item[displayValue]\" (change)=\"updateSelectedChecks($event)\"\n                    [checked]=\"(value && (-1 !== value.indexOf(item[dataValue])) ? 'checked' : '')\" />&nbsp;{{item[displayValue]}}&nbsp;&nbsp;\n            </label>\n        </div>\n    </div>\n    <div *ngIf=\"radiolistReqflag\" class=\"text-danger\">\n        {{requiredMessage}}\n    </div>\n    <div class=\"text-right\">\n        <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveRadiolist()\">\n            <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n        </button>\n        <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelRadiolist()\">\n            <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n        </button>\n    </div>\n</div>\n<div *ngIf=\"!editing\">\n    <div class=\"form-group\">\n        <label class=\"col-form-label\">{{label}}</label>\n        <div *ngIf=\"IsRadioListEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n            {{placeholder}}&nbsp;\n        </div>\n        <div *ngIf=\"!IsRadioListEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{GetDisplayText(value)}}&nbsp;</div>\n    </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [RADIOLIST_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    RadioListEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    RadioListEditorComponent.propDecorators = {
        radiolistEditorControl: [{ type: core_1.ViewChild, args: ['radiolistEditorControl',] }],
        label: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        options: [{ type: core_1.Input }],
        displayValue: [{ type: core_1.Input }],
        dataValue: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return RadioListEditorComponent;
}());
exports.RadioListEditorComponent = RadioListEditorComponent;
