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
        this.scene2 = this.scene.get('scene2');
        this.inputP = [false, false, false, false]; //Right, Left, Down, Up
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
        this.inputText = this.add.text(16, 144, 'Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3], { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        this.physics.add.collider(this.player, this.platforms);
        this.camera = this.cameras.main.setSize(1920,1080);
    }
    
    update(){
        
        this.player.setVelocity(
            this.scene2.movementJ(this.scene2.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[0],
            this.scene2.movementJ(this.scene2.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[1]);

        if (this.player.x >1890 && this.player.y > 1000){
            actualScene = 2;
            this.player.x -= 500;
            this.inputP = [0, 0, 0, 0];
            this.camera.fadeOut(100);
            this.scene.transition({
                target: 'scene2',
                sleep: true,
                duration: 100,
                data: {camera: this.camera, sceneText: this.sceneText, playerSpeed: this.playerSpeed}
            });
        }

        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

}