import {Scene, GameObjects} from 'phaser';

export class MainMenu extends Scene {
    background: GameObjects.Image;
    logo: GameObjects.Image;
    title: GameObjects.Text;
    start: GameObjects.Text;
    fish: Phaser.GameObjects.Image;

    constructor() {
        super('MainMenu');
    }

    create() {
        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');

        this.logo = this.add.image(this.scale.width / 2, this.scale.height / 4, 'logo');

        this.title = this.add.text(this.scale.width * .5, this.logo.getBounds().bottom, 'Eel Fighter', {
            fontFamily: 'Arial Black', fontSize: 42 * 1.5, color: '#0052ff',
            stroke: '#ffffff', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5).setRotation(-.1);

        this.start = this.add.text(this.scale.width / 2, this.scale.height * 2 / 3, 'Start', {
            fontFamily: 'Arial Black', fontSize: 38, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        }).setOrigin(0.5)
            .setInteractive();

        this.start.on('pointerdown', () => {
            this.scene.start('Game');
        });
        setTimeout(() => {
            this.input.keyboard?.on('keydown', () => {
                this.scene.start('Game');
            });
        }, 2000);


        this.fish = this.add.image(
            this.start.getBounds().left - 20,
            this.start.getBounds().centerY,
            'fishPack',
            'fishTile_fish_player'
        );
        this.fish.setOrigin(1, .5);
        this.fish.setScale(this.start.getBounds().height * .6 / this.fish.getBounds().height);

        this.tweens.add({
            targets: this.fish,
            x: this.fish.x + 10,
            yoyo: true,
            repeat: -1,
            duration: 500,
            ease: 'Sine.easeInOut'
        });
    }
}
