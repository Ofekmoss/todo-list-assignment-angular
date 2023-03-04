import { Input, Output, EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-input',
  templateUrl: './general-input.component.html',
  styleUrls: ['./general-input.component.css']
})
export class GeneralInputComponent implements OnInit {
  @Input() inputValue: string = "";
  @Input() isEditTodoInput: boolean = false;
  @Output() inputValueChange = new EventEmitter<string>();
  @Output() enterKeyPressed = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onBlur() {
    this.inputValueChange.emit(this.inputValue);
  }

  onEnter() {
    if (this.isEditTodoInput) {
      this.inputValueChange.emit(this.inputValue);
    } else if (this.inputValue !== "") {
      this.enterKeyPressed.emit(this.inputValue);
      this.inputValue = "";
    }
  }

}
