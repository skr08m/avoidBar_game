import { Bar } from "./Bar";

export class StaticGapBar extends Bar {
    gapX = Math.random() * 300 + 50;
    gapWidth = 150;

    update() {
        this.y += this.speed;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "black";
        ctx.fillRect(0, this.y, this.gapX, 30);
        ctx.fillRect(this.gapX + this.gapWidth, this.y, 600, 30);
    }

    isHit(x: number, y: number): boolean {
        if (y < this.y || y > this.y + 30) return false;
        return x < this.gapX || x > this.gapX + this.gapWidth;
    }
}
