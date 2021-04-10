class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        this.changeScene = this.scene.get('changeScene');
        
        this.maxSpeed = data.maxSpeed;
        this.playerSpeed = this.maxSpeed;

        this.x = this.changeScene.positionScene(data.playerX, data.playerY)[0];
        this.y = this.changeScene.positionScene(data.playerX, data.playerY)[1];
        
    }

    create(){
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        //Création des input du joueur, false par defaut
        this.inputP = [false, false, false, false]; //Right, Left, Down, Up


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
        this.cameraText = this.add.text(16, 112, 'Camera: '+ this.camera, { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        
        //Collider
        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main.setSize(1920,1080);
    }
    
    update(){
        //Si le joueur est en bas
        if (this.player.y > 1055){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y, maxSpeed: this.maxSpeed});
        }
        //Si le joueur est a gauche
        if (this.player.x < 25){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y, maxSpeed: this.maxSpeed});
        }

        //Player's movement
        this.player.setVelocity(
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player, this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player, this.playerSpeed, this.maxSpeed)[1]);//Y


        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

}