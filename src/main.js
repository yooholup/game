import { Start } from './scenes/Start.js';
import { GameOver } from './scenes/GameOver.js';
import { GameEnd } from './scenes/GameEnd.js';

const config = {
    type: Phaser.AUTO,
    title: 'CMPM 120 Project Skeleton',
    description: '',
    parent: 'game-container',
    width: 1280,
    height: 720,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                x: 0,
                y: 200
            },
            debug: true
        }
    },
    scene: [
        GameEnd, Start, GameOver
    ],
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
}

new Phaser.Game(config);
            