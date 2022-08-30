function Canvas2D(){
    this.cavas = document.getElementById('screen');
    this.cavasContext = this.cavas.getContext('2d');
}

Canvas2D.prototype.clear = function (){
    this.cavasContext.clearRect(0, 0, this.cavas.width, this.cavas.height);
}

Canvas2D.prototype.drawImage = function (image, position, origin, rotation = 0){
    if(!position){
        position = new Vector2();
    }

    if (!origin) {
        origin = new Vector2();
    }
    this.cavasContext.save();
    this.cavasContext.translate(position.x, position.y);
    this.cavasContext.rotate(rotation);
    this.cavasContext.drawImage(image, -origin.x, -origin.y);
    this.cavasContext.restore();
}

let Canvas = new Canvas2D();

