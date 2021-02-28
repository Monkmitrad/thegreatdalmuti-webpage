import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { GameService } from '../services/game.service';
import { SocketService } from '../services/socket.service';
import { Player } from '../shared/models/player';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit, OnDestroy {

  gameID: number;
  infoText: string;

  players: Array<Player>;
  playerName: string;

  socketStatusSubscription: Subscription;
  socketPlayerSubscription: Subscription;

  constructor(
    private apiService: ApiService,
    private gameService: GameService,
    private socketService: SocketService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.gameID = this.gameService.getGameID();
    this.playerName = this.gameService.getName();

    if (!this.gameID) {
      this.router.navigate(['/start']);
      return;
    }

    this.socketService.setSocket(this.gameID);

    this.socketStatusSubscription = this.socketService.status.subscribe((status: boolean) => {
      if (status) {
        this.infoText = 'Game will start now';
        setTimeout(() => {
          this.infoText = '';
          this.router.navigate(['/game']);
        }, 5000);
      }
    });

    this.socketPlayerSubscription = this.socketService.players.subscribe((players: Array<Player>) => {
      this.players = players;
    });
  }

  ngOnDestroy(): void {
    if (this.socketStatusSubscription) {
      this.socketStatusSubscription.unsubscribe();
    }
    if (this.socketPlayerSubscription) {
      this.socketPlayerSubscription.unsubscribe();
    }
  }

  onReady(event: any): void {
    const status: boolean = event.target.checked;   

    this.apiService.ready(status, this.gameService.getToken());
  }
}
