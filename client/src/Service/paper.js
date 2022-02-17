export function handleMouseDown(socket, downPoint, path, tool, topLeftRectangle, oppositeDiaCircle, rect, circle){
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

export function handleMouseDrag(){

}

export function handleMouseUp(){

}