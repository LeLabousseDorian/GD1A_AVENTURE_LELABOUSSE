class Scene1 extends Phaser.Scene {
    
    constructor(){
        super("scene1");
    }
    
    init(data){
        
        this.x = 1920*(1-data.playerX/1920);
        this.y = 1080*(1-data.playerY/1080);

        if (data.playerX == null){
            this.x = 300;
            this.y = 1006;
        }
        //FIX Get rid of the if pls
        if (this.x < 74){
            this.x = 74
        }

        if (this.x > 1846){
            this.x = 1846
        }
    }

    preload(){
        this.load.image('sky', "assets/sky_ph.png");
        this.load.image('item', "assets/item_ph.png");
        this.load.image('coin', "assets/coin_ph.png");
        this.load.image('platform', 'assets/sol_ph.png');
        this.load.image('player', 'assets/player_ph.png');
        this.load.image('ennemi', 'assets/ennemi_ph.png');
    }

    create(){
        this.control = this.scene.get('control');
        this.inputP = [false, false, false, false]; //Right, Left, Down, Up
        
        this.maxSpeed = 1000;
        this.playerSpeed = this.maxSpeed;
        
        this.add.image(960, 540, 'sky');
        this.add.image(960, 540, 'item');
        
        this.platforms = this.physics.add.staticGroup();
        
        this.platforms.create(960, 1055, 'platform');
        
        this.ennemis = this.add.group();
        this.ennemi1 = this.ennemis.create(new Ennemi(this, 400, 1006));
        this.ennemi2 = this.ennemis.create(new Ennemi(this, 800, 1006));
        
        this.coins = this.physics.add.group();

        this.player = this.physics.add.image(this.x, this.y, 'player');
        this.player.setCollideWorldBounds(true);
        


        this.cursors = this.input.keyboard.createCursorKeys();

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: '#ddd' });
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' });
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' });
        this.cameraText = this.add.text(16, 112, 'Camera: '+ this.camera, { fontSize: '32px', fill: '#ddd' });
        this.inputText = this.add.text(16, 144, 'Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3], { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.ennemis, this.jump, null, this);
        this.physics.add.collider(this.ennemis, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.camera = this.cameras.main.setSize(1920,1080);
    }
    
    update(){
        if (this.player.x >1895){
            actualScene = 2;
            this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y})
        }

        //Player's movement
        this.player.setVelocity(
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[1]);//Y

        

        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    jump(player, ennemis){
        this.coins.create(ennemis.x+50, ennemis.y+15, 'coin');
        ennemis.destroy();
    }

    collectCoin(player, coins){
        coins.destroy();
    }


}