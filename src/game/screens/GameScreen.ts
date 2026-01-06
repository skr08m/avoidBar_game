import type { Screen } from "../Screen";
import { GameManager } from "../GameManager";
import { Bar } from "../bars/Bar";
import { StaticGapBar } from "../bars/StaticGapBar";
import { MovingGapBar } from "../bars/MovingGapBar";

export class GameScreen implements Screen {
    manager: GameManager;
    bars: Bar[] = [];
    barSpeed = 4;          // 全バー共通
    speedUp = 0.1;         // 加速量
    finished: boolean = false;
    barNumber: number = 30;

    constructor(manager: GameManager) {
        this.manager = manager;

        const width = this.manager.canvas.width;

        for (let i = 0; i < this.barNumber; i++) {
            const progress = i / (this.barNumber - 1); // 0.0 ～ 1.0
            const movingRate = 0.2 + 0.6 * progress; // 20% → 80%

            const bar =
                Math.random() < movingRate
                    ? new MovingGapBar(width)
                    : new StaticGapBar(width);
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
            bar.update(this.barSpeed);

            if (bar.isHit(mouse.x, mouse.y)) {
                this.finished = true;
                this.manager.mouse.consumeClick();
                return;
            }
        }

        if (this.bars.length > 0) {
            const firstBar = this.bars[0];

            if (firstBar.y > this.manager.canvas.height + 30) {
                this.bars.shift();
                this.barSpeed += this.speedUp;
            }
        }

        if (this.bars.length === 0) {
            this.finished = true;
            this.manager.mouse.consumeClick();
        }
    }

    draw() {
        const ctx = this.manager.ctx;
        const canvas = this.manager.canvas;

        // 背景グラデーション（青→紫）
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, "#4a90e2"); // 明るい青
        bgGradient.addColorStop(1, "#9013fe"); // 紫
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // バー描画（補色オレンジ系）
        for (const bar of this.bars) {
            // バー色を背景補色のオレンジ系で統一
            bar.setColor("#ffa500");
            bar.draw(ctx);
        }

        // マウス表示（補色系明るめ）
        ctx.fillStyle = "#ffb347";
        ctx.beginPath();
        ctx.arc(this.manager.mouse.x, this.manager.mouse.y, 6, 0, Math.PI * 2);
        ctx.fill();

        if (this.finished) {
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (this.iscleared()) {
                ctx.fillStyle = "#fff176"; // 明るい黄色
                ctx.font = "bold 36px sans-serif";
                ctx.fillText(
                    "CLEARED! - CLICK TO RESTART",
                    canvas.width / 2,
                    canvas.height / 2
                );
            } else {
                ctx.fillStyle = "#ff6f61"; // ピンクオレンジ系
                ctx.font = "bold 36px sans-serif";
                ctx.fillText(
                    "GAME OVER! - CLICK TO RESTART",
                    canvas.width / 2,
                    canvas.height / 2
                );
            }

            // サブテキスト（白で統一）
            ctx.fillStyle = "#ffffff";
            ctx.font = "18px sans-serif";
            ctx.fillText(
                "Click anywhere to restart",
                canvas.width / 2,
                canvas.height / 2 + 50
            );

            // 文字に薄い影をつける
            ctx.shadowColor = "rgba(0,0,0,0.4)";
            ctx.shadowOffsetX = 2;
            ctx.shadowOffsetY = 2;
            ctx.shadowBlur = 4;

            // 描画後に影をリセット
            ctx.shadowColor = "transparent";
        }
    }

    iscleared = (): boolean => {
        return this.bars.length === 0;
    };
}
