"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const NUMBER_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => NumberEditorComponent),
    multi: true
};
class NumberEditorComponent {
    constructor(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.step = 1;
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = '';
        this.editing = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.numberReqflag = false;
        this.numberBigflag = false;
    }
    onSaveInputNumber() {
        const enteredValue = this.numberEditorControl.nativeElement.value;
        this.numberReqflag = this.required === "true" && !enteredValue;
        this.numberBigflag = enteredValue && (Number(enteredValue) > this.maxNumber || Number(enteredValue) < this.minNumber);
        if (this.numberBigflag || this.numberReqflag)
            return;
        this.onSave.emit('clicked save');
        this.editing = false;
    }
    onCancelInputNumber() {
        this.editing = false;
        this._value = this._originalValue;
        this.numberReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseInputNumber() {
        this.editing = false;
        this.numberReqflag = false;
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
        setTimeout(() => { this.numberEditorControl.nativeElement.focus(); }, 300);
    }
    IsInputTextEmpty() {
        return (this._value === undefined || this._value == null);
    }
    ngOnInit() {
    }
}
NumberEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'number-editor',
                template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #numberEditorControl class="form-control" 
          [class.is-invalid]="numberReqflag || numberBigflag"
          [id]="id" 
          [(ngModel)]="value" 
          type="number" 
          [placeholder]="placeholder"
          [max]="maxNumber"
          [min]="minNumber"
          [step]="step">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveInputNumber()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelInputNumber()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div *ngIf="numberReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div *ngIf="numberBigflag" class="text-danger">
      Number enter is out of bound MAX:{{maxNumber}} MIN:{{minNumber}}
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsInputTextEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value}}&nbsp;</div>
  </div>
</div>`,
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
NumberEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
NumberEditorComponent.propDecorators = {
    "numberEditorControl": [{ type: core_1.ViewChild, args: ['numberEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "maxNumber": [{ type: core_1.Input },],
    "minNumber": [{ type: core_1.Input },],
    "step": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
};
exports.NumberEditorComponent = NumberEditorComponent;
