import {Scene} from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fishPaddle: Phaser.Physics.Arcade.Image;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#00002a');

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.createFishPaddle();
    }

    private createFishPaddle() {
        this.fishPaddle = this.physics.add.image(
            this.scale.width * .5,
            this.scale.height * .9,
            'fishPack',
            'fishTile_103'
        );

        this.fishPaddle.setCollideWorldBounds(true);
        this.fishPaddle.setImmovable(true);

        this.fishPaddle.setVelocity(0, -100);
    }
}
