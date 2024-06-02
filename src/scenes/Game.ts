import {Scene} from 'phaser';
import {Enemy} from "../components/Enemy.ts";
import {Player} from "../components/Player.ts";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Image;
    enemyTextures: string[];
    spawnInterval: number;
    timeSinceLastSpawn: number;

    constructor() {
        super('Game');
        // Liste des textures des ennemis
        this.enemyTextures = [
            'fishTile_073',
            'fishTile_075',
            'fishTile_077',
            'fishTile_079',
            'fishTile_081',
            'fishTile_101',
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
        this.updatePlayer();
        this.updateEnemies(delta);
    }

    private updatePlayer() {
        this.player.update();
    }

    private updateEnemies(delta: number) {
        // Spawn des ennemies
        this.timeSinceLastSpawn += delta;
        if (this.timeSinceLastSpawn >= this.spawnInterval) {
            this.spawnEnemy();
            this.timeSinceLastSpawn = 0;
        }

        // Mettre à jour les ennemis existants
        for (const child of this.children.list) {
            if (child instanceof Enemy) {
                child.update(delta);
            }
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
