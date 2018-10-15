"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var TYPEAHEAD_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TypeAheadEditorComponent; }),
    multi: true
};
var TypeAheadEditorComponent = /** @class */ (function () {
    function TypeAheadEditorComponent(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.options = [];
        this.dataValue = '';
        this.displayValue = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.open = false;
        this.preValue = ''; // The value before clicking to edit
        this.editing = false; // Is Component in edit mode?
        this.onChange = Function.prototype; // Trascend the onChange event
        this.onTouched = Function.prototype; // Trascend the onTouch event
        this.typeaheadReqflag = false;
        this.scrolledIndex = -1;
        this.availOptions = [];
        this._value = ''; // Private variable for input value
    }
    TypeAheadEditorComponent.prototype.onSaveTypeahead = function () {
        if (this.required == "true") {
            if (this.typeaheadEditorControl.nativeElement.value == null || this.typeaheadEditorControl.nativeElement.value === undefined || this.typeaheadEditorControl.nativeElement.value === "") {
                this.typeaheadReqflag = true;
                return;
            }
            else {
                this.typeaheadReqflag = false;
            }
        }
        else {
            this.typeaheadReqflag = false;
        }
        if (this._originalValue != this._value) {
            this.onSave.emit('clicked save');
        }
        this.editing = false;
    };
    TypeAheadEditorComponent.prototype.onCancelTypeahead = function () {
        this.editing = false;
        this._value = this._originalValue;
        this.typeaheadReqflag = false;
        this.onCancel.emit('clicked cancel');
    };
    TypeAheadEditorComponent.prototype.onCloseTypeahead = function () {
        this.editing = false;
    };
    Object.defineProperty(TypeAheadEditorComponent.prototype, "value", {
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
    TypeAheadEditorComponent.prototype.writeValue = function (value) {
        this._value = value;
    };
    // Required forControlValueAccessor interface
    TypeAheadEditorComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    // Required forControlValueAccessor interface
    TypeAheadEditorComponent.prototype.registerOnTouched = function (fn) {
        this.onTouched = fn;
    };
    // Do stuff when the input element loses focus
    TypeAheadEditorComponent.prototype.onBlur = function ($event) {
        this.editing = false;
    };
    // Start the editting process for the input element
    TypeAheadEditorComponent.prototype.edit = function (value) {
        var _this = this;
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(function () { _this.typeaheadEditorControl.nativeElement.focus(); }, 300);
    };
    TypeAheadEditorComponent.prototype.IsTypeAheadTextEmpty = function () {
        return (this._value === undefined || this._value == '');
    };
    TypeAheadEditorComponent.prototype.search = function (event) {
        var _this = this;
        event.preventDefault();
        // key down
        if (event.keyCode === 40) {
            if (this.scrolledIndex < this.availOptions.length - 1) {
                this.scrolledIndex = ++this.scrolledIndex;
            }
        }
        else if (event.keyCode === 38) { // key up
            if (this.scrolledIndex >= 0) {
                this.scrolledIndex = --this.scrolledIndex;
            }
        }
        else if (event.keyCode === 13) { // enter
            this.selectItem(this.availOptions[this.scrolledIndex]);
        }
        else { // search
            if (event.target.value === undefined || event.target.value === null || event.target.value === "") {
                this.open = false;
                return;
            }
            else {
                this.aheadKey = event.target.value;
                this.availOptions = this.options.filter(function (item) { return item[_this.displayValue].toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1; });
                this.open = true;
            }
        }
    };
    TypeAheadEditorComponent.prototype.selectItem = function (item) {
        var dd = document.getElementById("ngtypeaheadsearch");
        dd.value = item[this.displayValue];
        this.value = item;
        this.open = false;
    };
    TypeAheadEditorComponent.prototype.GetDisplayText = function (c) {
        return c[this.displayValue];
    };
    TypeAheadEditorComponent.prototype.isIndexSelected = function (item, i) {
        return this.scrolledIndex == i ? true : false;
    };
    TypeAheadEditorComponent.prototype.ngOnInit = function () {
    };
    TypeAheadEditorComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'typeahed-editor',
                    template: "<div *ngIf=\"editing\" >\n  <label class=\"col-form-label\">{{label}}</label>\n  <div class=\"input-group\">\n      <input #typeaheadEditorControl  [class.is-invalid]=\"typeaheadReqflag\"  class=\"form-control\" id=\"ngtypeaheadsearch\" [value]=\"value | displayFieldName:displayValue\" type=\"text\" [placeholder]=\"placeholder\" (keyup)=\"search($event)\">\n      \n      <span class=\"input-group-btn\">\n          <button class=\"btn btn-sm btn-success\" type=\"button\" (click)=\"onSaveTypeahead()\">\n              <i class=\"fa fa-check\" aria-hidden=\"true\"></i>\n          </button>\n          <button class=\"btn btn-sm btn-danger\" type=\"button\" (click)=\"onCancelTypeahead()\">\n              <i class=\"fa fa-times\" aria-hidden=\"true\"></i>\n          </button>\n      </span>\n  </div>\n  <div *ngIf=\"typeaheadReqflag\" class=\"text-danger\">\n          {{requiredMessage}}\n      </div>\n  <div class=\"typeahead-menu\" *ngIf=\"open\">\n      <div class=\"typeahead-item\" [class.scrollSelected]=\"isIndexSelected(item,i)\"  *ngFor=\"let item of availOptions; let i = index\" (click)=\"selectItem(item)\" [innerHTML]=\"item[displayValue] | highlight:[aheadKey]\"></div>\n  </div>\n</div>\n<div *ngIf=\"!editing\">\n  <div class=\"form-group\">\n      <label class=\"col-form-label\">{{label}}</label>\n      <div *ngIf=\"IsTypeAheadTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" class=\"inline-edit-empty\">\n          {{placeholder}}&nbsp;\n      </div>\n      <div *ngIf=\"!IsTypeAheadTextEmpty()\" (click)=\"edit(value)\" (focus)=\"edit(value);\" tabindex=\"0\" [ngClass]=\"disabled == 'true' ? 'inline-no-edit' : 'inline-edit'\">{{GetDisplayText(value)}}&nbsp;</div>\n  </div>\n</div>",
                    encapsulation: core_1.ViewEncapsulation.None,
                    styles: [
                        '.col-form-label { padding-bottom: 0px !important; }',
                        '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                        '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                        '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                        '.typeahead-menu { top: 100%; left: 0;  position: absolute; z-index: 9000; float: left; min-width: 10rem; padding: .5rem 0; margin: .125rem 0 0; font-size: 1rem; color: #212529; text-align: left; list-style: none; background-color: #fff; background-clip: padding-box; border: 1px solid rgba(0,0,0,.15); border-radius: .25rem; }',
                        '.typeahead-item { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: transparent; border: 0;}',
                        '.typeahead-item:hover { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: #cce4ff; border: 0;}',
                        '.scrollSelected { cursor: pointer; display: block; width: 100%; padding: .25rem 1.5rem; clear: both; font-weight: 400; color: #212529; text-align: inherit; white-space: nowrap; background-color: #cce4ff; border: 0;}',
                        '.txt-light { font-weight:bolder; }'
                    ],
                    providers: [TYPEAHEAD_EDIT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    TypeAheadEditorComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef },
        { type: core_1.Renderer }
    ]; };
    TypeAheadEditorComponent.propDecorators = {
        typeaheadEditorControl: [{ type: core_1.ViewChild, args: ['typeaheadEditorControl',] }],
        label: [{ type: core_1.Input }],
        placeholder: [{ type: core_1.Input }],
        required: [{ type: core_1.Input }],
        requiredMessage: [{ type: core_1.Input }],
        disabled: [{ type: core_1.Input }],
        id: [{ type: core_1.Input }],
        options: [{ type: core_1.Input }],
        dataValue: [{ type: core_1.Input }],
        displayValue: [{ type: core_1.Input }],
        onSave: [{ type: core_1.Output }],
        onCancel: [{ type: core_1.Output }],
        onEditing: [{ type: core_1.Output }]
    };
    return TypeAheadEditorComponent;
}());
exports.TypeAheadEditorComponent = TypeAheadEditorComponent;
