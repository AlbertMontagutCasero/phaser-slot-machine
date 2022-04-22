import Phaser from "phaser";
import {gameConfig} from "./phaser-game-configuration";

function loadGame() {
  new Phaser.Game(gameConfig);
}

loadGame();