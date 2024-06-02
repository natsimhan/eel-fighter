import {Scene} from 'phaser';

export class Hud extends Scene {
    scoreText: Phaser.GameObjects.Text;
    score: number;

    constructor() {
        super('Hud');
        this.score = 0;
    }

    create() {
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontFamily: 'Arial Black',
            fontSize: 32,
            stroke: '#000000', strokeThickness: 8,
            color: '#ffffff'
        });
    }

    updateScore(score: number) {
        this.score += score;
        this.scoreText.setText(`Score: ${this.score}`);
    }
}
