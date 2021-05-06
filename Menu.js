class Menu extends Phaser.Scene{

    constructor(){
        super("menu");
    }

    create(){
        this.scene.start('scene1', {playerX: 352, playerY: 288, maxSpeed: 250})
    }
}