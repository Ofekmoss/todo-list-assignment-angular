import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-general-button',
  templateUrl: './general-button.component.html',
  styleUrls: ['./general-button.component.css']
})
export class GeneralButtonComponent implements OnInit {
  @Input() text: string;
  @Output() buttonClick = new EventEmitter<void>();
  
  constructor() { }

  ngOnInit(): void {
  }

  onButtonClick() {
    this.buttonClick.emit();
  }

}
