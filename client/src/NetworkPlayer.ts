import { Mesh } from "@babylonjs/core";
import { MeshManager } from "./MeshManager";
import { ClientState, PLAYER_INITIAL_STATE } from "./State";

export class NetworkPlayer {
    private readonly _mesh: Mesh;
    private _state: ClientState = PLAYER_INITIAL_STATE;

    constructor(
        public readonly id: string,
        initialState: ClientState,
        meshManager: MeshManager
    ) {
        this._mesh = meshManager.createPlayerMesh(id);
        this.updateState(initialState);
    }

    public updateState(newState: ClientState) {
        this._state = newState;
        const [x, y, z] = newState.position;
        this._mesh.position.x = x;
        this._mesh.position.y = y;
        this._mesh.position.z = z;
    }

    public disconnect() {
        this._mesh.dispose();
    }
}
