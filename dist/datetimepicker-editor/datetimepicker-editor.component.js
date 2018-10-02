"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const DATETIME_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => DateTimeEditorComponent),
    multi: true
};
class DateTimeEditorComponent {
    constructor(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.format = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.preValue = '';
        this.editing = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.dateReqflag = false;
        this.selectedDateTime = false;
        this.showTimePicker = false;
    }
    SelectedDate() {
        // check if value is null or undefined
        if (this.showTimePicker == false)
            this.showTimePicker = true;
        else
            this.showTimePicker = false;
        //this.showTimePicker = !this.showTimePicker;
        this.selectedTime = this.value;
    }
    SelectDateTime() {
        this._value = new Date(this._value.toDateString() + ' ' + this.selectedTime.toTimeString());
        this.SelectedDate();
    }
    onSaveDateTime() {
        if (this.required == "true") {
            if (this.datetimeEditorControl.nativeElement.value == null || this.datetimeEditorControl.nativeElement.value === undefined || this.datetimeEditorControl.nativeElement.value === "") {
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
    }
    onCancelDateTime() {
        this.editing = false;
        this._value = this._originalValue;
        this.dateReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    ShowCalendar() {
        if (this.showTimePicker)
            return;
        else
            this.ctrldp.show();
    }
    onCloseDate() {
        this.editing = false;
        this.dateReqflag = false;
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
}
DateTimeEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'datetime-editor',
                template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <input #datetimeEditorControl type="datetime" (click)="ShowCalendar()"  [class.is-invalid]="dateReqflag" [ngModel]="value | date:'short'" (ngModelChange)="value=$event" class="form-control" [id]="id" type="text" [placeholder]="placeholder" >
      <span #dp="bsDatepicker" bsDatepicker (onHidden)="SelectedDate()" [(bsValue)]="value"></span>
      <span class="input-group-btn">
          <button class="btn btn-sm btn-success" type="button" (click)="onSaveDateTime()">
              <i class="fa fa-check" aria-hidden="true"></i>
          </button>
          <button class="btn btn-sm btn-danger" type="button" (click)="onCancelDateTime()">
              <i class="fa fa-times" aria-hidden="true"></i>
          </button>
      </span>
  </div>
  <div class="time-picker-container" *ngIf="showTimePicker">
      <div class="time-picker">
          <div class="time-picker-body">
              <timepicker [(ngModel)]="selectedTime" [hourStep]=1 [minuteStep]=1></timepicker>
              <br/>
              <button class="btn btn-block btn-success" (click)="SelectDateTime()">OK</button>
          </div>
      </div>
  </div>
  <div *ngIf="dateReqflag" class="text-danger">
      {{requiredMessage}}
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
                    '.bs-datepicker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
                    '.time-picker-container { position: absolute; display: block; top: 70px; left: 75px; z-index: 1080; }',
                    '.time-picker { display: flex; align-items: stretch; flex-flow: row wrap; background: #fff; box-shadow: 0 0 10px 0 #aaa; position: relative; z-index: 1; }',
                    '.time-picker-body { padding: 15px; }',
                    '.bs-timepicker-field { width: 50px !important; }'
                ],
                providers: [DATETIME_EDIT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
DateTimeEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
DateTimeEditorComponent.propDecorators = {
    "datetimeEditorControl": [{ type: core_1.ViewChild, args: ['datetimeEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "format": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
    "ctrldp": [{ type: core_1.ViewChild, args: ['dp',] },],
};
exports.DateTimeEditorComponent = DateTimeEditorComponent;
