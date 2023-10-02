import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss'],
})
export class InputErrorComponent implements OnInit {
  @Input() public fieldName!: string;
  @Input() hasError: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
