import Phaser from 'phaser';
import {Bullet} from './Bullet';
import {Game} from "../scenes/Game.ts";

export class Player extends Phaser.GameObjects.Image {
    playerLimit: Phaser.Geom.Rectangle;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    spaceKey: Phaser.Input.Keyboard.Key;
    lastFired: number;
    health: number = 100;
    frameCount: number = 0;
    isDamaged: boolean = false;
    isDead: boolean = false;

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
            this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        }

        this.lastFired = 0;
    }

    update(time: number, delta: number): void {
        if (this.isDamaged) {
            this.frameCount++;
            if (this.frameCount === 1) {
                this.clearTint();
                this.setTintFill(0x808080); // j'applique le tint en gris à la frame suivante
            } else if (this.frameCount === 2) {
                this.clearTint(); // Je supprime le tint à la 3e frame
                this.isDamaged = false; // Réinitialiser l'état de dommage
            }
        }

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

        if (this.spaceKey.isDown && time > this.lastFired) {
            const bulletVelocityX = 500;
            const bullet = new Bullet(this.scene, this.getBounds().right, this.y, bulletVelocityX);
            if (this.scene instanceof Game) {
                this.scene.playerShoot(bullet);
            }
            this.lastFired = time + 100;
        }
    }

    // Retourne true si on vient de tuer le player
    takeDamage(damage: number): boolean {
        if (this.isDead) {
            return false;
        }
        this.health -= damage;
        this.setTintFill(0xffffff);
        this.isDamaged = true;
        this.frameCount = 0;
        if (this.health <= 0) {
            this.isDead = true;
            return true;
        }
        return false;
    }
}