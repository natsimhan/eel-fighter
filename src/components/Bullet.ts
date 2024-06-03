import Phaser from 'phaser';
import {ImageWithBody} from "./ImageWithBody.ts";

export class Bullet extends ImageWithBody {
    velocityX: number;
    limitDestroy: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, velocityX: number) {
        super(scene, x, y, 'fishTile_bubble_0');
        scene.add.existing(this);
        this.setTintFill(0x7fe5ff);
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
        // On ajoute une trace de bulle qu'on fait disparaitre
        // à notre position actuelle avant de la modifier.
        const trace = this.scene.add.image(this.x, this.y, 'fishPack', 'fishTile_bubble_0');
        trace.setAlpha(.8);
        trace.setTintFill(this.tint);
        trace.setScale(this.scale);
        this.scene.tweens.add({
            targets: trace,
            duration: 100,
            alpha: 0,
            scale: .1,
            onComplete: () => trace.destroy(true),
        });
        // Changement de position de la munition :
        this.x += this.velocityX * delta / 1000;
        this.updateInsideBodySize();

        if (!Phaser.Geom.Rectangle.Contains(this.limitDestroy, this.x, this.y)) {
            this.destroy();
        }
    }
}