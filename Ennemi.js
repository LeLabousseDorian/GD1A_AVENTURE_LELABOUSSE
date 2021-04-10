class Ennemi extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y){
        super(scene, x, y, 'ennemi');
        scene.add.existing(this);
        scene.physics.world.enableBody(this);
        scene.ennemis.add(this)
    }
}