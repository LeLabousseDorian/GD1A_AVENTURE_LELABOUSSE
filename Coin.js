class Coin extends Phaser.GameObjects.Sprite{

    constructor(scene, valueR, positionX, positionY, vectorX, vectorY){
        super(scene, positionX, positionY, 'coin');
        this._value = valueR;
        this._positionX = positionX;
        this._positionY = positionY;
        this._newPositionX = vectorX;
        this._newPositionY = vectorY;
        this._tick = 1;
        this._moving = true;
        
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.coins.add(this);
    }

    update(){
        //this.x += this._newPositionX*this._tick;
        //this.y += this._newPositionY*this._tick;
        this.body.setVelocity(this._newPositionX*this._tick, this._newPositionY*this._tick);
        this._tick -= 0.05;

        if(this._tick <= 0){
            this.body.setVelocity(0,0);
            this._moving = false;
        }
    }

    getValue(){
        return this._value
    }

}