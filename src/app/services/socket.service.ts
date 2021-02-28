import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { Constants } from '../shared/config/constants';
import { Game, GameData } from '../shared/models/game';
import { Player } from '../shared/models/player';
import { ApiService } from './api.service';
import { GameService } from './game.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  players: BehaviorSubject<Player[]> = new BehaviorSubject<Player[]>([]);
  status: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private constants: Constants,
    private apiService: ApiService,
    private gameService: GameService,
  ) {
    this.socket = io(this.constants.SOCKET_ENDPOINT, { autoConnect: false });

    this.socket.on('disconnect', (reason: string) => {
      if (reason === 'io server disconnect') {
        // the disconnection was initiated by the server, you need to reconnect manually
        this.socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    this.socket.on('refresh', () => {
      // trigger ApiService to fetch gameData
      console.log('Refresh');
      if (status) {
        this.apiService.getGameData(this.gameService.getToken()).subscribe((gameData: Game) => {
          this.players.next(gameData.players);
        });
      } else {
        this.apiService.getLobbyData(this.gameService.getToken()).subscribe((gameData: GameData) => {
          this.players.next(gameData.players);
        });
      }
    });

    this.socket.on('start', () => {
      this.status.next(true);
    });
  }

  setSocket(gameID: number): void {
    this.socket.io.opts.query = { gameID: gameID.toString() };
    this.socket.connect();
  }
}
