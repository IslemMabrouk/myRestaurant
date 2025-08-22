import { Injectable } from '@angular/core';
import { Client, IMessage } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private client!: Client;

  connect(platId: number): Observable<any> {
    
    return new Observable(observer => {
      if (!platId) {
        observer.error('Plat ID is undefined');
        return;
      }

      this.client = new Client({
        brokerURL: undefined, // SockJS requires brokerURL undefined
        webSocketFactory: () => new SockJS(`${environment.BaseUrl}/ws`),
        reconnectDelay: 5000,
        debug: (str) => console.log('STOMP:', str)
      });

      this.client.onConnect = () => {
        console.log('WebSocket connected to platId', platId);

        const subscription = this.client.subscribe(`/topic/reviews/${platId}`, (message: IMessage) => {
          observer.next(JSON.parse(message.body));
        });

        // Optional: handle unsubscription on observable teardown
        return () => subscription.unsubscribe();
      };

      this.client.onStompError = (frame) => {
        console.error('WebSocket STOMP error:', frame);
        observer.error(frame);
      };

      this.client.activate();

      // Cleanup when observable unsubscribes
      return () => {
        if (this.client && this.client.active) {
          this.client.deactivate();
        }
      };
    });
  }
}
