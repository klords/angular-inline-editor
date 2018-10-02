import { ElementRef, Renderer, OnInit, EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare class TypeAheadEditorComponent implements ControlValueAccessor, OnInit {
    private _renderer;
    typeaheadEditorControl: ElementRef;
    label: string;
    placeholder: string;
    required: string;
    requiredMessage: string;
    disabled: string;
    id: string;
    options: any[];
    dataValue: string;
    displayValue: string;
    onSave: EventEmitter<string>;
    onCancel: EventEmitter<string>;
    onEditing: EventEmitter<string>;
    open: boolean;
    displayText: string;
    filterArg: any;
    preValue: string;
    editing: boolean;
    onChange: any;
    onTouched: any;
    typeaheadReqflag: boolean;
    scrolledIndex: number;
    availOptions: any[];
    aheadKey: string;
    private _originalValue;
    private _value;
    constructor(element: ElementRef, _renderer: Renderer);
    onSaveTypeahead(): void;
    onCancelTypeahead(): void;
    onCloseTypeahead(): void;
    value: any;
    writeValue(value: any): void;
    registerOnChange(fn: (_: any) => {}): void;
    registerOnTouched(fn: () => {}): void;
    onBlur($event: Event): void;
    edit(value: any): void;
    IsTypeAheadTextEmpty(): Boolean;
    search(event: any): void;
    selectItem(item: any): void;
    GetDisplayText(c: any): string;
    isIndexSelected(item: any, i: number): boolean;
    ngOnInit(): void;
}
