import {Scene} from "phaser";
import {SlotMachineView} from "../slot-machine-view";

export default class GameplayScene extends Scene {
  constructor(config) {
    super(config);
  }

  create(){
    new SlotMachineView(this);
    this.cameras.main.setBackgroundColor(0x190657);
    let sound = this.sound.add("music");
    sound.play();
  }
}