class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        if (data.playerX/1920 < data.playerY/1080 && data.playerX/1920 < 1-data.playerY/1080){
            this.x = 1920*(1-data.playerX/1920);
            this.y = data.playerY;
        }

        else if (1-data.playerX/1920 < data.playerY/1080 && 1-data.playerX/1920 < 1-data.playerY/1080){
            this.x = 1920*(1-data.playerX/1920);
            this.y = data.playerY;
        }

        else{
            this.y = 1080*(1-data.playerY/1080);
            this.x = data.playerX;
        }

        //FIX Get rid of the if pls
        if (this.x < 74){
            this.x = 74;
        }

        if (this.x > 1846){
            this.x = 1846;
        }

        if (this.y < 74){
            this.y = 74;
        }

        if (this.y > 1006){
            this.y = 1006;
        }
    }

    create(){
        this.control = this.scene.get('control');
        this.inputP = [false, false, false, false]; //Right, Left, Down, Up

        this.add.image(960, 540, 'sky');
        this.add.image(400,300, 'item');

        this.player = this.physics.add.image(this.x, this.y, 'player');
        this.player.setCollideWorldBounds(true);

        this.maxSpeed = 600;
        this.playerSpeed = this.maxSpeed;

        //Input
        this.cursors = this.input.keyboard.createCursorKeys();
        
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

        this.player.setVelocity(
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player, this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player, this.playerSpeed, this.maxSpeed)[1]);//Y

        if (this.player.y > 1055){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y});
        }

        if (this.player.x < 25){
            actualScene = 1;
            this.control.resetControl(this.cursors);
            this.scene.start('scene1', {playerX: this.player.x, playerY: this.player.y});
        }

        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

}