import {Scene} from "phaser";

export default class GameplayScene extends Scene {
  constructor() {
    super( {});
  }

  create(){
    const gameSize = this.scene.scene.game.scale.gameSize;

    const rfrancoLogo = this.scene.scene.add.image(0,0, "rfranco-logo");
    rfrancoLogo.setScale(0.5);
    rfrancoLogo.setPosition(gameSize.width / 2, gameSize.height / 2);
  }
}