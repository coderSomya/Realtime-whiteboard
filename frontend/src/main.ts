import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./utils/constants";
import Whiteboard from "./whiteboard";
import { captureScreenshot } from "./utils/save"



const saveBtn = document.createElement('button');
saveBtn.innerText = "Save";
  saveBtn.addEventListener("click",()=>{
    captureScreenshot({ rootElementId:'canvas' })
  });


document.body.append(saveBtn);


const fontSize = document.createElement("input") as HTMLInputElement;
fontSize.id= "FontSize";
fontSize.type = "number";
fontSize.placeholder = "Font Size"
document.body.append(fontSize);


const canvas= document.createElement('canvas');
canvas.id = 'canvas';

document.body.append(canvas);

canvas.width = CANVAS_WIDTH;
canvas.height= 3*CANVAS_HEIGHT/4;

const ctx= canvas.getContext("2d");


const whiteboard = new Whiteboard();





const animationLoop = ()=>{
  if(ctx){
    ctx.clearRect(0,0,CANVAS_WIDTH, CANVAS_HEIGHT)
    whiteboard.changeFontSize();
    whiteboard.draw(ctx);
    whiteboard.update();
  } 

  requestAnimationFrame(animationLoop);
}

animationLoop();
