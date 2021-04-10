class Menu extends Phaser.Scene{

    constructor(){
        super("menu");
    }

    create(){
        this.scene.start('scene1', {maxSpeed: 1000})
    }
}