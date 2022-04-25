import {GameObjects} from "phaser";
import assert from "../shared/assert";

export class OptionGameObject extends GameObjects.Image {
  constructor(scene, texture, railPosition) {
    assert(scene !== undefined);
    assert(texture !== undefined);
    assert(railPosition !== undefined);

    const horizontalMargin = 150;
    super(scene, 495 + horizontalMargin * railPosition, 400, texture);
    this.scene.add.existing(this);
  }
}