import Phaser from "phaser";
import BBCodeTextPlugin from "phaser3-rex-plugins/plugins/bbcodetext-plugin";
import BootloaderScene from "./scenes/bootloader-scene";

export const gameConfig = {
  type: Phaser.CANVAS,
  scene: [BootloaderScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1280,
    height: 720,
  },
  physics: { 
    default: "arcade",
    arcade: {
      debug: false,
    },
  },
  plugins: {
    global: [
      {
        key: "rexBBCodeTextPlugin",
        plugin: BBCodeTextPlugin,
        start: true,
      },
    ],
  }
};
