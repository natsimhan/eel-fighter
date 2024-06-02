import Phaser from 'phaser';

export class Player extends Phaser.GameObjects.Image {
    playerLimit: Phaser.Geom.Rectangle;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor(scene: Phaser.Scene) {
        super(scene,
            scene.scale.width / 6,
            scene.scale.height / 2,
            'fishPack',
            'fishTile_fish_player');
        scene.add.existing(this);

        // Je divise par 2 car j'ai utilisé au final des assets de 128x128
        // au lieu de 64x64 comme dans l'article.
        this.setScale(.5);

        const playerBounds = this.getBounds();
        this.playerLimit = new Phaser.Geom.Rectangle(
            playerBounds.width,
            playerBounds.height - playerBounds.height / 2,
            scene.scale.width - 2 * playerBounds.width,
            scene.scale.height - playerBounds.height,
        );

        if (scene.input.keyboard) {
            this.cursors = scene.input.keyboard.createCursorKeys();
        }
    }

    update() {
        const playerVelocity = 5;

        if (this.cursors.left.isDown) {
            this.setX(this.x - playerVelocity);
        } else if (this.cursors.right.isDown) {
            this.setX(this.x + playerVelocity);
        }

        if (this.cursors.up.isDown) {
            this.setY(this.y - playerVelocity);
        } else if (this.cursors.down.isDown) {
            this.setY(this.y + playerVelocity);
        }

        if (this.y < this.playerLimit.top) {
            this.y = this.playerLimit.top;
        } else if (this.y > this.playerLimit.bottom) {
            this.y = this.playerLimit.bottom;
        }

        if (this.x < this.playerLimit.left) {
            this.x = this.playerLimit.left;
        } else if (this.x > this.playerLimit.right) {
            this.x = this.playerLimit.right;
        }
    }
}