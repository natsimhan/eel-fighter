import Phaser from 'phaser';

export class Enemy extends Phaser.GameObjects.Image {
    velocityX: number;
    velocityY: number;
    limitTop: number;
    limitBottom: number;

    constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
        super(scene, x, y, 'fishPack', texture);
        scene.add.existing(this);
        this.setFlipX(true);
        const scaleMax = 3;
        const scale = Phaser.Math.FloatBetween(0.5, scaleMax);
        this.setScale(scale);
        this.setOrigin(0, .5);

        this.velocityX = -50 - 150 * (scaleMax - scale);
        this.velocityY = (Phaser.Math.Between(0, 1) ? 1 : -1) * 100 * (scaleMax - scale);

        // Le 50 ici doit être inférieur à la limite haute et basse du spawn,
        // afin que les oscillations verticales ne sortent pas de l'écran.
        const velocityAmplitudeY = Phaser.Math.Between(0, 50);
        this.limitTop = y - velocityAmplitudeY;
        this.limitBottom = y + velocityAmplitudeY;
    }

    update(delta: number): void {
        this.x += this.velocityX * delta / 1000;
        if (this.x < -this.getBounds().width) {
            this.destroy();
            return;
        }

        this.y += this.velocityY * delta / 1000;
        if (this.y < this.limitTop) {
            this.y = this.limitTop;
            this.velocityY = -this.velocityY;
        } else if (this.y > this.limitBottom) {
            this.y = this.limitBottom;
            this.velocityY = -this.velocityY;
        }
    }
}
