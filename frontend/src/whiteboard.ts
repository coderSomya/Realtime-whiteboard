import Pencil from "./Pencil";

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
   activeTool: Tool = Tool.PENCIL;
  mousePos: Pos = { x: 0, y: 0 };
  pencil = new Pencil()
  

  constructor() {
    let mousedown: boolean = false;

    document.onmousedown = () => {
      this.pencil.paths.push([]);
      mousedown = true;
    };
    document.onmouseup = () => {
      mousedown = false;

    };
    document.addEventListener("mousemove", (e) => {
      if (mousedown) {
        const x = e.clientX;
        const y = e.clientY;
        this.mousePos = {x, y};
        this.pencil.updateMousePos(this.mousePos)
      }
    });
  }

  draw(ctx: CanvasRenderingContext2D) {

   
  
    if(this.activeTool === Tool.PENCIL){
        this.pencil.draw(ctx);
    }
  }
  update() {
    if (this.activeTool === Tool.PENCIL) {
      this.pencil.update(); 
    }
  }

  changeFontSize() {
    const fontSize = document.getElementById("FontSize") as HTMLInputElement;
    this.pencil.overallFontSize = Number(fontSize.value);
  }
}

export default Whiteboard;
