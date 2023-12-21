import Pencil from "./Pencil";
import Rectangle from "./Rectangle";

export interface Pos {
  x: number;
  y: number;
}

enum Tool {
  "PENCIL",
  "RECTANGLE",
  "TEXT",
}

class Whiteboard {
   activeTool: Tool = Tool.RECTANGLE;
  mousePos: Pos = { x: 0, y: 0 };
  pencil = new Pencil();
  rectangle = new Rectangle();
  

  constructor() {
    let mousedown: boolean = false;

    document.onmousedown = (e) => {
        this.mousePos = {x: e.clientX, y: e.clientY};
      this.pencil.paths.push([]);
      this.rectangle.currentRect={
        pos :this.mousePos,
        width: 0,
        height: 0
      }
      mousedown = true;
    };
    document.onmouseup = () => {
      mousedown = false;
      if(this.rectangle.currentRect) this.rectangle.rects.push(this.rectangle.currentRect);
      this.rectangle.currentRect = undefined;

    };
    document.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const x = e.clientX;
        const y = e.clientY;
        this.mousePos = {x, y};

        this.pencil.updateMousePos(this.mousePos);
        this.rectangle.updateMousePos(this.mousePos);
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {

   
  
    if(this.activeTool === Tool.PENCIL){
        this.pencil.draw(ctx);
    }
    if(this.activeTool === Tool.RECTANGLE){
        this.rectangle.draw(ctx);
    }
  }
  update() {
    if (this.activeTool === Tool.PENCIL) {
      this.pencil.update(); 
    }
    if(this.activeTool === Tool.RECTANGLE){
        this.rectangle.update();
    }
  }

  changeFontSize() {
    const fontSize = document.getElementById("FontSize") as HTMLInputElement;
    this.pencil.overallFontSize = Number(fontSize.value);
  }
}

export default Whiteboard;
