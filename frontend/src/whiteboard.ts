interface Pos{
    x: number,
    y: number,
}


class Whiteboard{ 
   paths: Pos[][] = [];
   overallFontSize: number = 1;

 
   
   constructor(){

       let mousedown: boolean = false;
    

       document.onmousedown = ()=>{  
        mousedown = true;
        this.paths.push([])
       }
       document.onmouseup = ()=>{   
        mousedown = false;
       }   
       document.addEventListener('mousemove', (e)=>{ 
     
        if(mousedown){
            let x = e.clientX;
            let y= e.clientY;
            this.paths[this.paths.length-1].push({x: x,y: y});
            
        }
       })
   }

   draw(ctx: CanvasRenderingContext2D){
   
    ctx.beginPath();
    if(this.paths.length>0){
    for(const path of this.paths){

    if(path.length > 0){   
     
         
      //i want to draw all the paths;
      //path = [(x1,y1), (x2,y2)...]
      ctx.lineWidth = this.overallFontSize
      ctx.moveTo(path[0].x, path[0].y);
         for(let i=1; i<path.length; i++){
              ctx.lineTo(path[i].x, path[i].y);
              ctx.stroke();
     }
    }
 
   }}
   }
   update(){

   }

   changeFontSize(){
    
    const fontSize = document.getElementById("FontSize") as HTMLInputElement
   this.overallFontSize = Number(fontSize.value);
   }
}

export default Whiteboard