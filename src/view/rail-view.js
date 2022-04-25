import {Math} from "phaser";
import {OptionGameObject} from "./game-object/option-game-object";
import {RailViewMotor} from "./rail-view.motor";
import {OptionId} from "../shared/option-id";


export class RailView {
  constructor(scene, position, railsMask) {
    this.scene = scene;
    this.motor = new RailViewMotor();
    this.options = this.createOptions(position, railsMask);
    this.currentObjective = this.motor.getRailPosition(OptionId.seven);
  }

  /**
   *
   * @param position
   * @param mask
   * @return {OptionGameObject[]}
   */
  createOptions(position, mask) {
    const optionGameObjects = [];
    const startOptions = this.motor.getStartOptions();
    for (const option of startOptions) {
      const optionGameObject = new OptionGameObject(this.scene, `option-${option.optionId}`, position);
      optionGameObject.setMask(mask);
      optionGameObject.y = option.yPosition;
      optionGameObjects.push(optionGameObject);
    }
    return optionGameObjects;
  }

  async scrollTo(optionId) {

    await this.scrollToObjective(optionId);
    const numberOfLoops = 5;
    await this.loopAnimation(numberOfLoops);
    await this.endAnimation();
  }

  async scrollToObjective(objectiveId) {
    const destination = this.motor.getRailPosition(objectiveId);
    const pixelsPerSecond = this.motor.getDisplacementPixelsByPosition(4);
    const {
      timeToReachMs,
      distancePixelsMs
    } = this.motor.getDistancePixelsAndTimeToReach(this.currentObjective, destination, pixelsPerSecond);

    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: {distance: 0},
        distance: distancePixelsMs,
        duration: timeToReachMs,
        ease: Math.Easing.Back.In,
        onUpdate: (tween) => {
          let previousDistance = tween.data[0].previous;
          let currentDistance = tween.data[0].current;
          let deltaDistance = currentDistance - previousDistance;
          this.options.forEach(option => this.motor.moveOption(option, deltaDistance));
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  async loopAnimation(loops) {
    const destination = this.motor.getRailPosition(this.currentObjective);
    const pixelsPerSecond = this.motor.getDisplacementPixelsByPosition(12);
    const {
      timeToReachMs,
      distancePixelsMs
    } = this.motor.getDistancePixelsAndTimeToReach(this.currentObjective, destination, pixelsPerSecond);

    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: {distance: 0},
        distance: distancePixelsMs * loops,
        duration: timeToReachMs * loops,
        onUpdate: (tween) => {
          let previousDistance = tween.data[0].previous;
          let currentDistance = tween.data[0].current;
          let deltaDistance = currentDistance - previousDistance;
          this.options.forEach(option => this.motor.moveOption(option, deltaDistance));
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }

  async endAnimation() {
    const destination = this.motor.getRailPosition(this.currentObjective);
    const pixelsPerSecond = this.motor.getDisplacementPixelsByPosition(12);
    const {
      timeToReachMs,
      distancePixelsMs
    } = this.motor.getDistancePixelsAndTimeToReach(this.currentObjective, destination, pixelsPerSecond);

    await new Promise(resolve => {
      this.scene.tweens.add({
        targets: {distance: 0},
        distance: distancePixelsMs,
        duration: timeToReachMs,
        ease: Math.Easing.Sine.Out,
        onUpdate: (tween) => {
          let previousDistance = tween.data[0].previous;
          let currentDistance = tween.data[0].current;
          let deltaDistance = currentDistance - previousDistance;
          this.options.forEach(option => this.motor.moveOption(option, deltaDistance));
        },
        onComplete: () => {
          resolve();
        },
      });
    });
  }
}