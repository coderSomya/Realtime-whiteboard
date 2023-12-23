import { Pos } from "./whiteboard";

interface RectProps{
    pos: Pos;
    width: number;
    height: number;
}

class Rectangle{
    
    rects:RectProps[] = [];
    mousePos: Pos = {x:0, y:0};
    isMouseDown: boolean = false;
    isDrawing : boolean = false;
    currentRect?: RectProps;

    constructor(){

    }

    updateMousePos(pos: Pos){
        this.mousePos = pos;
    }

    draw(ctx: CanvasRenderingContext2D){
        //draw previous rectangles
        ctx.beginPath();
        if(this.rects && this.rects.length > 0){
            console.log(this.rects);
            for(let i= 0; i < this.rects.length; i++){
                const rect = this.rects[i];
                console.log(rect);
                
                ctx.rect(rect.pos.x, rect.pos.y, rect.width, rect.height);
            }
        }
        //draw current rectangle
        if(this.currentRect){
            ctx.rect(
                this.currentRect.pos.x, 
                this.currentRect.pos.y,
                this.currentRect.width,
                this.currentRect.height
            );

        }
        ctx.stroke();
        ctx.closePath();
    }

    update(){
        if(this.currentRect){
            this.currentRect.width = this.mousePos.x - this.currentRect.pos.x;
            this.currentRect.height = this.mousePos.y - this.currentRect.pos.y;
        }
    }


}

export default Rectangle