import {GameObjects} from "phaser";
import assert from "../shared/assert";

export class SlotMachineOptionBackgroundGameObject extends GameObjects.Image {
  constructor(scene) {
    assert(scene !== undefined);

    super(scene, 640, 360, "slot-machine-option-background");
    this.scene.add.existing(this);
    this.setScale(1.16);
  }
}