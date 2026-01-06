export class Bar {
    y: number = -50;
    canvasWidth: number;
    color: string = "black"; // 追加: デフォルト色

    constructor(canvasWidth: number) {
        this.canvasWidth = canvasWidth;
    }

    // 色を変更するメソッド
    setColor(color: string) {
        this.color = color;
    }

    update(speed: number): void {
        throw new Error("update() must be implemented");
    }

    draw(ctx: CanvasRenderingContext2D): void {
        throw new Error("draw() must be implemented");
    }

    isHit(x: number, y: number): boolean {
        throw new Error("isHit() must be implemented");
    }
}
