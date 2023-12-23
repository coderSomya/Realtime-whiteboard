import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const createBtn = document.getElementById('create_btn');
const roomNameElement = document.getElementById('name');
const room_list = document.getElementById('rooms');


let room_name = '';

socket.on('rooms', (rooms)=>{
  console.log(rooms);
})


roomNameElement?.addEventListener("change", (e)=>{
    //@ts-ignore
    const value = e.target.value;
    room_name = value;
})

createBtn?.addEventListener("click", ()=>{
  if(room_name){
    socket.emit("create room", room_name, (res: any) =>{
        console.log(res);
    })
  }
})

