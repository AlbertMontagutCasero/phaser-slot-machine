import {Scene} from "phaser";
import GameplayScene from "./gameplay-scene";
import {OptionId} from "../../shared/option-id";

export default class BootloaderScene extends Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image("rfranco-logo", "./assets/rfranco-logo.png");
    this.load.image("slot-machine", "./assets/slot-machine4.png");
    this.load.image("slot-machine-handle", "./assets/slot-machine2.png");
    this.load.image("slot-machine-handle-pressed", "./assets/slot-machine3.png");
    this.load.image("slot-machine-option-background", "./assets/slot-machine5.png");

    for (let optionIdKey in OptionId) {
      this.load.image(`option-${optionIdKey}`, `./assets/slot-symbol-${optionIdKey}.png`);
    }

    this.load.audio("music", "./assets/music.mp3");
  }

  create() {
    this.scene.add("Gameplay", GameplayScene, true);
  }
}