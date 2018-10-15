"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CheckBoxEditorComponent; }),
    multi: true
};
var CheckBoxEditorComponent = /** @class */ (function () {
    function CheckBoxEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = ''; // Placeholder value for input element
        this.required = false; // Is input requried?
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.checkedDisplayValue = '';
        this.uncheckedDisplayValue = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.display = '';
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
    }
    CheckBoxEditorComponent.prototype.onSaveCheckBox = function () {
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    CheckBoxEditorComponent.prototype.onCancelCheckBox = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.onCancel.emit('clicked cancel');
    };
    CheckBoxEditorComponent.prototype.onCloseInput = function () {
        this.editing = false;
    };
    Object.defineProperty(CheckBoxEditorComponent.prototype, "value", {
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
    CheckBoxEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    CheckBoxEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    CheckBoxEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    CheckBoxEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    CheckBoxEditorComponent.prototype.edit = function (value) {
        if (this.disabled === 'true')
            return;
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    CheckBoxEditorComponent.prototype.checkedChange = function (event) {
        this.value = event.target.checked;
    };
    CheckBoxEditorComponent.prototype.ngOnInit = function () {
    };
    CheckBoxEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'checkbox-editor',
                    template: '<div *ngIf="editing">' +
                        '<div class="row">' +
                        '<div class="col-md-6">' +
                        '<div class="form-check">' +
                        '<label #checkboxEditorControl class="form-check-label">' +
                        '<input type="checkbox" class="form-check-input" [(checked)]="value" (change)="checkedChange($event)" />&nbsp;{{label}}' +
                        '</label>' +
                        '</div>' +
                        '</div>' +
                        '<div class="col-md-6 text-right">' +
                        '<button class="btn btn-sm btn-success" type="button" (click)="onSaveCheckBox()">' +
                        '<i class="fa fa-check" aria-hidden="true"></i>' +
                        '</button>' +
                        '<button class="btn btn-sm btn-danger" type="button" (click)="onCancelCheckBox()">' +
                        '<i class="fa fa-times" aria-hidden="true"></i>' +
                        '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '<div *ngIf="!editing">' +
                        '<div class="form-group">' +
                        '<div (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == \'true\' ? \'inline-no-edit\' : \'inline-edit\'">{{value == true ? checkedDisplayValue : uncheckedDisplayValue}}&nbsp;</div>' +
                        '</div>' +
                        '</div>',
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}'
                    ],
                    providers: [CHECKBOX_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    CheckBoxEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    CheckBoxEditorComponent.propDecorators = {
        checkboxEditorControl: [{ type: core_1.ViewChild, args: ['checkboxEditorControl',] }],
        label: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        checkedDisplayValue: [{ type: core_1.Input }],
        uncheckedDisplayValue: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return CheckBoxEditorComponent;
}());
exports.CheckBoxEditorComponent = CheckBoxEditorComponent;
