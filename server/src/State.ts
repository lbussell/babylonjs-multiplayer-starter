import { Player } from "./Player";

export interface ClientState {
    position: [number, number, number];
}

export interface GameState {
    players: Player[];
}

export interface DecodedGameState {
    players: { id: string; state: ClientState }[];
}
