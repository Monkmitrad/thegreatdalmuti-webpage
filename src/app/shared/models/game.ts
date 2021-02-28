import { Player } from "./player";

export class Game {
    gameID: number;
    players: Array<Player>;
    gameStatus: boolean;
}

export class GameData extends Game {
    currentPlayer: string;
    cardStack: Array<number>;
    lastPlayed: string;
    remainingPlayers: Array<string>;
    cardsSwitched: boolean
}
