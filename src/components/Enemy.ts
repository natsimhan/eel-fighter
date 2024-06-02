import Phaser from 'phaser';

export class Enemy extends Phaser.GameObjects.Image {

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, 'fishPack', texture);
        scene.add.existing(this);
        this.setFlipX(true);
        const scaleMax = 3;
        const scale = Phaser.Math.FloatBetween(0.5, scaleMax);
        this.setScale(scale);
        this.setOrigin(0,.5);
    }

    update(delta: number): void {
    }
}
