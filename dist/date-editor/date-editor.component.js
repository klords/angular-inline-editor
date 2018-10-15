"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var DATE_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return DateEditorComponent; }),
    multi: true
};
var DateEditorComponent = /** @class */ (function () {
    function DateEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.type = 'text'; // The type of input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.format = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.dateReqflag = false;
        this._value = ''; // Private variable for input value
    }
    DateEditorComponent.prototype.onSaveDate = function () {
        if (this.required == "true") {
            if (this.dateEditorControl.nativeElement.value == null || this.dateEditorControl.nativeElement.value === undefined || this.dateEditorControl.nativeElement.value === "") {
                this.dateReqflag = true;
                return;
            }
            else {
                this.dateReqflag = false;
            }
        }
        else {
            this.dateReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    DateEditorComponent.prototype.onCancelDate = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.dateReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    DateEditorComponent.prototype.onCloseDate = function () {
        this.editing = false;
        this.dateReqflag = false;
    };
    Object.defineProperty(DateEditorComponent.prototype, "value", {
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
    DateEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    DateEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    DateEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    DateEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    DateEditorComponent.prototype.edit = function (value) {
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    DateEditorComponent.prototype.IsDateEmpty = function () {
        return (this._value === undefined || this._value == '');
    };
    DateEditorComponent.prototype.ngOnInit = function () {
    };
    DateEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'date-editor',
                    template: "<div *ngIf=\"editing\">\n    <label class=\"col-form-label\">{{label}}</label>\n    <div class=\"input-group\">\n        <input #dateEditorControl #dp=\"bsDatepicker\" bsDatepicker  [class.is-invalid]=\"dateReqflag\" class=\"form-control\" [id]=\"id\" [(ngModel)]=\"value\" type=\"text\" [placeholder]=\"placeholder\">\n        <span class=\"input-group-btn\">\n            <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveDate()\">\n                <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n            </button>\n            <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelDate()\">\n                <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n            </button>\n        </span>\n    </div>\n    <div *ngIf=\"dateReqflag\" class=\"text-danger\">\n            {{requiredMessage}}\n        </div>\n</div>\n<div *ngIf=\"!editing\">\n    <div class=\"form-group\">\n        <label class=\"col-form-label\">{{label}}</label>\n        <div *ngIf=\"IsDateEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n            {{placeholder}}&nbsp;\n        </div>\n        <div *ngIf=\"!IsDateEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{value | date:format}}&nbsp;</div>\n    </div>\n</div>\n",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                        '.bs-datepicker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }'
                    ],
                    providers: [DATE_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    DateEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    DateEditorComponent.propDecorators = {
        dateEditorControl: [{ type: core_1.ViewChild, args: ['dateEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        format: [{ type: core_1.Input }],
        stringlength: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return DateEditorComponent;
}());
exports.DateEditorComponent = DateEditorComponent;
