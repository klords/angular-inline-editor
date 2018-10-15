"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckListEditorComponent; }),
    multi: true
};
var CheckListEditorComponent = /** @class */ (function () {
    function CheckListEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.placeholder = ''; // Placeholder value ofr input element
        this.type = 'text'; // The type of input element
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.options = [];
        this.displayValue = '';
        this.dataValue = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.checklistReqflag = false;
        this._value = []; // Private variable for input value
    }
    CheckListEditorComponent.prototype.onSaveChecklist = function () {
        if (this.required == "true") {
            if (this.value == null || this.value.length <= 0 || this.value == undefined) {
                this.checklistReqflag = true;
                return;
            }
            else {
                this.checklistReqflag = false;
            }
        }
        else {
            this.checklistReqflag = false;
        }
        this.onSave.emit('clicked save');
        this.editing = false;
    };
    CheckListEditorComponent.prototype.onCancelChecklist = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.checklistReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    CheckListEditorComponent.prototype.onCloseChecklist = function () {
        this.editing = false;
        this.checklistReqflag = false;
    };
    Object.defineProperty(CheckListEditorComponent.prototype, "value", {
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
    CheckListEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    CheckListEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    CheckListEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    CheckListEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    CheckListEditorComponent.prototype.edit = function (value) {
        if (this.disabled === 'true') {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    CheckListEditorComponent.prototype.updateSelectedChecks = function (event) {
        if (this._value === null || this._value === undefined)
            this._value = [];
        if (event.target.checked) {
            if (this._value.indexOf(event.target.value) < 0) {
                this._value.push(event.target.value);
            }
        }
        else {
            if (this._value.indexOf(event.target.value) > -1) {
                this._value.splice(this.value.indexOf(event.target.value), 1);
            }
        }
    };
    CheckListEditorComponent.prototype.GetDisplayText = function (c) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i][this.dataValue] == c) {
                return this.options[i][this.displayValue];
            }
        }
    };
    CheckListEditorComponent.prototype.IsChecklistEmpty = function () {
        return (this._value == undefined || this._value.length < 0);
    };
    CheckListEditorComponent.prototype.ngOnInit = function () {
    };
    CheckListEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'checklist-editor',
                    template: "<div *ngIf=\"editing\">\n  <label class=\"col-form-label\">{{label}}</label>\n  <div class=\"\">\n      <div class=\"form-check\">\n          <label #checklistEditorControl *ngFor=\"let item of options\" class=\"form-check-label\">\n              <input type=\"checkbox\" class=\"form-check-input\" [value]=\"item[dataValue]\" [class.is-invalid]=\"checklistReqflag\" [name]=\"item[displayValue]\" (change)=\"updateSelectedChecks($event) \"\n                  [checked]=\"(value && (-1 !== value.indexOf(item[dataValue])) ? 'checked' : '')\" />&nbsp;{{item[displayValue]}}&nbsp;&nbsp;\n          </label>\n      </div>\n  </div>\n  <div *ngIf=\"checklistReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n  <div class=\"text-right\">\n      <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveChecklist()\">\n          <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n      </button>\n      <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelChecklist()\">\n          <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n      </button>\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsChecklistEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsChecklistEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"form-inline\">\n          <div *ngFor=\"let c of value\">\n              <span [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{GetDisplayText(c)}}</span>&nbsp;&nbsp;\n          </div>\n      </div>\n  </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckListEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    CheckListEditorComponent.propDecorators = {
        checklistEditorControl: [{ type: core_1.ViewChild, args: ['checklistEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        type: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        options: [{ type: core_1.Input }],
        displayValue: [{ type: core_1.Input }],
        dataValue: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return CheckListEditorComponent;
}());
exports.CheckListEditorComponent = CheckListEditorComponent;
