import {Scene} from 'phaser';

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    fishPaddle: Phaser.GameObjects.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    paddleLimit: Phaser.Geom.Rectangle;

    constructor() {
        super('Game');

    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#00002a');

        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
        this.background.setAlpha(0.2);

        this.createFishPaddle();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }
    }

    update() {
        const paddleVelocity = 5;

        if (this.cursors.left.isDown) {
            this.fishPaddle.setX(this.fishPaddle.x - paddleVelocity);
        } else if (this.cursors.right.isDown) {
            this.fishPaddle.setX(this.fishPaddle.x + paddleVelocity);
        }

        if (this.cursors.up.isDown) {
            this.fishPaddle.setY(this.fishPaddle.y - paddleVelocity);
        } else if (this.cursors.down.isDown) {
            this.fishPaddle.setY(this.fishPaddle.y + paddleVelocity);
        }

        if (this.fishPaddle.y < this.paddleLimit.top) {
            this.fishPaddle.y = this.paddleLimit.top;
        } else if (this.fishPaddle.y > this.paddleLimit.bottom) {
            this.fishPaddle.y = this.paddleLimit.bottom;
        }

        if (this.fishPaddle.x < this.paddleLimit.left) {
            this.fishPaddle.x = this.paddleLimit.left;
        } else if (this.fishPaddle.x > this.paddleLimit.right) {
            this.fishPaddle.x = this.paddleLimit.right;
        }

    }

    private createFishPaddle() {
        this.fishPaddle = this.add.sprite(
            this.scale.width / 6,
            this.scale.height / 2,
            'fishPack',
            'fishTile_103'
        );

        const fishPaddleBounds = this.fishPaddle.getBounds();
        this.paddleLimit = new Phaser.Geom.Rectangle(
            fishPaddleBounds.width,
            fishPaddleBounds.height - fishPaddleBounds.height / 2,
            this.scale.width - 2 * fishPaddleBounds.width,
            this.scale.height - fishPaddleBounds.height,
        );
    }
}
