"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SELECT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return SelectEditorComponent; }),
    multi: true
};
var SelectEditorComponent = /** @class */ (function () {
    function SelectEditorComponent(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.label = ''; // Label value for input element
        this.required = 'false'; // Is input requried?
        this.requiredMessage = '';
        this.disabled = 'false'; // Is input disabled?
        this.id = '';
        this.options = [];
        this.displayValue = '';
        this.dataValue = '';
        this.placeholder = '';
        this.scrollAfter = 0;
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.clickoutside = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false; // Is Component in edit mode?
        this.preValue = ''; // The value before clicking to edit
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.selectReqflag = false;
        this._value = ''; // Private variable for input value
        this.open = false;
    }
    SelectEditorComponent.prototype.onClick = function (event, targetElement) {
        if (!targetElement) {
            return;
        }
        var clickedInside = this._elementRef.nativeElement.contains(targetElement);
        if (!clickedInside) {
            this.clickoutside.emit(event);
            this.open = false;
        }
    };
    SelectEditorComponent.prototype.emptyMethod = function () {
    };
    SelectEditorComponent.prototype.onSaveSelect = function () {
        if (this.required == "true") {
            if (this.selectEditorControl.nativeElement.value == null || this.selectEditorControl.nativeElement.value === undefined || this.selectEditorControl.nativeElement.value === "") {
                this.selectReqflag = true;
                return;
            }
            else {
                this.selectReqflag = false;
            }
        }
        else {
            this.selectReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    SelectEditorComponent.prototype.onCancelSelect = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.selectReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    SelectEditorComponent.prototype.onCloseSelect = function () {
        this.editing = false;
        this.selectReqflag = false;
    };
    Object.defineProperty(SelectEditorComponent.prototype, "value", {
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
    SelectEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    SelectEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    SelectEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Start the editting process for the input element
    SelectEditorComponent.prototype.edit = function (value) {
        if (this.disabled === 'true') {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    };
    SelectEditorComponent.prototype.isSelected = function (opt) {
        return opt[this.dataValue] === this.value[this.dataValue];
    };
    SelectEditorComponent.prototype.ngOnInit = function () { };
    SelectEditorComponent.prototype.GetDisplayText = function (c) {
        return c ? c[this.displayValue] : '';
    };
    SelectEditorComponent.prototype.IsSelectEmpty = function () {
        return (this._value === undefined || this._value == '');
    };
    SelectEditorComponent.prototype.showSelectOptions = function () {
        this.open = !this.open;
    };
    SelectEditorComponent.prototype.onSelection = function (item) {
        this.showSelectOptions();
        this.value = item;
    };
    SelectEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'select-editor',
                    template: "<div *ngIf=\"editing\" (clickOutside)=\"emptyMethod()\">\n  <label *ngIf=\"label\" class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <input type=\"text\" #selectEditorControl class=\"form-control\"  [class.is-invalid]=\"selectReqflag\" (click)=\"showSelectOptions()\" readonly [value]=\"value | displayName:displayValue\">\n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveSelect()\">\n              <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelSelect()\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n          </button>\n      </span>\n  </div>\n  <div *ngIf=\"selectReqflag\" class=\"text-danger\">\n      {{requiredMessage}}\n  </div>\n  <div class=\"select-menu\" *ngIf=\"open\">\n      <a class=\"select-item\" *ngFor=\"let item of options\" (click)=\"onSelection(item)\">{{item[displayValue]}}</a>\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label *ngIf=\"label\" class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsSelectEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">{{placeholder}}&nbsp;  </div>\n      <div *ngIf=\"!IsSelectEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{GetDisplayText(value)}}&nbsp;</div>\n  </div>\n</div>",
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                        '.select-menu { top: 100%; position: absolute; z-index: 9000; float: left; min-width: 10rem; padding: .5rem 0; margin: .125rem 0 0; font-size: 1rem; color: #212529; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem; overflow-y: auto; max-height: 360px; }',
                        '.select-item { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: transparent; border: 0;}',
                        '.select-item:hover { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: #cce4ff; border: 0;}',
                        '.form-control[readonly] { background-color: #FFF !important; opacity: 1; cursor:pointer; }'
                    ],
                    providers: [SELECT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    SelectEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    SelectEditorComponent.propDecorators = {
        selectEditorControl: [{ type: core_1.ViewChild, args: ['selectEditorControl',] }],
        label: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        options: [{ type: core_1.Input }],
        displayValue: [{ type: core_1.Input }],
        dataValue: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        scrollAfter: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        clickoutside: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }],
        onClick: [{ type: core_1.HostListener, args: ['document:click', ['$event', '$event.target'],] }]
    };
    return SelectEditorComponent;
}());
exports.SelectEditorComponent = SelectEditorComponent;
