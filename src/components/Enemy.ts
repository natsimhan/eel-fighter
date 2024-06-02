import Phaser from 'phaser';
import {ImageWithBody} from "./ImageWithBody.ts";

export class Enemy extends ImageWithBody {
    velocityX: number;
    velocityY: number;
    limitTop: number;
    limitBottom: number;
    health: number;
    frameCount: number = 0;
    isDamaged: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number, frame: string | number) {
        super(scene, x, y, frame);
        scene.add.existing(this);
        this.setFlipX(true);
        const scaleMax = 3;
        const scale = Phaser.Math.FloatBetween(0.5, scaleMax);
        // Je divise par 2 car j'ai utilisé au final des assets de 128x128
        // au lieu de 64x64 comme dans l'article. Je ne le fais pas avant pour
        // conserver les ratios de calculs de vélocité.
        this.setScale(scale / 2);
        this.setOrigin(0, .5);
        this.velocityX = -50 - 150 * (scaleMax - scale);
        this.velocityY = (Phaser.Math.Between(0, 1) ? 1 : -1) * 100 * (scaleMax - scale);

        // Le 50 ici doit être inférieur à la limite haute et basse du spawn,
        // afin que les oscillations verticales ne sortent pas de l'écran.
        const velocityAmplitudeY = Phaser.Math.Between(0, 50);
        this.limitTop = y - velocityAmplitudeY;
        this.limitBottom = y + velocityAmplitudeY;

        // La vie dépendra de la taille, plus c'est gros plus ce sera dur à tuer.
        this.health = 10 * scale;
    }

    takeDamage(damage: number): void {
        this.health -= damage;
        this.setTintFill(0xffffff);
        this.isDamaged = true;
        this.frameCount = 0;
        if (this.health <= 0) {
            this.destroy();
        }
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

        this.updateInsideBodySize();
    }
}
