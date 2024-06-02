import Phaser from 'phaser';
import {ImageWithBody} from "./ImageWithBody.ts";

export class Bullet extends ImageWithBody {
    velocityX: number;
    limitDestroy: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, velocityX: number) {
        super(scene, x, y, 'fishTile_bubble_0');
        scene.add.existing(this);
        this.setScale(.5);
        this.velocityX = velocityX;

        const bounds = this.getBounds();
        this.limitDestroy = new Phaser.Geom.Rectangle(
            -bounds.width,
            -bounds.height,
            scene.scale.width + 2 * bounds.width,
            scene.scale.height + 2 * bounds.height
        );
    }

    update(time: number, delta: number): void {
        this.x += this.velocityX * delta / 1000;
        this.updateInsideBodySize();

        if (!Phaser.Geom.Rectangle.Contains(this.limitDestroy, this.x, this.y)) {
            this.destroy();
        }
    }
}