import { useContext, useEffect } from "react"
import { SocketContext } from "../Context/SocketContext"
import paper from 'paper'

var path = null, circle = null, downPoint = null, rectangle = null;

export const useSocket = ()=>{
    const socket = useContext(SocketContext)
    useEffect(() => {
        socket.on('mouse-down', ([point, tool, color]) => {
            point = new paper.Point(point[1], point[2])
            downPoint = point
            switch(tool){
                case 'pencil':{
                    path = new paper.Path()
                    path.strokeColor = color
                    path.strokeWidth = 3
                    path.add(point)
                    break;
                }
                case 'eraser':{
                    path = new paper.Path()
                    path.strokeColor = 'white'
                    path.strokeWidth = 100
                    path.add(point)
                    break;
                }
                case 'circle':{
                    break;
                }
                case 'rectangle':{
                    break;
                }
                default:{

                }
            }
        })
        socket.on('mouse-drag', ([point, tool, color]) => {
            point = new paper.Point(point[1], point[2])
            switch (tool){
                case 'pencil':{
                    path.add(point)
                    break;
                }
                case 'eraser': {
                    path.add(point)
                    break;
                }
                case 'circle': {
                    if(circle){
                        circle.remove()
                    }
                    var center = downPoint.add(point)
                    center = center.divide(2);
                    var radius = downPoint.subtract(point).length/2
                    circle = new paper.Path.Circle(center, radius)
                    circle.strokeColor = color
                    break;
                }
                case 'rectangle':{
                    if(rectangle){
                        rectangle.remove()
                    }
                    rectangle = new paper.Path.Rectangle(downPoint, point)
                    rectangle.strokeColor = color
                    break;
                } 
                default:{

                }
            }
        })
        socket.on('mouse-up', ([point, tool, color]) => {
            point = new paper.Point(point[1], point[2])
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
                default: {

                }
            }
            downPoint = null;
        })
    }, [])
}