import {Scene} from "phaser";
import GameplayScene from "./gameplay-scene";

export default class BootloaderScene extends Scene {
  constructor(config) {
    super(config);
  }

  preload() {
    this.load.image("rfranco-logo", "./assets/rfranco-logo.png");
  }

  async create(){
    this.scene.add("Gameplay", GameplayScene, true);
  }
}