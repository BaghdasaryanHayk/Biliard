const DELTA = 1/177;

function GameWorld(){

    this.balls = [
        [new Vector2(1022, 413), Color.yellow],
        [new Vector2(1056, 393), Color.yellow],
        [new Vector2(1056, 433), Color.red],
        [new Vector2(1090, 374), Color.red],
        [new Vector2(1090, 413), Color.black],
        [new Vector2(1090, 452), Color.yellow],
        [new Vector2(1126, 354), Color.yellow],
        [new Vector2(1126, 393), Color.red],
        [new Vector2(1126, 433), Color.yellow],
        [new Vector2(1126, 472), Color.red],
        [new Vector2(1162, 335), Color.red],
        [new Vector2(1162, 374), Color.red],
        [new Vector2(1162, 413), Color.yellow],
        [new Vector2(1162, 452), Color.red],
        [new Vector2(1162, 491), Color.yellow],
        [new Vector2(413, 413), Color.white],
    ].map(params => new Ball(...params))

    this.whiteBall = this.balls.find(ball => ball.color === Color.white);
    this.stick = new Stick(
        new Vector2(413, 413),
        this.whiteBall.shoot.bind(this.whiteBall)
    );
this.table = {
    TopY: 57,
    RightX: 1443,
    BottomY: 768,
    LeftX: 57
}

}

GameWorld.prototype.handleCollisions = function (){
    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].handleBallInHole();
        this.balls[i].collideWhitTable(this.table);

        for(let j = i + 1; j < this.balls.length; j++){
            const firstBall = this.balls[i];
            const secondBall = this.balls[j];
            firstBall.collideWhitBall(secondBall);
        }
    }
}

GameWorld.prototype.update = function (){

    this.handleCollisions();

this.stick.update();
// this.whiteBall.update(DELTA);
for(let i = 0; i < this.balls.length; i++){
    this.balls[i].update(DELTA);
}

if(!this.ballsMoving() && this.stick.shot){
this.stick.reposition(this.whiteBall.position);
}
}

GameWorld.prototype.draw = function (){
    Canvas.drawImage(sprites.background, {x:0, y:0});

    for(let i = 0; i < this.balls.length; i++){
        this.balls[i].draw();
    }

    this.stick.draw();
    // this.whiteBall.draw();

}

GameWorld.prototype.ballsMoving = function (){
    // return this.whiteBall.moving;

    let ballsMoving = false;

    for(let i = 0; i < this.balls.length; i++){
        if(this.balls[i].moving){
            ballsMoving = true;
            break;
        }
    }

    return ballsMoving;
}