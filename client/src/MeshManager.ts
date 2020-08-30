import {
    Color3,
    Mesh,
    MeshBuilder,
    Scene,
    StandardMaterial,
} from "@babylonjs/core";

export class MeshManager {
    constructor(private readonly _scene: Scene) {}

    public createPlayerMesh(id: string): Mesh {
        const mesh = MeshBuilder.CreateCylinder(id, { height: 2, diameter: 1 });
        const material = new StandardMaterial(id, this._scene);
        material.diffuseColor = Color3.Random();
        mesh.material = material;
        return mesh;
    }
}
