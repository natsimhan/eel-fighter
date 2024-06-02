import {Boot} from './scenes/Boot';
import {GameOver} from './scenes/GameOver';
import {Game} from './scenes/Game';
import {Hud} from "./scenes/Hud.ts";
import {MainMenu} from './scenes/MainMenu';
import {Preloader} from './scenes/Preloader';

import Phaser from 'phaser';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.WEBGL,
    width: 1024,
    height: 1024 / 16 * 9,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [
        Boot,
        Preloader,
        MainMenu,
        Game,
        Hud,
        GameOver
    ]
};

export default new Phaser.Game(config);
