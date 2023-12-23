import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

const createBtn = document.getElementById('create_btn');
const roomNameElement = document.getElementById('name');

let room_name = '';
roomNameElement?.addEventListener("change", (e)=>{
    //@ts-ignore
    const value = e.target.value;
    room_name = value;
})

createBtn?.addEventListener("click", (e)=>{
  if(room_name){
    socket.emit("create room", room_name)
  }
})

