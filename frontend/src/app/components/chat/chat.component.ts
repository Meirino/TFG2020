import { Component, OnInit } from '@angular/core';
import {DialogflowService} from '../../core/services/dialogflow.service';
import {StorageService} from '../../core/services/storage.service';
import {Message} from '../../core/models/message.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje = '';
  mensajes = [];

  constructor(
    public dialog: DialogflowService,
    public storageService: StorageService
  ) {}

  talk() {
    this.mensajes.push(
      new Message(this.mensaje, false, this.storageService.getCurrentUser())
    );
    this.dialog.getResponse(this.mensaje).subscribe(response => {
      this.mensajes.push(new Message(response, true, this.storageService.getBot));
    });
    this.mensaje = '';
  }

  ngOnInit() {
    this.dialog.getResponse('ayuda').subscribe(response => {
      this.mensajes.push(new Message(response, true, this.storageService.getBot));
    });
  }

}
