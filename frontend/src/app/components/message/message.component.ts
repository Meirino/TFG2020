import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';
import {Message} from '../../core/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @Input() mensaje: Message;
  container: HTMLElement;

  constructor() {}

  ngOnInit() {}

  ngAfterViewChecked() {
    this.container = document.getElementById('message_row');
    this.container.scrollTop = this.container.scrollHeight;
  }

}
