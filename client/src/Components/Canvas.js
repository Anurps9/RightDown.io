import paper from "paper";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../Context/SocketContext.js";
import {usePaper} from '../Service/paper.js'
import { useSocket } from "../Service/socket.js";

export default function Canvas(){
    const [tool, selectTool] = useState('pencil')
    const [color, selectColor] = useState('black')
    const [inRoom, setInRoom] = useState(false)
    const [room, setRoom] = useState('')
    const canvasRef = useRef(null)
    const socket = useContext(SocketContext)
    
    useEffect(() => {
        paper.setup(canvasRef.current)
        canvasRef.current.onwheel = (event) => {
            event.preventDefault()
            var newZoom = paper.view.zoom; 
            var oldZoom = paper.view.zoom;
            
            if (event.deltaY > 0) {			
                newZoom = paper.view.zoom * 1.10;
            } else {
                newZoom = paper.view.zoom * 0.90;
            }
            
            var beta = oldZoom / newZoom;
            
            var mousePosition = new paper.Point(event.offsetX, event.offsetY);
            
            var viewPosition = paper.view.viewToProject(mousePosition);
            
            var mpos = viewPosition;
            var ctr = paper.view.center;
            
            var pc = mpos.subtract(ctr);
            var offset = mpos.subtract(pc.multiply(beta)).subtract(ctr);	
            
            paper.view.zoom = newZoom;
            paper.view.center = paper.view.center.add(offset);
            
            paper.view.draw();		
        }
    }, [])

    useSocket()
    usePaper(tool, color)

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }
    const handleRoomJoin = (e) => {
        if(room.length < 3){
            alert('Room ID must be 3 characters at least.')
            return;
        }
        setInRoom(true)
        socket.emit('join room', room)
        setRoom('')
    }
    const handleRoomLeave = (e) => {
        setInRoom(false)
        socket.emit('leave room')
    }

    const colors = ['red', 'green', 'black', 'white', 'yellow']
    const tools = ['pencil', 'rectangle', 'eraser', 'circle', 'pan']

    return (
        <div>
            <div>{tool}</div>
            {
                tools.map((tool) => (
                    <input key={tool} onClick={() => {selectTool(tool)}} value={tool.toUpperCase()} type="button"/>
                ))
            }
            {
                colors.map((color) => (
                    <input key={color} onClick={(e) => {selectColor(e.target.name)}} name={color} type="button" value={color.toUpperCase()}/>
                ))
            }
            {
                !inRoom ?
                <div>
                    <input type="text" placeholder="Enter room ID" value={room} onChange={handleRoomChange}/>
                    <input type="button" value="Join room" onClick={handleRoomJoin}/>
                </div>
                :
                <div>
                    <input type="button" value="Leave room" onClick={handleRoomLeave}/>
                </div>
            }
            <canvas ref={canvasRef} id="paper-canvas" resize="true">
            </canvas>
        </div>
    )
}