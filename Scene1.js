class Scene1 extends Phaser.Scene {
    
    constructor(){
        super("scene1");
    }
    
    preload(){
        this.load.image('sky', "assets/sky_ph.png");
        this.load.image('item', "assets/item_ph.png");
        this.load.image('coin', "assets/coin_ph.png");
        this.load.image('platform', 'assets/sol_ph.png');
        this.load.image('player', 'assets/player_ph.png');
    }

    create(){
        this.inputP = [0, 0, 0, 0]; //Right, Left, Down, Up
        this.playerSpeed = 500;
        this.maxSpeed = 500
        this.add.image(960, 540, 'sky');
        this.add.image(960, 540, 'item');
        
        this.platforms = this.physics.add.staticGroup();
        
        this.platforms.create(960, 1055, 'platform');
        
        this.player = this.physics.add.image(x, y, 'player');
        this.player.setCollideWorldBounds(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: '#ddd' });
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' });
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' });
        this.cameraText = this.add.text(16, 112, 'Camera: '+ this.camera, { fontSize: '32px', fill: '#ddd' });
        this.inputText = this.add.text(16, 144, 'Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3],{ fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main.setSize(1920,1080);
    }
    
    update(){



        //Input
        if (this.cursors.right.isDown){
            this.inputP[0] = 1;
        }

        if (this.cursors.right.isUp){
            this.inputP[0] = 0;
        }

        if (this.cursors.left.isDown){
            this.inputP[1] = 1;
        }

        if (this.cursors.left.isUp){
            this.inputP[1] = 0;
        }

        if (this.cursors.down.isDown){
            this.inputP[2] = 1;
        }

        if (this.cursors.down.isUp){
            this.inputP[2] = 0;
        }

        if (this.cursors.up.isDown){
            this.inputP[3] = 1;
        }

        if (this.cursors.up.isUp){
            this.inputP[3] = 0;
        }



        //Logic
        if (this.inputP[0] == 1){
            this.player.setVelocityX(this.playerSpeed);
        }
        
        if (this.inputP[1] == 1){
            this.player.setVelocityX(-this.playerSpeed);
        }

        if (this.inputP[0] == 0 && this.inputP[1] == 0){
            this.player.setVelocityX(0);
        }

        if (this.inputP[2] == 1){
            this.player.setVelocityY(this.playerSpeed);
        }

        if (this.inputP[3] == 1){
            this.player.setVelocityY(-this.playerSpeed);
        }
        
        if (this.inputP[2] == 0 && this.inputP[3] == 0){
            this.player.setVelocityY(0);
        }

        //Si le joueur se déplace en diagonale, sa vitesse est réduite
        if (this.player.body.velocity.x != 0 && this.player.body.velocity.y != 0){
            this.playerSpeed = this.maxSpeed*0.66;
        }

        else{
            this.playerSpeed = this.maxSpeed;
        }

        
        if (this.player.x >1890 && this.player.y > 1000){
            actualScene = 2;
            this.player.x -= 500;
            this.inputP = [0, 0, 0, 0]
            this.camera.fadeOut(100)
            this.scene.transition({
                target: 'scene2',
                sleep: true,
                duration: 100,
                data: {player: this.player, camera: this.camera, sceneText: this.sceneText, playerSpeed: this.playerSpeed}
            })
        }

        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }
}