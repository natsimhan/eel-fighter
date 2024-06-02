import {Scene} from 'phaser';
import {Enemy} from "../components/Enemy.ts";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Phaser.GameObjects.Image;
    cursors: Phaser.Types.Input.Keyboard.CursorKeys;
    playerLimit: Phaser.Geom.Rectangle;
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

        this.createPlayer();
        if (this.input.keyboard) {
            this.cursors = this.input.keyboard.createCursorKeys();
        }
    }

    update(time: number, delta: number) {
        this.updatePlayer();
        this.updateEnemies(delta);
    }

    private createPlayer() {
        this.player = this.add.image(
            this.scale.width / 6,
            this.scale.height / 2,
            'fishPack',
            'fishTile_103'
        );

        const playerBounds = this.player.getBounds();
        this.playerLimit = new Phaser.Geom.Rectangle(
            playerBounds.width,
            playerBounds.height - playerBounds.height / 2,
            this.scale.width - 2 * playerBounds.width,
            this.scale.height - playerBounds.height,
        );
    }

    private updatePlayer() {
        const playerVelocity = 5;

        if (this.cursors.left.isDown) {
            this.player.setX(this.player.x - playerVelocity);
        } else if (this.cursors.right.isDown) {
            this.player.setX(this.player.x + playerVelocity);
        }

        if (this.cursors.up.isDown) {
            this.player.setY(this.player.y - playerVelocity);
        } else if (this.cursors.down.isDown) {
            this.player.setY(this.player.y + playerVelocity);
        }

        if (this.player.y < this.playerLimit.top) {
            this.player.y = this.playerLimit.top;
        } else if (this.player.y > this.playerLimit.bottom) {
            this.player.y = this.playerLimit.bottom;
        }

        if (this.player.x < this.playerLimit.left) {
            this.player.x = this.playerLimit.left;
        } else if (this.player.x > this.playerLimit.right) {
            this.player.x = this.playerLimit.right;
        }
    }

    private updateEnemies(delta: number) {
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
