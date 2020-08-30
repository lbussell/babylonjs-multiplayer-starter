import { Player } from "./Player";
import { Logger } from "./Logger";
import { GameState } from "./State";

export class Game {
    private _gameState: GameState;

    constructor(private readonly _logger: Logger) {
        this._gameState = { players: [] };
        this._logger.log("created game");
    }

    public update(): void {
        this._gameState.players.forEach((player: Player) => {
            player.sendGameState(this._gameState);
        });
    }

    public get players(): Player[] {
        return this._gameState.players;
    }

    public addPlayer(player: Player) {
        this._gameState.players.push(player);
        this._logger.userLog(player.id, "joined game");
    }

    public removePlayer(id: string) {
        this._gameState.players = this._gameState.players.filter(
            (player) => id !== player.id
        );
        this._logger.userLog(id, "left game");
    }
}
