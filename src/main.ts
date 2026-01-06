import { GameManager } from "./game/GameManager";

const canvas = document.getElementById("gameCanvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Canvas not supported");

new GameManager(canvas, ctx).start();