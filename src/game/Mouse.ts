export class Mouse {
    x = 0;
    y = 0;
    clicked = false;

    constructor(canvas: HTMLCanvasElement) {
        canvas.addEventListener("mousemove", e => {
            const rect = canvas.getBoundingClientRect();
            this.x = e.clientX - rect.left;
            this.y = e.clientY - rect.top;
        });

        canvas.addEventListener("mousedown", () => {
            this.clicked = true;
        });
    }

    consumeClick(): boolean {
        if (this.clicked) {
            this.clicked = false;
            return true;
        }
        return false;
    }
}
