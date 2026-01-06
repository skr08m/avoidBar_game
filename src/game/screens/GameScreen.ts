import type { Screen } from "../Screen";
import { GameManager } from "../GameManager";
import { Bar } from "../bars/Bar";
import { StaticGapBar } from "../bars/StaticGapBar";
import { MovingGapBar } from "../bars/MovingGapBar";

export class GameScreen implements Screen {
    manager: GameManager;
    bars: Bar[] = [];
    finished: boolean = false;

    constructor(manager: GameManager) {
        this.manager = manager;

        const width = this.manager.canvas.width;

        for (let i = 0; i < 10; i++) {
            const bar =
                i % 2 === 0
                    ? new StaticGapBar(width)
                    : new MovingGapBar(width);
            bar.y = -i * 150;
            this.bars.push(bar);
        }
    }

    update() {
        if (this.finished) {
            if (this.manager.mouse.consumeClick()) {
                this.manager.changeToStart();
            }
            return;
        }

        const mouse = this.manager.mouse;

        for (const bar of this.bars) {
            bar.update();

            if (bar.isHit(mouse.x, mouse.y)) {
                this.finished = true;
                return;
            }
        }

        // 一番下のバーだけを見る
        const lastBar = this.bars[this.bars.length - 1];
        if (lastBar.y > this.manager.canvas.height) {
            this.finished = true;
        }
    }


    draw() {
        const ctx = this.manager.ctx;

        // 背景
        ctx.fillStyle = "#ccc";
        ctx.fillRect(
            0,
            0,
            this.manager.canvas.width,
            this.manager.canvas.height
        );

        for (const bar of this.bars) {
            bar.draw(ctx);
        }

        // マウス表示
        ctx.fillStyle = "blue";
        ctx.beginPath();
        ctx.arc(this.manager.mouse.x, this.manager.mouse.y, 5, 0, Math.PI * 2);
        ctx.fill();

        if (this.finished) {
            ctx.fillStyle = "black";
            ctx.font = "24px sans-serif";
            ctx.fillText("FINISH - CLICK TO RESTART", 120, 400);
        }
    }

}
