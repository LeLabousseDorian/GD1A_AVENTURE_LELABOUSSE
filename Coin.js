class Coin extends Phaser.GameObjects.Sprite{

    constructor(scene, valueR){
        super(scene, ennemi.x, ennemi.y, 'coin');
        _value = valueR;
    }

    coinCollect(){
        playerCoin += value
    }
}