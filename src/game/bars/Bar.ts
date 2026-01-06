export class Bar {
    y: number = -50;
    canvasWidth: number;

    constructor(canvasWidth: number) {
        this.canvasWidth = canvasWidth;
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
