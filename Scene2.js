class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        this.changeScene = this.scene.get('changeScene');
        
        this.maxSpeed = data.maxSpeed;
        this.playerSpeed = this.maxSpeed;

        //this.x = this.changeScene.positionScene(data.playerX, data.playerY)[0];
        //this.y = this.changeScene.positionScene(data.playerX, data.playerY)[1];

        this.x = 500;
        this.y = 500;

        widthScreen = 1920;
        heightScreen = 1080;
    }

    create(){
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');


        this.add.image(960, 540, 'sky');
        this.add.image(400,300, 'item');

        this.player = this.physics.add.image(this.x, this.y, 'player');
        this.player.setCollideWorldBounds(true);


        //Input
        this.cursors = this.input.keyboard.createCursorKeys();
        
        //Test Text
        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: '#ddd' });
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' });
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        
        //Collider
        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main.setSize(widthScreen, heightScreen);
    }
    
    update(){
        //Si le joueur est en bas
        if (this.player.y > heightScreen-this.player.height/2){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y, maxSpeed: this.maxSpeed});
        }
        //Si le joueur est a gauche
        if (this.player.x < this.player.width){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y, maxSpeed: this.maxSpeed});
        }

        //Player's movement
        this.player.setVelocity(
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP), this.player, this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP), this.player, this.playerSpeed, this.maxSpeed)[1]);//Y


        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

}