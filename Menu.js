class Menu extends Phaser.Scene{

    constructor(){
        super("menu");
    }

    create(){
        this.scene.start('scene1', {playerX: 300, playerY: 1006})
    }
}