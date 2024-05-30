import {Scene} from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fishPaddle: Phaser.Physics.Arcade.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() {
        super('Game');
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#00002a');

        this.background = this.add.image(512, 384, 'background');
        this.background.setAlpha(0.5);

        this.createFishPaddle();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }
    }

    update() {
        this.fishPaddle.setVelocityX(0);
        this.fishPaddle.setVelocityY(0);

        if (this.cursors.left.isDown) {
            this.fishPaddle.setVelocityX(-300);
            this.fishPaddle.setFlipX(true);
        } else if (this.cursors.right.isDown) {
            this.fishPaddle.setVelocityX(300);
            this.fishPaddle.setFlipX(false);
        }

        if (this.cursors.up.isDown) {
            this.fishPaddle.setVelocityY(-300);
        } else if (this.cursors.down.isDown) {
            this.fishPaddle.setVelocityY(300);
        }
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
    }
}
