class Menu extends Phaser.Scene{

    constructor(){
        super("menu");
    }

    create(){
        this.scene.start('scene1', {playerX: 960, playerY: 540, maxSpeed: 300})
    }
}