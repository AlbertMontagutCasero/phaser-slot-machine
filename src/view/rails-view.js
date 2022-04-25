import {RailsBackgroundGameObject} from "./game-object/rails-background-game-object";
import {RailView} from "./rail-view";

export class RailsView {
  constructor(scene) {
    new RailsBackgroundGameObject(scene);
    const mask = this.createMask(scene);

    this.railViews = [];
    for (let i = 0; i < 3; i++){
      this.railViews.push(new RailView(scene, i, mask));
    }
  }

  createMask(scene){
    let shape = scene.make.graphics();
    shape.fillStyle(0xffffff);
    shape.beginPath();

    shape.fillRect(400 ,295, 600, 215);

    return shape.createGeometryMask();
  }

  async playCombination(combination) {
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