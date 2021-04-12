class Coin extends Phaser.GameObjects.Sprite{

    constructor(scene, valueR, randomX, randomY){
        super(scene, randomX, randomY, 'coin');
        this._value = valueR;
        this._positionX = randomX;
        this._positionY = randomY;
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.coins.add(this);
    }

    getValue(){
        return this._value
    }

}