import { Pos } from "./whiteboard";

class Pencil{
    mousePos?: Pos;
    paths: Pos[][]=[];
    pencilThickness = 2;
    overallFontSize: number = 1;
    color: string =  "black";
    
    constructor(){
      this.mousePos ={
        x:0, y:0
      };
    }

    updateMousePos(pos :Pos){
        this.mousePos = pos;
    }

    updateColor(color :string){
      this.color = color;
    }

    draw(ctx: CanvasRenderingContext2D){
      ctx.lineWidth = this.overallFontSize;
    //   ctx.lineWidth = this.pencilThickness;
      for(let i= 0; i<this.paths.length; i++){
        const path= this.paths[i];
        
    
        if(path.length>0){
            ctx.moveTo(path[0].x, path[0].y);
            for(let j=1; j<path.length; j++){
              ctx.strokeStyle=this.color;
                ctx.lineTo(path[j].x, path[j].y);
            }
        }
        ctx.stroke();
      }
    }

    undo(){
    if( this.paths?.length>0) {
       this.paths.pop();
       this.mousePos =undefined;
    }
    }


    update(){
        if(this.paths.length>0){
            if(this.paths.length>1){
                let prevpath= this.paths[this.paths.length-2];
                let curr = this.mousePos;
                let prev= prevpath[prevpath.length-1];
                if(curr === prev) return;
            }
            else{
                if(this.mousePos?.x==0 && this.mousePos?.y=== 0){
                    return;
                }
            }


            // jugaad way to fix path joining issue
            
            if(this.mousePos) this.paths[this.paths.length - 1].push(this.mousePos)
        }   
    }
} 

export default Pencil;
