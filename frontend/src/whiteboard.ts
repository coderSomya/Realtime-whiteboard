class Whiteboard{
   
    
   path: number[][];
   
   constructor(){
       this.
       path = [];

       let mousedown: boolean = false;

       document.onmousedown = ()=>{  
        mousedown = true;
       }
       document.onmouseup = ()=>{   
        mousedown = false;
       }   
       document.addEventListener('mousemove', (e)=>{      
        if(mousedown){
            this.path.push([e.clientX, e.clientY])
        }
       })
   }

   draw(ctx: CanvasRenderingContext2D){
    if(this.path.length > 0){    
        ctx.beginPath();
        ctx.moveTo(this.path[0][0], this.path[0][1]);
        for(let i= 1; i<this.path.length; i++){
        ctx.lineTo(this.path[i][0], this.path[i][1]);
        }
        ctx.stroke();
        ctx.closePath();
    }
   }

   update(){

   }
}

export default Whiteboard