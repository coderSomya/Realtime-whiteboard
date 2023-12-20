import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./constants";
import Whiteboard from "./whiteboard";

const canvas= document.createElement('canvas');

document.body.append(canvas);

canvas.width = CANVAS_WIDTH;
canvas.height= CANVAS_HEIGHT;

const ctx= canvas.getContext("2d");


const whiteboard = new Whiteboard();

const animationLoop = ()=>{
  if(ctx){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    whiteboard.draw(ctx);
    whiteboard.update();
  } 

  requestAnimationFrame(animationLoop);
}

animationLoop();
