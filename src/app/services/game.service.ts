import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameID: number;
  private token: string;

  constructor() { }

  getGameID(): number {
    return this.gameID;
  }

  setgameID(value: number) {
    this.gameID = value;
  }

  getToken(): string {
    return this.token;
  }

  setToken(value: string) {
    this.token = value;
  }
}
