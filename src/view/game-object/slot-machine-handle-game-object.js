import {GameObjects} from "phaser";
import assert from "../../shared/assert";

export class SlotMachineHandleGameObject extends GameObjects.Image {
  constructor(scene) {
    assert(scene !== undefined);

    super(scene, 690, 410, "slot-machine-handle");
    this.scene.add.existing(this);

    this.observers = [];

    this.setToInRunState(false);
    this.input.hitArea.setTo(675, 300, 80, 80);

    this.on("pointerdown", () => {
      this.notifyAll();
    });
  }

  setToInRunState(hasToEnable = true) {
    const texture = hasToEnable ? "slot-machine-handle-pressed" : "slot-machine-handle";
    this.setTexture(texture);
    if (hasToEnable) {
      this.disableInteractive();
    } else {
      this.setInteractive({useHandCursor: true});
    }
  }

  notifyAll() {
    for (let i = 0; i < this.observers.length; i++) {
      this.observers[i].notifyHandlePressed();
    }
  }

  subscribeToPressed(observer) {
    this.observers.push(observer);
  }

  unSubscribeToPressed(observer) {
    this.observers = this.observers.filter((item) => {
      return item !== observer;
    });
  }
}