import {Scene} from 'phaser';

export class Hud extends Scene {
    scoreText: Phaser.GameObjects.Text;
    score: number;
    playerLifeMax: number;
    playerLife: number;
    lifeBarRectangle: Phaser.Geom.Rectangle;
    lifeBarBackground: Phaser.GameObjects.Graphics;
    lifeBarForeground: Phaser.GameObjects.Graphics;

    constructor() {
        super('Hud');
        this.score = 0;
        this.playerLifeMax = 0;
        this.playerLife = 0;
    }

    init(data: { playerLife: number }) {
        this.score = 0;
        this.playerLifeMax = data.playerLife;
        this.playerLife = data.playerLife;
    }

    create() {
        this.scoreText = this.add.text(10, 10, `Score: ${this.score}`, {
            fontFamily: 'Arial Black',
            fontSize: 32,
            stroke: '#000000', strokeThickness: 8,
            color: '#ffffff'
        }).setOrigin(0, 0);

        // Création de la barre de vie
        this.lifeBarRectangle = new Phaser.Geom.Rectangle(
            this.scale.width - this.scale.height / 40 - this.scale.width / 4,
            this.scale.height / 40,
            this.scale.width / 4,
            this.scale.height / 20,
        );
        this.lifeBarBackground = this.add.graphics();
        this.lifeBarBackground.fillStyle(0x000000);
        this.lifeBarBackground.fillRect(
            this.lifeBarRectangle.left,
            this.lifeBarRectangle.top,
            this.lifeBarRectangle.width,
            this.lifeBarRectangle.height
        );

        this.lifeBarForeground = this.add.graphics();
        this.updateLifeBar();
    }

    updateScore(score: number) {
        this.score += score;
        this.scoreText.setText(`Score: ${this.score}`);
    }

    updateLife(life: number) {
        this.playerLife = Phaser.Math.Clamp(life, 0, this.playerLifeMax);
        this.updateLifeBar();
    }

    updateLifeBar() {
        this.lifeBarForeground.clear();

        const lifePercent = this.playerLife / this.playerLifeMax;
        const lifeBarWidth = this.lifeBarRectangle.width * lifePercent;

        const color = Phaser.Display.Color.Interpolate.ColorWithColor(
            new Phaser.Display.Color(255, 0, 0),  // Red
            new Phaser.Display.Color(0, 255, 0),  // Green
            100,
            lifePercent * 100
        );

        const lifeBarColor = Phaser.Display.Color.GetColor(color.r, color.g, color.b);

        this.lifeBarForeground.fillStyle(lifeBarColor);
        this.lifeBarForeground.fillRect(
            this.lifeBarRectangle.left,
            this.lifeBarRectangle.top,
            lifeBarWidth,
            this.lifeBarRectangle.height
        );
    }
}
