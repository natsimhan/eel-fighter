import {Scene, GameObjects} from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    start: GameObjects.Text;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(512, 384, 'background');

        this.logo = this.add.image(512, 300, 'logo');

        this.title = this.add.text(this.scale.width * .5, this.logo.getBounds().bottom, 'Aby-Breakout', {
            fontFamily: 'Arial Black', fontSize: 42*1.5, color: '#0052ff',
            stroke: '#ffffff', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setRotation(-.1);

        this.start = this.add.text(512, 460, 'Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)
            .setInteractive();

        this.start.on('pointerdown', () => {
            this.scene.start('Game');
        });
    }
}
