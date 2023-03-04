import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-checkbox',
  templateUrl: './general-checkbox.component.html',
  styleUrls: ['./general-checkbox.component.css']
})
export class GeneralCheckboxComponent implements OnInit {
  @Input() isChecked: boolean = false;
  @Output() checkboxClick = new EventEmitter<boolean>();
  currentCheck: boolean;
  constructor() { }

  ngOnInit(): void {
    this.currentCheck = this.isChecked;
  }

  onCheckboxChange() {
    this.currentCheck = !this.currentCheck;
    this.checkboxClick.emit(this.currentCheck);
  }
}
