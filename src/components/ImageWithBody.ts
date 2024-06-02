import Phaser from "phaser";

export class ImageWithBody extends Phaser.GameObjects.Image {
    private myBody: Phaser.Geom.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number, frame: string | number) {
        super(scene, x, y, 'fishPack', frame);
        this.updateInsideBodySize();
    }

    get insideBody(): Phaser.Geom.Rectangle {
        return this.myBody;
    }

    updateInsideBodySize(): void {
        const bounds = this.getBounds();
        this.myBody = new Phaser.Geom.Rectangle(
            bounds.left + bounds.width / 4,
            bounds.top + bounds.height / 4,
            bounds.width / 2,
            bounds.height / 2
        );
    }
}