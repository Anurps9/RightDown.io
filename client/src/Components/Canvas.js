import paper from "paper";
import { useContext, useEffect, useRef, useState } from "react";
import { SocketContext } from "../Context/SocketContext";
import {socketInit} from '../Service/socket.js'

export default function Canvas(){
    const [tool, selectTool] = useState('pencil')
    const [color, selectColor] = useState('black')
    const canvasRef = useRef(null)
    var ctx;
    var path = null, topLeftRectangle = null, rect = null, oppositeDiaCircle = null, circle = null;
    var downPoint = null;
    const socket = useContext(SocketContext)
    
    useEffect(() => {
        paper.setup(canvasRef.current)
        socketInit(socket, path, topLeftRectangle, rect, oppositeDiaCircle, circle, downPoint)
        canvasRef.current.onwheel = (event) => {
            event.preventDefault()
            var newZoom = paper.view.zoom; 
            var oldZoom = paper.view.zoom;
            
            if (event.deltaY > 0) {			
                newZoom = paper.view.zoom * 1.05;
            } else {
                newZoom = paper.view.zoom * 0.95;
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

    useEffect(() => {
        paper.view.onMouseDown = (e) => {
            socket.emit('mouse-down', tool, e.point)
            downPoint = e.point;
            if(tool === 'pencil'){
                path = new paper.Path()
                path.strokeWidth = 1
                path.strokeColor = color
            }else if(tool === 'eraser'){
                path = new paper.Path()
                path.strokeWidth = 100;
                path.strokeColor = 'white'
            }else if(tool === 'rectangle'){
                topLeftRectangle = new paper.Point(e.point.x, e.point.y)
            }else if(tool === 'circle'){
                oppositeDiaCircle = new paper.Point(e.point.x, e.point.y)
            }else if(tool === 'pan'){

            }
        }
        paper.view.onMouseDrag = (e) => {
            socket.emit('mouse-drag', tool, e.point)
            if(tool === 'pencil'){
                path.add(e.point)
            }else if(tool === 'eraser'){
                path.add(e.point)
            }else if(tool === 'rectangle'){
                if(rect){
                    rect.remove()
                }
                rect = new paper.Path.Rectangle(topLeftRectangle, new paper.Point(e.point.x, e.point.y))
                rect.strokeColor = color
            }else if(tool === 'circle'){
                if(circle){
                    circle.remove()
                }
                const x1 = e.point.x, x2 = oppositeDiaCircle.x, y1 = e.point.y, y2 = oppositeDiaCircle.y;
                let radius = (x1-x2)*(x1-x2) + (y1-y2)*(y1-y2)
                radius = Math.sqrt(radius) / 2
                const center = {
                    x : (x1+x2)/2, 
                    y : (y1+y2)/2
                }
                circle = new paper.Path.Circle(new path.Point(center.x, center.y), radius)
                circle.strokeColor = color
            }else if(tool === 'pan'){
                var pan_offset = e.point.subtract(downPoint)
                paper.view.center = paper.view.center.subtract(pan_offset);
            }
        }
        paper.view.onMouseUp = (e) => {
            socket.emit('mouse-up', tool, e.point)
            if(tool === 'pencil'){
                path.simplify()
                path = null;
            }else if(tool === 'eraser'){
                path = null;
            }else if(tool === 'rectangle'){
                rect = null;
            }else if(tool === 'circle'){
                circle = null;
            }else if(tool === 'pan'){

            }
            downPoint = null;
        }

    }, [tool, color])

    

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
            <canvas ref={canvasRef} id="paper-canvas" resize="true">
            </canvas>
        </div>
    )
}