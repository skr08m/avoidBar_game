import { Mouse } from "./Mouse";
import type { Screen } from "./Screen";
import { StartScreen } from "./screens/StartScreen";
import { GameScreen } from "./screens/GameScreen";

export class GameManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    mouse: Mouse;
    currentScreen: Screen;

    constructor(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.mouse = new Mouse(canvas);
        this.currentScreen = new StartScreen(this);
    }

    start() {
        this.loop();
    }

    private loop = () => {
        // 背景
        this.ctx.fillStyle = "#cccccc";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.currentScreen.update();
        this.currentScreen.draw();

        requestAnimationFrame(this.loop);
    };

    changeToStart() {
        this.currentScreen = new StartScreen(this);
    }

    changeToGame() {
        this.currentScreen = new GameScreen(this);
    }
}
