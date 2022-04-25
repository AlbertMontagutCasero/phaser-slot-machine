import {SlotMachine} from "../domain/slot-machine";
import {Randomizer} from "../domain/random/randomizer";
import {RailView} from "./rail-view";
import {SlotMachineBackgroundGameObject} from "./slot-machine-background-game-object";
import {SlotMachineHandleGameObject} from "./slot-machine-handle-game-object";
import {SlotMachineOptionBackgroundGameObject} from "./slot-machine-option-background-game-object";

export class SlotMachineView{
  constructor(scene) {
    new SlotMachineBackgroundGameObject(scene);
    new SlotMachineOptionBackgroundGameObject(scene);
    this.handleGameObject = new SlotMachineHandleGameObject(scene);
    this.handleGameObject.subscribeToPressed(this);

    this.slotMachine = new SlotMachine(new Randomizer());

    this.railViews = [];
    for (let i = 0; i < 3; i++){
      this.railViews.push(new RailView(scene, i));
    }
  }

  async notifyHandlePressed(){
    if (this.isPlaying){
      return;
    }

    this.isPlaying = true;
    this.handleGameObject.setToRunning();
    await this.play();
    this.handleGameObject.setToRunning(false);
    this.isPlaying = false;
  }

  async play() {
    let combination = this.slotMachine.getCombination();
    await this.scrollToCombination(combination);
  }

  async scrollToCombination(combination){
    let scrollingPromises = [];
    for (let i = 0; i < combination.length; i++){
      let currentCombination = combination[i];
      let currentRail = this.railViews[i];
      let scrollingPromise = currentRail.scrollTo(currentCombination);
      scrollingPromises.push(scrollingPromise);
    }

    await Promise.all(scrollingPromises);
  }
}


