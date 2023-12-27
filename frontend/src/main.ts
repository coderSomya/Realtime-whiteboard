import { CANVAS_HEIGHT, CANVAS_WIDTH } from "./utils/constants";
import Whiteboard, { Tool } from "./whiteboard";
import { captureScreenshot } from "./utils/save";
import Socket from 'socket.io-client'



const pencil= document.getElementById('pencil');
const rectangle= document.getElementById('rectangle');
const saveBtn = document.getElementById('saveBtn');
const undoBtn = document.getElementById('undoBtn');
;
saveBtn!.addEventListener("click",()=>{
  captureScreenshot({ rootElementId:'canvas' })
});

const color = document.getElementById('color') as HTMLInputElement;

const canvas= document.createElement('canvas');

canvas.id = 'canvas';
const io = Socket('http://localhost:3000')
const room_id = location.search.split('=')[1];
io.emit('join_room', room_id);

document.body.append(canvas);

canvas.width = CANVAS_WIDTH;
canvas.height= CANVAS_HEIGHT;

window.addEventListener('resize', ()=>{
  canvas.width = window.innerWidth;
  canvas.height= window.innerHeight;
})

const ctx= canvas.getContext("2d");


const whiteboard = new Whiteboard(canvas);



io.on('state_change', (state)=>{  
  whiteboard.updateState(state);
})
 

whiteboard.addEventListener("state_change",(e)=>{

  const state = {
    pencil: whiteboard.pencil.paths,
    rects: whiteboard.rectangle.rects
  }
  
  io.emit('state_change',{
    state,
    room_id: room_id
  });
})





pencil?.addEventListener("click", ()=>{
  whiteboard.activeTool = Tool.PENCIL;
})

color?.addEventListener("change", ()=>{
  whiteboard.pencil.color = color.value;
})

rectangle?.addEventListener("click", ()=>{
  whiteboard.activeTool = Tool.RECTANGLE;
})

undoBtn?.addEventListener("click", ()=>{
  console.log("clicked undo button");
  
   whiteboard.pencil.undo();
})











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
