"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular/core");
const forms_1 = require("@angular/forms");
const TAGS_EDIT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(() => TagsEditorComponent),
    multi: true
};
class TagsEditorComponent {
    constructor(element, _renderer) {
        this._renderer = _renderer;
        this.label = '';
        this.placeholder = '';
        this.required = 'false';
        this.requiredMessage = '';
        this.disabled = 'false';
        this.id = '';
        this.stringlength = '';
        this.onSave = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onEditing = new core_1.EventEmitter();
        this.tags = [];
        this.preValue = [];
        this.editing = false;
        this.onChange = Function.prototype;
        this.onTouched = Function.prototype;
        this.tagsReqflag = false;
        this._value = [];
    }
    onSaveTags() {
        if (this.required == "true") {
            if (this.value == null || this.value.length <= 0 || this.value == undefined) {
                this.tagsReqflag = true;
                return;
            }
            else {
                this.tagsReqflag = false;
            }
        }
        else {
            this.tagsReqflag = false;
        }
        this.onSave.emit('clicked save');
        this.editing = false;
    }
    onCancelTags() {
        this.editing = false;
        this.value = this._originalValue;
        this.tagsReqflag = false;
        this.onCancel.emit('clicked cancel');
    }
    onCloseTags() {
        this.editing = false;
        this.tagsReqflag = false;
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
    edit(value) {
        if (this.disabled === "true") {
            return;
        }
        this.onEditing.emit('editing click');
        this.preValue = value;
        this.editing = true;
        this.tags = this.value;
        if (value != null || value != undefined)
            this._originalValue = value.slice(0);
        setTimeout(() => { this.tagsEditorControl.nativeElement.focus(); }, 300);
    }
    IsTagsEmpty(value) {
        var r;
        r = (this.value === null || this.value === undefined);
        if (r === false) {
            if (value.length <= 0) {
                r = true;
            }
        }
        return r;
    }
    removeTagItem(i) {
        this.tags.splice(i, 1);
        this._value = this.tags;
    }
    addTag(event) {
        debugger;
        var input = event.target;
        var ta = input.value;
        if (this.tags === null || this.tags === undefined)
            this.tags = [];
        var foundI = this.tags.indexOf(ta);
        if (foundI == -1) {
            input.value = '';
            input.focus();
            this.tags.push(ta);
            this.value = this.tags;
        }
        else {
            return;
        }
    }
    ngOnInit() {
    }
}
TagsEditorComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: 'tags-editor',
                template: `<div *ngIf="editing">
  <label class="col-form-label">{{label}}</label>
  <div class="input-group">
      <div class="tags" [class.tags-is-invalid]="tagsReqflag">
          <ul class="tag-list">
              <li class="tag-item" *ngFor="let t of value; let i = index">
                  <span>{{t}}</span>
                  <a class="tag-remove-button" (click)="removeTagItem(i)">×</a>
              </li>
          </ul>
          <input #tagsEditorControl id="ngtags-control" type="text" class="tag-input" autocomplete="off" (keydown.enter)="addTag($event)" [placeholder]="placeholder">
      </div>
  </div>
  <div *ngIf="tagsReqflag" class="text-danger">
      {{requiredMessage}}
  </div>
  <div class="text-right">
      <button class="btn btn-sm btn-success" type="button" (click)="onSaveTags()">
          <i class="fa fa-check" aria-hidden="true"></i>
      </button>
      <button class="btn btn-sm btn-danger" type="button" (click)="onCancelTags()">
          <i class="fa fa-times" aria-hidden="true"></i>
      </button>
  </div>
</div>
<div *ngIf="!editing">
  <div class="form-group">
      <label class="col-form-label">{{label}}</label>
      <div *ngIf="IsTagsEmpty(value)" (click)="edit(value)" (focus)="edit(value);" tabindex="0" class="inline-edit-empty">
          {{placeholder}}&nbsp;
      </div>
      <div *ngIf="!IsTagsEmpty(value)" (click)="edit(value)" (focus)="edit(value);" tabindex="0" [ngClass]="disabled == 'true' ? 'inline-no-edit' : 'inline-edit'">
          <ul class="tag-list">
              <li class="tag-item" *ngFor="let t of value;">
                  <span>{{t}}</span>
              </li>
          </ul>
      </div>
  </div>
</div>`,
                styles: [
                    '.tags { -moz-appearance: none; -webkit-appearance: none;  border: 1px solid #ccc; border-radius: 4px; width: 100%; -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);   -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075); box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);  -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  -moz-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;  -moz-appearance: textfield; -webkit-appearance: textfield; padding: 1px; overflow: hidden; word-wrap: break-word; cursor: text; background-color: #fff; border: 1px solid darkgray; box-shadow: 1px 1px 1px 0 lightgrey inset; height: 100%; }',
                    '.tag-list { margin: 0;padding: 0; list-style-type: none; }',
                    '.tag-input { border: 0; outline: none; margin: 2px; padding: 0; padding-left: 5px; float: left; height: 26px; width: 100%; font: 14px; }',
                    '.tag-item { margin: 2px; padding: 0 5px; display: inline-block; font: 14px; height: 26px; line-height: 25px; border: 1px solid #acacac; border-radius: 3px; background: -webkit-linear-gradient(top, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%); background: linear-gradient(to bottom, #f0f9ff 0%, #cbebff 47%, #a1dbff 100%); color: #fff; background: #428bca; border: 1px solid #357ebd; }',
                    '.tag-remove-button { margin: 0 0 0 5px; padding: 0; border: none; background: none; cursor: pointer; vertical-align: middle; font: bold 16px Arial, sans-serif; color: #585858; }',
                    '.col-form-label { padding-bottom: 0px !important; }',
                    '.inline-edit { text-decoration: none; border-bottom: #007bff dashed 1px; cursor: pointer; width: auto;}',
                    '.inline-no-edit { text-decoration: none; border-bottom: #959596 dashed 1px; cursor: not-allowed; width: auto;}',
                    '.inline-edit-empty{ text-decoration: none; border-bottom: red dashed 1px; cursor: pointer; width: auto; color: #b9b8b8;}',
                    '.tags-is-invalid { border-color: red; }'
                ],
                providers: [TAGS_EDIT_CONTROL_VALUE_ACCESSOR]
            },] },
];
/** @nocollapse */
TagsEditorComponent.ctorParameters = () => [
    { type: core_1.ElementRef, },
    { type: core_1.Renderer, },
];
TagsEditorComponent.propDecorators = {
    "tagsEditorControl": [{ type: core_1.ViewChild, args: ['tagsEditorControl',] },],
    "label": [{ type: core_1.Input },],
    "placeholder": [{ type: core_1.Input },],
    "required": [{ type: core_1.Input },],
    "requiredMessage": [{ type: core_1.Input },],
    "disabled": [{ type: core_1.Input },],
    "id": [{ type: core_1.Input },],
    "stringlength": [{ type: core_1.Input },],
    "onSave": [{ type: core_1.Output },],
    "onCancel": [{ type: core_1.Output },],
    "onEditing": [{ type: core_1.Output },],
};
exports.TagsEditorComponent = TagsEditorComponent;
