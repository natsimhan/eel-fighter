import {Scene} from 'phaser';
import {Enemy} from "../components/Enemy.ts";
import {Player} from "../components/Player.ts";
import {Bullet} from "../components/Bullet.ts";
import {Hud} from "./Hud.ts";

export class Game extends Scene {
    camera: Phaser.Cameras.Scene2D.Camera;
    background: Phaser.GameObjects.Image;
    player: Player;
    enemyTextures: string[];
    spawnInterval: number;
    timeSinceLastSpawn: number;
    bullets: Phaser.GameObjects.Group;
    enemies: Phaser.GameObjects.Group;

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
        this.bullets = this.add.group({classType: Bullet, runChildUpdate: true});
        this.enemies = this.add.group({classType: Enemy, runChildUpdate: true});

        // Démarrer la scène HUD
        this.scene.launch('Hud', {
            playerLife: this.player.health
        });
    }

    update(time: number, delta: number) {
        this.checkCollisions();
        this.spawnEnemies(time, delta);
        this.player.update(time, delta);
    }

    playerShoot(bullet: Bullet): void {
        this.bullets.add(bullet);
    }

    cameraShake(intensityX: number, intensityY: number, duration: number): void {
        this.cameras.main.shake(
            duration,
            new Phaser.Math.Vector2(intensityX, intensityY),
            true,
        );
    }

    private spawnEnemies(time: number, delta: number): void {
        this.timeSinceLastSpawn += delta;
        if (this.timeSinceLastSpawn >= this.spawnInterval) {
            this.spawnEnemy();
            this.timeSinceLastSpawn = 0;
        }
    }

    private spawnEnemy(): void {
        // Positionner l'ennemi en dehors de l'écran à droite
        const x = this.scale.width + 1;
        // Positionner l'ennemi de façon aléatoire en Y
        const y = Phaser.Math.Between(50, this.scale.height - 50);
        const texture = this.enemyTextures[Phaser.Math.Between(0, this.enemyTextures.length - 1)];
        const enemy = new Enemy(this, x, y, texture);
        this.enemies.add(enemy);
    }

    private checkCollisions(): void {
        for (const enemy of this.enemies.children.entries) {
            if (enemy instanceof Enemy && !enemy.isDead) {
                for (const bullet of this.bullets.children.entries) {
                    if (bullet instanceof Bullet
                        && Phaser.Geom.Intersects.RectangleToRectangle(bullet.insideBody, enemy.insideBody)
                    ) {
                        if (enemy.takeDamage(2)) {
                            const hudScene = this.scene.get('Hud') as Hud;
                            hudScene.updateScore(enemy.healthMax);
                        }
                        bullet.destroy();
                    }
                }
                if (
                    Phaser.Geom.Intersects.RectangleToRectangle(this.player.getBounds(), enemy.insideBody)
                    && !enemy.isDamagedPlayer
                ) {
                    enemy.isDamagedPlayer = true;
                    if (this.player.takeDamage(enemy.healthMax)) {
                        const hudScene = this.scene.get('Hud') as Hud;
                        this.scene.start('GameOver', {
                            score: hudScene.score
                        });
                    }
                    const hudScene = this.scene.get('Hud') as Hud;
                    hudScene.updateLife(this.player.health);
                    this.cameraShake(0.02, 0.02, 200);
                }
            }
        }
    }
}
