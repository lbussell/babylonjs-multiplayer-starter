import * as io from "socket.io-client";
import { Engine } from "@babylonjs/core/Engines/engine";
import { getSceneModuleWithName } from "./createScene";
import { ServerConnection } from "./ServerConnection";
import { Game } from "./Game";
import { MeshManager } from "./MeshManager";
import { KeyboardInputManager } from "./KeyboardInputManager";
import { Player } from "./Player";

const getModuleToLoad = (): string | undefined => {
    // ATM using location.search
    if (!location.search) {
        return;
    } else {
        return location.search.substr(location.search.indexOf("scene=") + 6);
    }
};

export const babylonInit = async (): Promise<void> => {
    // get the module to load
    const moduleName = getModuleToLoad();
    const createSceneModule = await getSceneModuleWithName("default");

    // Execute the pretasks, if defined
    await Promise.all(createSceneModule.preTasks || []);
    // Get the canvas element
    const canvas = document.getElementById("renderCanvas") as HTMLCanvasElement;
    // Generate the BABYLON 3D engine
    const engine = new Engine(canvas, true);

    // Create the scene
    const scene = await createSceneModule.createScene(engine, canvas);

    // Register a render loop to repeatedly render the scene
    engine.runRenderLoop(function () {
        scene.render();
    });

    // Watch for browser/canvas resize events
    window.addEventListener("resize", function () {
        engine.resize();
    });

    const meshManager = new MeshManager(scene);
    const keyboardInputManager = new KeyboardInputManager(scene);
    const serverConnection = new ServerConnection(io("http://localhost:8080"));
    const player = new Player(scene, meshManager, keyboardInputManager);
    const game = new Game(serverConnection, meshManager, player);

    const update = () => {
        // Update game
        game.update();
    };

    setInterval(() => game.sendClientState());

    scene.onBeforeRenderObservable.add(() => update());
};

babylonInit().then(() => {
    // scene started rendering, everything is initialized
});
