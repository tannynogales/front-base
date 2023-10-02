import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  ControlValueAccessor,
  UntypedFormControl,
  UntypedFormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public parentForm!: UntypedFormGroup;
  @Input('formControlName') public fieldName!: string;

  @Input() public label!: string;
  @Input() public type: 'text' | 'password' | 'date' | 'file' = 'text';

  @Input() public validations: Array<any> = [];

  @Output() change = new EventEmitter<string>();

  public value!: string;

  public get isValid(): boolean {
    return (
      this.formField?.valid &&
      (this.formField?.touched || this.formField?.dirty) &&
      this.validationsErrors.length === 0
    );
  }

  public get validationsErrors() {
    const errors: string[] = [];

    this.validations.forEach((validation) => {
      if (validation != null) errors.push(validation);
    });
    return errors;
  }

  changed!: (value: string) => {};

  touched!: () => {};

  @Input() isDisabled!: boolean;

  constructor() {}

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any) {
    this.changed = fn;
  }

  registerOnTouched(fn: any) {
    this.touched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public onChange(event: Event) {
    const value: string = (event.target as HTMLInputElement).value;
    this.changed(value);
    this.change.emit(value);
  }

  get formField(): UntypedFormControl {
    return this.parentForm?.get(this.fieldName) as UntypedFormControl;
  }
}
