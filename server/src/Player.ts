import { ClientSocket } from "./ClientSocket";
import { ClientState, GameState } from "./State";

export class Player {
    public readonly id: string;
    private readonly _maxHealth = 100;
    // x, y, z
    private _state: ClientState;
    private _health = this._maxHealth;

    constructor(
        private readonly _clientSocket: ClientSocket,
        initialState: ClientState
    ) {
        this.id = this._clientSocket.id;
        this._state = initialState;
        this._clientSocket.onRecieveState((newState: ClientState) =>
            this.updateState(newState)
        );
    }

    private updateState(newState: ClientState) {
        this._state = newState;
    }

    public get state(): ClientState {
        return this._state;
    }

    public sendGameState(gameState: GameState) {
        const otherPlayers = gameState.players.filter(
            (player: Player) => this.id != player.id
        );
        const filteredState: GameState = {
            ...gameState,
            players: otherPlayers,
        };
        this._clientSocket.sendGameState(filteredState);
    }
}
