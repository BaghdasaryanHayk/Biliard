const BALL_ORIGIN = new Vector2(25, 25);
const BALL_DIAMETER = 38;
const BALL_RADIUS = BALL_DIAMETER / 2;
const HOLE_RADIUS = 46;

function Ball(position, color){
    this.position = position;
    this.velocity = new Vector2();
    this.moving = false;
    this.sprite = getBallSpriteByColor(color);
    this.color = color;
    this.visible = true;
    this.holes = [
        new Vector2(750, 32),
        new Vector2(750, 794),
        new Vector2(62, 62),
        new Vector2(1435, 62),
        new Vector2(62, 762),
        new Vector2(1435, 762),
    ]

}

Ball.prototype.update = function (delta){
    if(!this.visible){
        return;
    }
this.position.addTo(this.velocity.mult(delta));
this.velocity = this.velocity.mult(0.984);

if(this.velocity.length() < 5){
    this.velocity = new Vector2();
    this.moving = false;
}
}

Ball.prototype.draw = function (){
    if(!this.visible){
        return;
    }
Canvas.drawImage(this.sprite, this.position, BALL_ORIGIN);
}

Ball.prototype.shoot = function (power, rotation){
    this.velocity = new Vector2(power * Math.cos(rotation), power * Math.sin(rotation));
    this.moving = true;
}

Ball.prototype.collideWhitBall = function (ball){

    if(!this.visible || !ball.visible){
        return;
    }

    // Find a normal vector
    const n = this.position.subtract(ball.position);

    // Find distance

    const dist = n.length();

    if(dist > BALL_DIAMETER){
        return;
    }

    // Find minimum translation distance

    const mtd = n.mult((BALL_DIAMETER - dist)/dist);

    // Push-pull balls apart

    this.position = this.position.add(mtd.mult(1/2));
    ball.position = ball.position.subtract(mtd.mult(1/2));


    // Find unit vector

    const un = n.mult(1/n.length());

    // Find unit tangent vector

    const ut = new Vector2(-un.y, un.x);

    // Project velocities onto the unit normal and unit tangent vectors

    const v1n = un.dot(this.velocity);
    const v1t = ut.dot(this.velocity);
    const v2n = un.dot(ball.velocity);
    const v2t = ut.dot(ball.velocity);

    // Find new normal velocities

    let v1nTag = v2n;
    let v2nTag = v1n;

    // Convert the scalar normal and tangential velocities into vectors

    v1nTag = un.mult(v1nTag);
    const v1tTag = ut.mult(v1t);
    v2nTag = un.mult(v2nTag);
    const v2tTag = ut.mult(v2t);

    // Update velocities

    this.velocity = v1nTag.add(v1tTag);
    ball.velocity = v2nTag.add(v2tTag);

    this.moving = true;
    ball.moving = true;
}

Ball.prototype.handleBallInHole = function (){

    if(!this.visible){
        return;
    }

    let inHole = this.holes.some(hole => {
       return this.position.distFrom(hole) < HOLE_RADIUS;
    });

    if(!inHole){
        return;
    }
    this.visible = false;
    this.moving = false;
}

Ball.prototype.collideWhitTable = function (table){

if(!this.moving || !this.visible){
    return;
}

let collided = false;

if(this.position.y <= table.TopY + BALL_RADIUS){
    this.position.y = table.TopY + BALL_RADIUS;
    this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
    collided = true;
}

    if(this.position.x >= table.RightX - BALL_RADIUS){
        this.position.x = table.RightX - BALL_RADIUS;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(this.position.y >= table.BottomY - BALL_RADIUS){
        this.position.y = table.BottomY - BALL_RADIUS;
        this.velocity = new Vector2(this.velocity.x, -this.velocity.y);
        collided = true;
    }

    if(this.position.x <= table.LeftX + BALL_RADIUS){
        this.position.x = table.LeftX + BALL_RADIUS;
        this.velocity = new Vector2(-this.velocity.x, this.velocity.y);
        collided = true;
    }

    if(collided){
        this.velocity = this.velocity.mult(0.98);
    }

}


















