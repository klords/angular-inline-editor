"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const TIME_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => TimeEditorComponent),
    multi: true
};
class TimeEditorComponent {
    constructor(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.type = 'text';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.format = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = '';
        this.editing = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.timeReqflag = false;
        this.showTimePicker = false;
    }
    onSaveTime() {
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
    }
    onCancelTime() {
        this.editing = false;
        this._value = this._originalValue;
        this.timeReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseTime() {
        this.editing = false;
        this.timeReqflag = false;
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
    }
    IsDateEmpty() {
        return (this._value === undefined || this._value == null);
    }
    ngOnInit() {
    }
    ShowTimePicker() {
        this.showTimePicker = !this.showTimePicker;
    }
}
TimeEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'time-editor',
                template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #timeEditorControl type="time" [class.is-invalid]="timeReqflag" [ngModel]="value | date:'shortTime'" (ngModelChange)="value=$event"
          class="form-control" [id]="id" type="text" [placeholder]="placeholder" (click)="ShowTimePicker()">
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveTime()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelTime()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
     
  </div>
  <div *ngIf="timeReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="time-picker-container" *ngIf="showTimePicker">
          <div class="time-picker">
              <div class="time-picker-body">
                  <timepicker [(ngModel)]="value" [(ngModel)]="value" [hourStep]=1 [minuteStep]=1></timepicker>
                  <br/>
                  <button class="btn btn-block btn-success" (click)="ShowTimePicker()">SET</button>
              </div>
          </div>
      </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsDateEmpty()" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">{{value | date:format}}&nbsp;</div>
  </div>
</div>`,
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
TimeEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
TimeEditorComponent.propDecorators = {
    "timeEditorControl": [{ type: core_1.ViewChild, args: ['timeEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "type": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "format": [{ type: core_1.Input },],
    "stringlength": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
};
exports.TimeEditorComponent = TimeEditorComponent;
