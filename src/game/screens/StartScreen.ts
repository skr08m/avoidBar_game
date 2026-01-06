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
        const canvas = this.manager.canvas;

        // 背景グラデーション（青から紫系）
        const bgGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGradient.addColorStop(0, "#4a90e2"); // 明るい青
        bgGradient.addColorStop(1, "#9013fe"); // 紫
        ctx.fillStyle = bgGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // タイトル文字（補色オレンジ系）
        ctx.fillStyle = "#ffa500"; // 青の補色
        ctx.font = "48px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
            "avoid the bars",
            canvas.width / 2,
            canvas.height / 2 - 40
        );

        // ボタン背景（青系の補色でホバー変化）
        const mouse = this.manager.mouse;
        const isHover =
            mouse.x >= this.buttonX &&
            mouse.x <= this.buttonX + this.buttonWidth &&
            mouse.y >= this.buttonY &&
            mouse.y <= this.buttonY + this.buttonHeight;

        ctx.fillStyle = isHover ? "#ffb347" : "#ffeeaa"; // 補色オレンジ系
        ctx.strokeStyle = isHover ? "#ff8c00" : "black"; // 枠線も補色強調
        ctx.lineWidth = 3;
        ctx.fillRect(
            this.buttonX,
            this.buttonY,
            this.buttonWidth,
            this.buttonHeight
        );
        ctx.strokeRect(
            this.buttonX,
            this.buttonY,
            this.buttonWidth,
            this.buttonHeight
        );

        // ボタン文字
        ctx.fillStyle = "#333"; // ボタン文字は暗めで読みやすく
        ctx.font = "24px sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillText(
            "START",
            canvas.width / 2,
            this.buttonY + this.buttonHeight / 2
        );

        // 描画状態リセット
        ctx.textAlign = "start";
        ctx.textBaseline = "alphabetic";
        ctx.lineWidth = 1;
    }
}
