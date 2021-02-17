import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { GameService } from '../services/game.service';
import { Player } from '../shared/models/player';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  gameID: number;
  infoText: string;

  players: Array<Player> = [{name: 'Test', ready: false, cards: [1], rank: 1, points: 1}];
  playerName: string = 'Test';

  constructor(
    private apiService: ApiService,
    private gameService: GameService
  ) { }

  ngOnInit(): void {
    this.gameID = this.gameService.getGameID();
  }

  onReady(event: any): void {
    const status: boolean = event.target.checked;   

    this.apiService.ready(status, this.gameService.getToken());
  }

}
