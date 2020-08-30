import { ClientState, GameState } from "./State";
import { WebsocketEvents } from "./Constants";

export class ServerConnection {
    constructor(private readonly _socket: SocketIOClient.Socket) {
        this._socket.on("connect", () => {
            console.log(`Connected to server!`);
        });
    }

    public sendClientState(clientState: ClientState) {
        this._socket.emit(WebsocketEvents.ClientState, clientState);
    }

    public onRecieveState(callback: (newState: GameState) => void) {
        this._socket.on(WebsocketEvents.GameState, (state: GameState) =>
            callback(state)
        );
    }

    public onDisconnect(callback: () => void) {
        this._socket.on("disconnect", () => {
            console.log(`Disconnected from server!`);
            callback();
        });
    }
}
