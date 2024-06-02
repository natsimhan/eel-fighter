import {Scene} from 'phaser';
import {Enemy} from "../components/Enemy.ts";
import {Player} from "../components/Player.ts";
import {Bullet} from "../components/Bullet.ts";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Player;
    enemyTextures: string[];
    spawnInterval: number;
    timeSinceLastSpawn: number;

    constructor() {
        super('Game');
        // Liste des textures des ennemis
        this.enemyTextures = [
            'fishTile_fish_XS',
            'fishTile_fish_S',
            'fishTile_fish_M',
            'fishTile_fish_L',
            'fishTile_fish_XL',
            'fishTile_fish_XXL',
        ];
        // Intervalle initial de 2 secondes
        this.spawnInterval = 2 * 100;
        this.timeSinceLastSpawn = 0;
    }

    create() {
        this.camera = this.cameras.main;
        this.camera.setBackgroundColor('#00002a');

        this.background = this.add.image(this.scale.width / 2, this.scale.height / 2, 'background');
        this.background.setAlpha(0.2);

        this.player = new Player(this);
    }

    update(time: number, delta: number) {
        this.spawnEnemies(time, delta);

        for (const child of this.children.list) {
            if (child instanceof Player || child instanceof Enemy || child instanceof Bullet) {
                child.update(time, delta);
            }
        }
    }

    private spawnEnemies(time: number, delta: number) {
        this.timeSinceLastSpawn += delta;
        if (this.timeSinceLastSpawn >= this.spawnInterval) {
            this.spawnEnemy();
            this.timeSinceLastSpawn = 0;
        }
    }

    private spawnEnemy() {
        // Positionner l'ennemi en dehors de l'écran à droite
        const x = this.scale.width + 1;
        // Positionner l'ennemi de façon aléatoire en Y
        const y = Phaser.Math.Between(50, this.scale.height - 50);
        const texture = this.enemyTextures[Phaser.Math.Between(0, this.enemyTextures.length - 1)];
        new Enemy(this, x, y, texture);
    }
}
