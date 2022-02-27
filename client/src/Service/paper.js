import paper from 'paper'
import { useContext, useEffect } from 'react'
import { SocketContext } from '../Context/SocketContext';

var path = null, circle = null, downPoint = null, rectangle = null;

export const usePaper = (tool, color) => {
    var socket = useContext(SocketContext)
    useEffect(() => {
        paper.view.onMouseDown = (e) => {
            socket.emit('mouse-down', [e.point, tool, color])
            downPoint = e.point
            switch(tool){
                case 'pencil':{
                    path = new paper.Path()
                    path.strokeColor = color
                    path.strokeWidth = 3
                    path.add(e.point)
                    break;
                }
                case 'eraser':{
                    path = new paper.Path()
                    path.strokeColor = 'white'
                    path.strokeWidth = 100
                    path.add(e.point)
                    break;
                }
                case 'circle':{
                    break;
                }
                case 'rectangle':{
                    break;
                }
                case 'pan': {
                    break;
                }
            }
        }
        paper.view.onMouseDrag = (e) => {
            socket.emit('mouse-drag', [e.point, tool, color])
            switch (tool){
                case 'pencil':{
                    path.add(e.point)
                    break;
                }
                case 'eraser': {
                    path.add(e.point)
                    break;
                }
                case 'circle': {
                    if(circle){
                        circle.remove()
                    }
                    var center = downPoint.add(e.point)
                    center = center.divide(2);
                    var radius = downPoint.subtract(e.point).length/2
                    circle = new paper.Path.Circle(center, radius)
                    circle.strokeColor = color
                    break;
                }
                case 'rectangle':{
                    if(rectangle){
                        rectangle.remove()
                    }
                    rectangle = new paper.Path.Rectangle(downPoint, e.point)
                    rectangle.strokeColor = color
                    break;
                }
                case 'pan': {
                    var pan_offset = e.point.subtract(downPoint);
                    paper.view.center = paper.view.center.subtract(pan_offset)
                    break;
                }
            }
        }
        paper.view.onMouseUp = (e) => {
            socket.emit('mouse-up', [e.point, tool, color])
            // console.log(socket.room);
            switch (tool){
                case 'pencil':{
                    path.simplify();
                    path = null;
                    break;
                }
                case 'eraser':{
                    path = null;
                    break;
                }
                case 'circle':{
                    circle = null;
                    break;
                }
                case 'rectangle': {
                    rectangle = null;
                    break;
                }
                case 'pan': {
                    break;
                }
            }
            downPoint = null;
        }
    }, [tool, color])
}