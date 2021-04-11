class Scene1 extends Phaser.Scene {
    
    constructor(){
        super("scene1");
    }
    
    init(data){
        this.changeScene = this.scene.get('changeScene');

        this.maxSpeed = data.maxSpeed;
        this.playerSpeed = this.maxSpeed;

        this.x = this.changeScene.positionScene(data.playerX, data.playerY)[0];
        this.y = this.changeScene.positionScene(data.playerX, data.playerY)[1];
        
    }

    preload(){
        this.load.image('sky', "assets/sky_ph.png");
        this.load.image('item', "assets/item_ph.png");
        this.load.image('coin', "assets/coin_ph.png");
        this.load.image('player', 'assets/player_ph.png');
        this.load.image('ennemi', 'assets/ennemi_ph.png');

        this.load.image('terrain_sheet', 'assets/terrain_sprite.png');
        this.load.tilemapTiledJSON('map', 'testmap.json');
    }

    create(){
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        //Création des input du joueur, false par defaut
        this.inputP = [false, false, false, false]; //Right, Left, Down, Up
        
        this.add.image(960, 540, 'sky');
        this.add.image(960, 540, 'item');

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('terrain', 'terrain_sheet');

        this.bot = this.map.createStaticLayer('bot', this.tileset, 0, 0);
        this.top = this.map.createStaticLayer('top', this.tileset, 0, 0);

        this.ennemis = this.add.group();
        this.ennemi1 = new Ennemi(this, 400, 700);
        this.ennemi2 = new Ennemi(this, 1400, 900);
        this.ennemi3 = new Ennemi(this, 2500, 1400);

        this.coins = this.physics.add.group();


        this.player = this.physics.add.image(this.x, this.y, 'player');
        this.player.setCollideWorldBounds(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.inputText = this.add.text(16, 144, 'Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3], { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: color }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.ennemis, this.killEnnemi, null, this);
        this.physics.add.collider(this.ennemis, this.platforms);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);

        this.physics.add.collider(this.player, this.top);

        this.top.setCollisionByProperty({collides:true});
        //this.top.setCollision([385, 306]);
        //this.top.setCollisionByExclusion(-1, true);


        this.camera = this.cameras.main.setSize(1920,1080);
        this.camera.startFollow(this.player, true, 0.08, 0.08);
        this.camera.setBounds(0, 0, 3200, 2400);

        var test = this;
        var i = 0

        this.ennemis.children.iterate(function (child) {
            test.tweens.add({
                targets: child,
                x: child.x-300,
                ease: 'Linear',
                duration: 2000,
                yoyo: true,
                repeat: -1,
            });

            i++;

            if (i == test.ennemis.length)
            {
                i = 0;
            }

        })
    }

    update(){
        /*Si le joueur est en haut
        if (this.player.y < 25){
            actualScene = 2;
            this.control.resetControl(this.cursors);
            this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})
        }
        //Si le joueur est a droite
        if (this.player.x > 3200-25){
            actualScene = 2;
            this.control.resetControl(this.cursors);
            this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})
        }
        */

        //Player's movement
        this.player.setVelocity(
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, this.inputP), this.player,this.playerSpeed, this.maxSpeed)[1]);//Y

        
        this.sceneText.setText('Scene '+ actualScene + ': ' + playerCoin);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + this.inputP[0] + ' Left: ' + this.inputP[1] + ' Down: ' + this.inputP[2] + ' Up: ' + this.inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    killEnnemi(player, ennemis){
        let randomx = Math.floor(Math.random() * 300)-150;
        let randomy = Math.floor(Math.random() * 300)-150;
        this.coins.create(ennemis.x+randomx, ennemis.y+randomy, 'coin');
        ennemis.destroy();
    }

    collectCoin(player, coins){
        playerCoin+= 10
        coins.destroy();
    }
    

    /* X/Y to angle
    deltaX = x2 - x1; ()
    deltaY = y2 - y1;
    deg = Math.atan2(deltaY, deltaX)*180.0/Math.PI;
    */

    /* Angle to X/Y
    x += cos(257*pi/180)*17;
    y += sin(257*pi/180)*17;
    */
}