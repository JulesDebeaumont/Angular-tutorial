import { Component, OnChanges, OnInit } from '@angular/core';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {

  // Ici messageService est public car il est utilisé dans le messages.component.html
  // Par défault il est private
  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

}
