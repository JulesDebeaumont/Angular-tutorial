import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  messages: string[] = []

  constructor() { }

  /**
   * Ajoute un message(string) à l'attribut messages du service
   * @param message 
   * @returns {void}
   */
  add(message: string): void {
    this.messages.push(message)
    
    // Limite de 3 messages max
    if (this.messages.length > 3) {
      this.messages.shift()
    }
  }

  /**
   * Vide le tableau messages du service
   * @returns {void}
   */
  clear(): void {
    this.messages = []
  }

}
