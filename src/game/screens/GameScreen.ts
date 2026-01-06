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
    barNumber: number = 3;

    //バー生成
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

        // 全部消えたらクリア
        if (this.bars.length === 0) {
            this.finished = true;
            this.manager.mouse.consumeClick();
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
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";

            if (this.iscleared()) {
                // ===== CLEARED =====
                ctx.fillStyle = "#2ecc71"; // 明るいグリーン
                ctx.font = "bold 32px sans-serif";
                ctx.fillText(
                    "CLEARED! - CLICK TO RESTART",
                    this.manager.canvas.width / 2,
                    this.manager.canvas.height / 2
                );
            } else {
                // ===== GAME OVER =====
                ctx.fillStyle = "#e74c3c"; // 赤
                ctx.font = "bold 28px sans-serif";
                ctx.fillText(
                    "GAME OVER! - CLICK TO RESTART",
                    this.manager.canvas.width / 2,
                    this.manager.canvas.height / 2
                );
            }

            // 共通サブテキスト（任意）
            ctx.fillStyle = "#333";
            ctx.font = "16px sans-serif";
            ctx.fillText(
                "Click anywhere to restart",
                this.manager.canvas.width / 2,
                this.manager.canvas.height / 2 + 40
            );
        }

    }

    iscleared = (): boolean => {
        return this.bars.length === 0;
    };
}
