import { Bar } from "./Bar";

export class StaticGapBar extends Bar {
    gapX = Math.random() * 300 + 50;
    gapWidth = 150;

    update(speed: number) {
        this.y += speed;
    }

    color: string = "#ffb347"; // 補色オレンジ系（固定）
    
    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(0, this.y, this.gapX, 30);
        ctx.fillRect(this.gapX + this.gapWidth, this.y, 600, 30);

        // 枠線
        ctx.strokeStyle = "#ff8c00";
        ctx.lineWidth = 2;
        ctx.strokeRect(0, this.y, this.gapX, 30);
        ctx.strokeRect(this.gapX + this.gapWidth, this.y, 600, 30);
    }

    isHit(x: number, y: number): boolean {
        if (y < this.y || y > this.y + 30) return false;
        return x < this.gapX || x > this.gapX + this.gapWidth;
    }
}
