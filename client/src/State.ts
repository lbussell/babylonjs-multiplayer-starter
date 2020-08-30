export interface ClientState {
    position: [number, number, number];
}

export interface GameState {
    players: { id: string; state: ClientState }[];
}

export const GAME_INITIAL_STATE: GameState = {
    players: [],
};

export const PLAYER_INITIAL_STATE: ClientState = {
    position: [0, 1, 0],
};
