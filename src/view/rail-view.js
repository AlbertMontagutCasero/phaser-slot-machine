import {getOptionIdIndex, OptionId} from "../shared/option-id";
import {Math} from "phaser";
import {OptionGameObject} from "./game-object/option-game-object";

export class RailView{
  constructor(scene, position, railsMask) {
    this.scene = scene;
    this.options = this.createOptions(position, railsMask);
    this.distributeVertically();

    this.currentPosition = 4;
  }

  /**
   *
   * @param position
   * @param mask
   * @return {OptionGameObject[]}
   */
  createOptions(position, mask) {
    let options = [];

    const groupOfOptions = 8;
    for (let i = 0; i < groupOfOptions; i++) {
      for (let optionIdKey in OptionId) {
        const option = new OptionGameObject(this.scene, `option-${optionIdKey}`, position);
        option.setMask(mask);
        options.push(option);
      }
    }
    return options;
  }

  distributeVertically(){
    let secondGroupFirstPositionIndex = this.getPositionInPixels(4);
    this.options.forEach((option,index )=> {
      option.setY(secondGroupFirstPositionIndex + this.getPositionDisplacementInPixels(index));
    });
  }

  getPositionInPixels(index){
    const firstOptionPosition = 410;
    return firstOptionPosition - this.getPositionDisplacementInPixels(index);
  }

  getPositionDisplacementInPixels(index){
    return 120 * index;
  }

  getNextRailPosition(optionId){
    return getOptionIdIndex(optionId) + Object.keys(OptionId).length;
  }

  async scrollTo(optionId) {
    let nextRailPosition = this.getNextRailPosition(optionId);
    let scrollObjective = this.currentPosition + nextRailPosition;
    this.currentPosition = nextRailPosition;
    let pixelsToMove = this.getPositionDisplacementInPixels(scrollObjective);

    await this.scrollToObjective(pixelsToMove);
    const numberOfLoops = 5;
    for( let i = 0; i < numberOfLoops; i++){
      this.teleportToLoopStart();
      await this.loopAnimation();
    }

    this.teleportToLoopStart();
    await this.endAnimation();
    this.teleportToLoopStart();
  }

  async scrollToObjective(pixelsToReachTheObjective) {
    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: this.options,
        y: `-= ${pixelsToReachTheObjective}`,
        duration: 1000,
        ease: Math.Easing.Back.In,
        onComplete: (tween, targets, param) => {
          resolve();
        },
      });
    });
  }

  teleportToLoopStart() {
    for (let i = 0; i < this.options.length; i++) {
      let current = this.options[i];
      current.y += this.getPositionDisplacementInPixels(8);
    }
  }

  async loopAnimation(){
    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: this.options,
        y: `-= ${this.getPositionDisplacementInPixels(8)}`,
        duration: 1000,

        onComplete: (tween, targets, param) => {
          resolve();
        },
      });
    });
  }

  async endAnimation() {
    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: this.options,
        y: `-= ${this.getPositionDisplacementInPixels(8)}`,
        duration: 1000,
        ease: Math.Easing.Sine.Out,
        onComplete: (tween, targets, param) => {
          resolve();
        },
      });
    });
  }
}