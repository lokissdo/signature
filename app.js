class Mouse{
    #left;
    #right;
    #preX=null;
    #preY=null;
    ctx;
    constructor(target) {
        console.dir(target.width)
        var rect=target.getBoundingClientRect()
        this.#left = rect.left;
        this.#right = rect.top;
        this.maxX=target.width;
        this.maxY=target.height;
        this.canvas=document.querySelector("#myCanvas")
        this.ctx=target.getContext("2d")
      }
    getMousePos(can,e){
        return {
            x:e.clientX-this.#left,
            y:e.clientY-this.#right
        }
    }
    isOut(x,y){
        console.log(this.maxX)
        return (x>=this.maxX|| y>=this.maxY || x<=0|| y<=0)
    }
    Out(){
        this.setPreXY(null,null)
        window.removeEventListener('mousemove',moveMouse);
    }
    setPreXY(x,y){
        this.#preX=x
        this.#preY=y
    }
    connectTwoPoint(x,y){
        if(this.#preX==null || this.#preY==null) this.setPreXY(x,y);
        this.ctx.moveTo(this.#preX, this.#preY);
        this.ctx.lineTo(x, y);
        this.ctx.stroke();
        this.setPreXY(x,y);
    }
}
var target=document.querySelector("#myCanvas")
var mouse=new Mouse(target)
target.onmousedown=(e)=>{
    console.log("Start")
    window.addEventListener('mousemove',moveMouse);
}
function moveMouse(e){
    var pos=mouse.getMousePos(target,e);
    mouse.connectTwoPoint(pos.x,pos.y)
    if(mouse.isOut(pos.x,pos.y)) mouse.Out()
}
target.onmouseup=()=>{
    console.log("Hủy");
    mouse.Out();
}
