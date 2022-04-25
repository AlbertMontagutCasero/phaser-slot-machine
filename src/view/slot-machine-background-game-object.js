import {GameObjects} from "phaser";
import assert from "../shared/assert";

export class SlotMachineBackgroundGameObject extends GameObjects.Image {
  constructor(scene) {
    assert(scene !== undefined);
    const gameSize = scene.game.scale.gameSize;
    const centerScreenX = gameSize.width / 2;
    const centerScreenY = gameSize.height / 2;

    super(scene, centerScreenX, centerScreenY, "slot-machine");
    this.scene.add.existing(this);

    this.setScale(1.16);
  }
}