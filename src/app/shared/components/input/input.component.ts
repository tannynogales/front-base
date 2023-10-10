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
  @Input() public type: 'text' | 'password' | 'date' | 'file' | 'number' =
    'text';

  @Input() public validations: Array<any> = [];

  @Output() change = new EventEmitter<string>();

  public value!: string;

  // Defines when the error message should be displayed below the input
  public get showError(): boolean {
    // If I did not touch the input, then I don't show the error yet
    if (!this.formField?.touched) return false;

    // Dirty: true if the user changes the original value of the field
    // this.formField?.dirty

    // If I have some errors, then I show the error
    if (!this.formField?.valid || this.validationsErrors.length > 0)
      return true;
    else return false;
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
