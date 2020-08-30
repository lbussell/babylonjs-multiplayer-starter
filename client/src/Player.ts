import { Vector2, Vector3, Mesh, Scene } from "@babylonjs/core";
import { ClientState } from "./State";
import { MeshManager } from "./MeshManager";
import { KeyboardInputManager } from "./KeyboardInputManager";
import { PLAYER_INITIAL_STATE } from "./State";

const MOVEMENT_SPEED = 0.3;

export interface InputFrame {
    forwards: boolean;
    back: boolean;
    left: boolean;
    right: boolean;
    space: boolean;
}

export class Player {
    private readonly _mesh: Mesh;
    private _state: ClientState = PLAYER_INITIAL_STATE;
    private _velocity: Vector3 = new Vector3(0, 0, 0);

    constructor(
        private readonly _scene: Scene,
        private readonly _meshManager: MeshManager,
        private readonly _keyboardInputManager: KeyboardInputManager,
        initialState: ClientState = PLAYER_INITIAL_STATE
    ) {
        this._mesh = this._meshManager.createPlayerMesh("player");
        this.updateState(initialState);
    }

    public updateState(newState: ClientState) {
        this._state = newState;
        const [x, y, z] = newState.position;
        this._mesh.position.x = x;
        this._mesh.position.y = y;
        this._mesh.position.z = z;
    }

    public get state() {
        return this._state;
    }

    public update() {
        const input = this.getInputFrame();
        const movement = this.calculateMovement(input);
        this.applyMovement(movement);
    }

    private applyMovement(movement: Vector3) {
        this.updateState({
            position: [
                this._state.position[0] + movement.x,
                this._state.position[1] + movement.y,
                this._state.position[2] + movement.z,
            ],
        });
    }

    private getInputFrame(): InputFrame {
        let inputFrame = {
            forwards: false,
            back: false,
            left: false,
            right: false,
            space: false,
        };
        inputFrame.forwards = this._keyboardInputManager.keyIsDown("w");
        inputFrame.left = this._keyboardInputManager.keyIsDown("a");
        inputFrame.back = this._keyboardInputManager.keyIsDown("s");
        inputFrame.right = this._keyboardInputManager.keyIsDown("d");
        return inputFrame;
    }

    /**
     * Scaled by deltaTime
     */
    private calculateMovement(inputFrame: InputFrame): Vector3 {
        const horizontalMove = new Vector2(0, 0);
        if (inputFrame.forwards) horizontalMove.x -= 1;
        if (inputFrame.back) horizontalMove.x += 1;
        if (inputFrame.left) horizontalMove.y -= 1;
        if (inputFrame.right) horizontalMove.y += 1;
        const normalizedHorizontalMove = horizontalMove
            .normalize()
            .scale(MOVEMENT_SPEED);
        return new Vector3(
            (normalizedHorizontalMove.x * this._scene.deltaTime) / 60,
            (0 * this._scene.deltaTime) / 60,
            (normalizedHorizontalMove.y * this._scene.deltaTime) / 60
        );
    }
}
