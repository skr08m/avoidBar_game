import { Bar } from "./Bar";

export class MovingGapBar extends Bar {
    gapX = Math.random() * 260 + 70;
    gapWidth = 120;
    dir = Math.random() < 0.5 ? -1 : 1;

    update(speed: number) {
        this.y += speed;
        this.gapX += this.dir * 2;

        if (this.gapX <= 50) {
            this.gapX = 50;
            this.dir = 1;
        } else if (this.gapX >= 350) {
            this.gapX = 350;
            this.dir = -1;
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, this.y, this.gapX, 30);
        ctx.fillRect(this.gapX + this.gapWidth, this.y, 600, 30);
    }

    isHit(x: number, y: number): boolean {
        if (y < this.y || y > this.y + 30) return false;
        return x < this.gapX || x > this.gapX + this.gapWidth;
    }
}
