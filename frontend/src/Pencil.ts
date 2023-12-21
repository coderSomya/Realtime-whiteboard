import { Pos } from "./whiteboard";

class Pencil{
    mousePos: Pos;
    paths: Pos[][]=[];
    pencilThickness = 2;
    overallFontSize: number = 1;
    
    constructor(){
      this.mousePos ={
        x:0, y:0
      };
    }

    updateMousePos(pos :Pos){
        this.mousePos = pos;
    }

    draw(ctx: CanvasRenderingContext2D){
      ctx.lineWidth = this.overallFontSize;
    //   ctx.lineWidth = this.pencilThickness;
      for(let i= 0; i<this.paths.length; i++){
        const path= this.paths[i];
        if(path.length>0){
            ctx.moveTo(path[0].x, path[0].y);
            for(let j=1; j<path.length; j++){
                ctx.lineTo(path[j].x, path[j].y);
            }
        }
        ctx.stroke();
      }
    }


    update(){
        if(this.paths.length>0){
            this.paths[this.paths.length - 1].push(this.mousePos)
        }
    }
} 

export default Pencil;
