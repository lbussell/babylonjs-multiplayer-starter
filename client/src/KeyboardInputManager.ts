import { Scene, ActionManager, ExecuteCodeAction } from "@babylonjs/core";

export class KeyboardInputManager {
    private readonly _actionManager: ActionManager;
    private _inputMap: { [index: string]: boolean } = {};
    private _registeredActions = new Map<string, ExecuteCodeAction[]>();

    constructor(private readonly _scene: Scene) {
        this._actionManager = new ActionManager(_scene);
        this._actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyDownTrigger, (evt) => {
                this._inputMap[evt.sourceEvent.key] =
                    evt.sourceEvent.type == "keydown";
            })
        );
        this._actionManager.registerAction(
            new ExecuteCodeAction(ActionManager.OnKeyUpTrigger, (evt) => {
                this._inputMap[evt.sourceEvent.key] =
                    evt.sourceEvent.type == "keydown";
            })
        );
        this._scene.actionManager = this._actionManager;
    }

    public addListener(
        key: string,
        onKeyDown: () => void,
        onKeyUp: () => void
    ): [ExecuteCodeAction, ExecuteCodeAction] {
        const keyDownAction = new ExecuteCodeAction(
            ActionManager.OnKeyDownTrigger,
            (event) => {
                if (event.sourceEvent.key === key) {
                    onKeyDown();
                }
            }
        );
        const keyUpAction = new ExecuteCodeAction(
            ActionManager.OnKeyUpTrigger,
            (event) => {
                if (event.sourceEvent.key === key) {
                    onKeyUp();
                }
            }
        );
        this._actionManager.registerAction(keyDownAction);
        this._actionManager.registerAction(keyUpAction);
        return [keyDownAction, keyUpAction];
    }

    public removeListener(action: ExecuteCodeAction): boolean {
        return this._actionManager.unregisterAction(action) as boolean;
    }

    public removeAllListeners(key: string): boolean {
        const actions = this._registeredActions.get(key);
        if (!actions) {
            return false;
        }
        actions.forEach((action) =>
            this._actionManager.unregisterAction(action)
        );
        return true;
    }

    public keyIsDown(key: string): boolean {
        return this._inputMap[key.toLowerCase()];
    }
}
