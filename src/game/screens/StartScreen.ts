import type { Screen } from "../Screen";
import { GameManager } from "../GameManager";

export class StartScreen implements Screen {
    manager: GameManager;

    // ボタン情報
    buttonX: number;
    buttonY: number;
    buttonWidth: number = 220;
    buttonHeight: number = 60;

    constructor(manager: GameManager) {
        this.manager = manager;

        this.buttonX =
            this.manager.canvas.width / 2 - this.buttonWidth / 2;
        this.buttonY =
            this.manager.canvas.height / 2 + 80;
    }

    update() {
        const mouse = this.manager.mouse;

        const isHover =
            mouse.x >= this.buttonX &&
            mouse.x <= this.buttonX + this.buttonWidth &&
            mouse.y >= this.buttonY &&
            mouse.y <= this.buttonY + this.buttonHeight;

        if (isHover && mouse.consumeClick()) {
            this.manager.changeToGame();
        }
    }

    draw() {
        const ctx = this.manager.ctx;

        // タイトル
        ctx.fillStyle = "blue";
        ctx.font = "36px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(
            "avoid the bars",
            this.manager.canvas.width / 2,
            this.manager.canvas.height / 2 - 40
        );

        // ボタン背景
        ctx.fillStyle = "#eeeeee";
        ctx.fillRect(
            this.buttonX,
            this.buttonY,
            this.buttonWidth,
            this.buttonHeight
        );

        // ボタン枠
        ctx.strokeStyle = "black";
        ctx.strokeRect(
            this.buttonX,
            this.buttonY,
            this.buttonWidth,
            this.buttonHeight
        );

        // ボタン文字
        ctx.fillStyle = "black";
        ctx.font = "24px sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(
            "START",
            this.manager.canvas.width / 2,
            this.buttonY + this.buttonHeight / 2
        );

        // 描画状態リセット（癖防止）
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
    }
}
