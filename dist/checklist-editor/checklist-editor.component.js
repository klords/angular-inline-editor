"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const CHECKLIST_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => CheckListEditorComponent),
    multi: true
};
class CheckListEditorComponent {
    constructor(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.type = 'text';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.options = [];
        this.displayValue = '';
        this.dataValue = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.editing = false;
        this.preValue = '';
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.checklistReqflag = false;
        this._value = [];
    }
    onSaveChecklist() {
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
    }
    onCancelChecklist() {
        this.editing = false;
        this._value = this._originalValue;
        this.checklistReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseChecklist() {
        this.editing = false;
        this.checklistReqflag = false;
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
        if (this.disabled === 'true') {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this._originalValue = value;
    }
    updateSelectedChecks(event) {
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
    }
    GetDisplayText(c) {
        for (var i = 0; i < this.options.length; i++) {
            if (this.options[i][this.dataValue] == c) {
                return this.options[i][this.displayValue];
            }
        }
    }
    IsChecklistEmpty() {
        return (this._value == undefined || this._value.length < 0);
    }
    ngOnInit() {
    }
}
CheckListEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'checklist-editor',
                template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="">
      <div class="form-check">
          <label #checklistEditorControl *ngFor="let item of options" class="form-check-label">
              <input type="checkbox" class="form-check-input" [value]="item[dataValue]" [class.is-invalid]="checklistReqflag" [name]="item[displayValue]" (change)="updateSelectedChecks($event) "
                  [checked]="(value && (-1 !== value.indexOf(item[dataValue])) ? 'checked' : '')" />&nbsp;{{item[displayValue]}}&nbsp;&nbsp;
          </label>
      </div>
  </div>
  <div *ngIf="checklistReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="text-right">
      <button class="btn btn-sm btn-success" type="button" (click)="onSaveChecklist()">
          <i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button class="btn btn-sm btn-danger" type="button" (click)="onCancelChecklist()">
          <i class="fa fa-times" aria-hidden="true"></i>
      </button>
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsChecklistEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsChecklistEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="form-inline">
          <div *ngFor="let c of value">
              <span [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{GetDisplayText(c)}}</span>&nbsp;&nbsp;
          </div>
      </div>
  </div>
</div>`,
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
CheckListEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
CheckListEditorComponent.propDecorators = {
    "checklistEditorControl": [{ type: core_1.ViewChild, args: ['checklistEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "type": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "options": [{ type: core_1.Input },],
    "displayValue": [{ type: core_1.Input },],
    "dataValue": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
};
exports.CheckListEditorComponent = CheckListEditorComponent;
