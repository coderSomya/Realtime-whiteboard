import Pencil from "./Pencil";
import Rectangle from "./Rectangle";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./utils/constants";

export interface Pos {
  x: number;
  y: number;
}


export enum Tool {
  "PENCIL",
  "RECTANGLE",
  "TEXT",
}

class Whiteboard extends EventTarget {
  activeTool: Tool = Tool.PENCIL;
  mousePos: Pos = { x: 0, y: 0 };
  pencil = new Pencil();
  rectangle = new Rectangle();

  constructor(canvas: HTMLCanvasElement) {
    super();
    let mousedown: boolean = false;

    canvas.onmousedown = (e) => {
      this.mousePos = { x: e.clientX, y: e.clientY };
      this.pencil.paths.push([]);
      this.rectangle.currentRect = {
        pos: this.mousePos,
        width: 0,
        height: 0,
      };
      mousedown = true;

      setInterval(() => {
        this.dispatchEvent(new Event("state_change"));
      }, 100);
    };
    canvas.onmouseup = () => {
      mousedown = false;
     
      if(this.activeTool===Tool.RECTANGLE) {
      this.rectangle.rects.push(this.rectangle.currentRect!);
      this.rectangle.currentRect = undefined;
      }
    };
    canvas.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const x = e.clientX;
        const y = e.clientY;
        this.mousePos = { x, y };

        this.pencil.updateMousePos(this.mousePos);
        this.rectangle.updateMousePos(this.mousePos);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.pencil.draw(ctx);
    this.rectangle.draw(ctx);
  }
  update() {
    if (this.activeTool === Tool.PENCIL) {
      this.pencil.update();
    }
    if (this.activeTool === Tool.RECTANGLE) {
      this.rectangle.update();
    }
  }

  updateState(state: any) {
    console.log("here inside update state", state);

    this.pencil.paths = state.pencil;
    this.rectangle.rects = state.rectangle;
  }

  changeFontSize() {
    const fontSize = document.getElementById("FontSize") as HTMLInputElement;
    this.pencil.overallFontSize = Number(fontSize.value);
  }


}

export default Whiteboard;
