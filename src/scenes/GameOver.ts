import {Scene} from 'phaser';

export class GameOver extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    gameoverText: Phaser.GameObjects.Text;
    scoreText: Phaser.GameObjects.Text;
    score: number;

    constructor() {
        super('GameOver');
    }

    init(data: { score: number }) {
        this.score = data.score;
        this.playSoundGameOver();
    }

    create() {
        this.camera = this.cameras.main
        this.camera.setBackgroundColor(0xff0000);

        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
        this.background.setAlpha(0.2);

        this.gameoverText = this.add.text(this.scale.width / 2, this.scale.height / 3, 'Game Over', {
            fontFamily: 'Arial Black', fontSize: 64, color: '#ffffff',
            stroke: '#000000', strokeThickness: 8,
            align: 'center'
        });
        this.gameoverText.setOrigin(0.5);

        this.scoreText = this.add.text(this.scale.width / 2, this.scale.height * 2 / 3,
            "Score : " + this.score, {
                fontFamily: 'Arial Black', fontSize: 48, color: '#ffffff',
                stroke: '#000000', strokeThickness: 8,
                align: 'center'
            });
        this.scoreText.setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('MainMenu');
        });
        setTimeout(() => {
            this.input.keyboard?.on('keydown', () => {
                this.scene.start('MainMenu');
            });
        }, 2000);
    }

    private playSoundGameOver(): void {
        const keySound = 'game-over-arcade';
        if (!this.sound.get(keySound)) {
            this.sound.add(keySound);
        }
        this.sound.play(keySound, {volume: 1});
    }
}
