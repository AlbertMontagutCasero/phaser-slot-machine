import {SlotMachine} from "../domain/slot-machine";
import {Randomizer} from "../domain/random/randomizer";
import {SlotMachineBackgroundGameObject} from "./game-object/slot-machine-background-game-object";
import {SlotMachineHandleGameObject} from "./game-object/slot-machine-handle-game-object";
import {RailsView} from "./rails-view";

export class SlotMachineView{
  constructor(scene) {
    new SlotMachineBackgroundGameObject(scene);
    this.railsView = new RailsView(scene);
    this.handleGameObject = new SlotMachineHandleGameObject(scene);
    this.handleGameObject.subscribeToPressed(this);

    this.slotMachine = new SlotMachine(new Randomizer());
  }

  async notifyHandlePressed(){
    if (this.isPlaying){
      return;
    }

    this.isPlaying = true;
    this.handleGameObject.setToInRunState();
    await this.play();
    this.handleGameObject.setToInRunState(false);
    this.isPlaying = false;
  }

  async play() {
    let combination = this.slotMachine.getCombination();
    await this.railsView.playCombination(combination);
  }
}


