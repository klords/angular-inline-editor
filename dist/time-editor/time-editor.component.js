"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TIME_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TimeEditorComponent; }),
    multi: true
};
var TimeEditorComponent = /** @class */ (function () {
    function TimeEditorComponent(element, _renderer) {
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
        this.timeReqflag = false;
        this.showTimePicker = false;
    }
    TimeEditorComponent.prototype.onSaveTime = function () {
        if (this.required == "true") {
            if (this.timeEditorControl.nativeElement.value == null || this.timeEditorControl.nativeElement.value === undefined || this.timeEditorControl.nativeElement.value == "") {
                this.timeReqflag = true;
                return;
            }
            else {
                this.timeReqflag = false;
            }
        }
        else {
            this.timeReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    TimeEditorComponent.prototype.onCancelTime = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.timeReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    TimeEditorComponent.prototype.onCloseTime = function () {
        this.editing = false;
        this.timeReqflag = false;
    };
    Object.defineProperty(TimeEditorComponent.prototype, "value", {
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
    TimeEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    TimeEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    TimeEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    TimeEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    TimeEditorComponent.prototype.edit = function (value) {
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    TimeEditorComponent.prototype.IsDateEmpty = function () {
        return (this._value === undefined || this._value == null);
    };
    TimeEditorComponent.prototype.ngOnInit = function () {
    };
    TimeEditorComponent.prototype.ShowTimePicker = function () {
        this.showTimePicker = !this.showTimePicker;
    };
    TimeEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'time-editor',
                    template: "<div *ngIf=\"editing\">\n  <label class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <input #timeEditorControl type=\"time\" [class.is-invalid]=\"timeReqflag\" [ngModel]=\"value | date:'shortTime'\" (ngModelChange)=\"value=$event\"\n          class=\"form-control\" [id]=\"id\" type=\"text\" [placeholder]=\"placeholder\" (click)=\"ShowTimePicker()\">\n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveTime()\">\n              <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelTime()\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n          </button>\n      </span>\n     \n  </div>\n  <div *ngIf=\"timeReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n  <div class=\"time-picker-container\" *ngIf=\"showTimePicker\">\n          <div class=\"time-picker\">\n              <div class=\"time-picker-body\">\n                  <timepicker [(ngModel)]=\"value\" [(ngModel)]=\"value\" [hourStep]=1 [minuteStep]=1></timepicker>\n                  <br/>\n                  <button class=\"btn btn-block btn-success\" (click)=\"ShowTimePicker()\">SET</button>\n              </div>\n          </div>\n      </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsDateEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsDateEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{value | date:format}}&nbsp;</div>\n  </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                        '.time-picker-container { position: absolute; display: block; top: 70px; left: 75px; z-index: 1080; }',
                        '.time-picker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
                        '.time-picker-body { padding: 15px; }',
                        '.bs-timepicker-field { width: 60px !important; }'
                    ],
                    providers: [TIME_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    TimeEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    TimeEditorComponent.propDecorators = {
        timeEditorControl: [{ type: core_1.ViewChild, args: ['timeEditorControl',] }],
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
    return TimeEditorComponent;
}());
exports.TimeEditorComponent = TimeEditorComponent;
