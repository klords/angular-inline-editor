"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const TYPEAHEAD_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => TypeAheadEditorComponent),
    multi: true
};
class TypeAheadEditorComponent {
    constructor(element, _renderer) {
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
        this.preValue = '';
        this.editing = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.typeaheadReqflag = false;
        this.scrolledIndex = -1;
        this.availOptions = [];
        this._value = '';
    }
    onSaveTypeahead() {
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
    }
    onCancelTypeahead() {
        this.editing = false;
        this._value = this._originalValue;
        this.typeaheadReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseTypeahead() {
        this.editing = false;
    }
    // Control Value Accessors for ngModel
    get value() {
        return this._value;
    }
    set value(v) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }
    // Required for ControlValueAccessor interface
    writeValue(value) {
        this._value = value;
    }
    // Required forControlValueAccessor interface
    registerOnChange(fn) {
        this.onChange = fn;
    }
    // Required forControlValueAccessor interface
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    // Do stuff when the input element loses focus
    onBlur($event) {
        this.editing = false;
    }
    // Start the editting process for the input element
    edit(value) {
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
        setTimeout(() => { this.typeaheadEditorControl.nativeElement.focus(); }, 300);
    }
    IsTypeAheadTextEmpty() {
        return (this._value === undefined || this._value == '');
    }
    search(event) {
        event.preventDefault();
        // key down
        if (event.keyCode === 40) {
            if (this.scrolledIndex < this.availOptions.length - 1) {
                this.scrolledIndex = ++this.scrolledIndex;
            }
        }
        else if (event.keyCode === 38) { // key up
            // key up
            if (this.scrolledIndex >= 0) {
                this.scrolledIndex = --this.scrolledIndex;
            }
        }
        else if (event.keyCode === 13) { // enter
            // enter
            this.selectItem(this.availOptions[this.scrolledIndex]);
        }
        else { // search
            // search
            if (event.target.value === undefined || event.target.value === null || event.target.value === "") {
                this.open = false;
                return;
            }
            else {
                this.aheadKey = event.target.value;
                this.availOptions = this.options.filter(item => item[this.displayValue].toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1);
                this.open = true;
            }
        }
    }
    selectItem(item) {
        var dd = document.getElementById("ngtypeaheadsearch");
        dd.value = item[this.displayValue];
        this.value = item;
        this.open = false;
    }
    GetDisplayText(c) {
        return c[this.displayValue];
    }
    isIndexSelected(item, i) {
        return this.scrolledIndex == i ? true : false;
    }
    ngOnInit() {
    }
}
TypeAheadEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'typeahed-editor',
                template: `<div *ngIf="editing" >
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #typeaheadEditorControl  [class.is-invalid]="typeaheadReqflag"  class="form-control" id="ngtypeaheadsearch" [value]="value | displayFieldName:displayValue" type="text" [placeholder]="placeholder" (keyup)="search($event)">
      
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveTypeahead()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelTypeahead()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div *ngIf="typeaheadReqflag" class="text-danger">
          {{requiredMessage}}
      </div>
  <div class="typeahead-menu" *ngIf="open">
      <div class="typeahead-item" [class.scrollSelected]="isIndexSelected(item,i)"  *ngFor="let item of availOptions; let i = index" (click)="selectItem(item)" [innerHTML]="item[displayValue] | highlight:[aheadKey]"></div>
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsTypeAheadTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsTypeAheadTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{GetDisplayText(value)}}&nbsp;</div>
  </div>
</div>`,
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
TypeAheadEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
TypeAheadEditorComponent.propDecorators = {
    "typeaheadEditorControl": [{ type: core_1.ViewChild, args: ['typeaheadEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "options": [{ type: core_1.Input },],
    "dataValue": [{ type: core_1.Input },],
    "displayValue": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
};
exports.TypeAheadEditorComponent = TypeAheadEditorComponent;
