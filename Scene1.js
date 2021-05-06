class Scene1 extends Phaser.Scene {
    
    constructor(){
        super("scene1");
    }
    
    init(data){
        this.changeScene = this.scene.get('changeScene');

        this.maxSpeed = data.maxSpeed;
        this.playerSpeed = this.maxSpeed;

        this.x = data.playerX;
        this.y = data.playerY;

        widthScreen = 3200;
        heightScreen = 2400;
        
    }

    preload(){
        this.load.image('sky', "assets/sky_ph.png");
        this.load.image('boot', "assets/boot.png");
        this.load.spritesheet('coin', "assets/coinsheet.png", { frameWidth: 32, frameHeight: 26 });
        this.load.spritesheet('player', 'assets/player.png', {frameWidth: 32, frameHeight: 64});
        this.load.image('ennemi', 'assets/ennemi_ph.png');
        this.load.image('merchant', 'assets/merchant_ph.png');


        //Tiled
        this.load.image('tileset', 'assets/TilesetVillage.png');
        this.load.tilemapTiledJSON('map', 'village.json');
        this.load.tilemapTiledJSON('dungeon', 'dungeon.json');

    }

    create(){
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('TilesetVillage', 'tileset');

        this.bot = this.map.createStaticLayer('bot', this.tileset, 0, 0);
        this.top = this.map.createDynamicLayer('top', this.tileset, 0, 0);

        this.merchant = this.add.image(2125, 300, 'merchant');
        this.boot = this.physics.add.image(2125, 400, 'item');
        this.priceBoot = this.add.text(this.boot.x-30, this.boot.y+50, '150', { fontSize: '32px', fill: '#000' });

        this.key = this.physics.add.image(1000, 800, 'item');

        this.ennemis = this.physics.add.group();
        new Ennemi(this, 400, 700, 'ennemi');
        new Ennemi(this, 1400, 900, 'ennemi');
        new Ennemi(this, 1000, 800, 'player');

        this.coins = this.physics.add.group();

        this.player = this.physics.add.sprite(this.x, this.y, 'player').setSize(28, 15).setOffset(1, 40).setDepth(10);
        this.player.setCollideWorldBounds(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();
        this.control.resetControl(this.cursors);

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.inputText = this.add.text(16, 144, 'Right: ' + inputP[0] + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3], { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        
        //Collider
        //Player
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.ennemis, this.killEnnemi, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.top);
        this.physics.add.overlap(this.player, this.boot, this.getBoot, null, this);
        this.physics.add.overlap(this.player, this.key, this.getKey, null, this);

        //Ennemis
        this.physics.add.collider(this.ennemis, this.top);

        //Coin
        this.physics.add.collider(this.coins, this.top)


        this.top.setCollisionByProperty({collides:true});
        //this.top.setCollision([385, 306]);
        //this.top.setCollisionByExclusion(-1, true);

        this.top.setTileLocationCallback(60, 23, 1, 1, ()=>{
            if (key){
                this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})}
        })
        

        this.camera = this.cameras.main.setSize(1920,1080);
        this.camera.startFollow(this.player, true, 0.08, 0.08);
        this.camera.setBounds(0, 0, 3200, 2400);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player', { start: 9, end: 11 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'coin_spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
    
        /*this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });*/

        /*var test = this;
        var i = 0

        this.ennemis.children.iterate(function (child) {
            test.tweens.add({
                targets: child,
                x: child.x-300,
                ease: 'Linear',
                duration: 1000,
                yoyo: true,
                repeat: -1,
            });

            i++;

            if (i == test.ennemis.length)
            {
                i = 0;
            }

        })*/

    }

    update(){
        let pad = Phaser.Input.Gamepad.Gamepad;
    
        if(this.input.gamepad.total){   //Si une manette est connecté
            pad = this.input.gamepad.getPad(0);  //pad récupère les inputs du joueur
            xAxis = pad ? pad.axes[0].getValue() : 0;   //Si le stick est utilisé xAxys récupère la valeur sur l'axe X, sinon il est égale a 0
            yAxis = pad ? pad.axes[1].getValue() : 0;   //Pareil pour l'axe Y
    }

        if (this.ennemis.getLength() == 0){
            
        }

        for(var i = 0; i < this.coins.getChildren().length; i++){
            var coin = this.coins.getChildren()[i];

            if (coin._moving){
                coin.update();
            }
        }

        for(var i = 0; i < this.ennemis.getChildren().length; i++){
            var ennemi = this.ennemis.getChildren()[i];
            ennemi.movement(this.player);
            this.sceneText.setText('X: ' + this.player.x + ' Y: ' + ennemi.movement(this.player));
        }

        /*
        //Si le joueur est en haut
        if (this.player.y < this.player.height){
            actualScene = 2;
            this.control.resetControl(this.cursors);
            this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})
        }
        //Si le joueur est a droite
        if (this.player.x > widthScreen-this.player.width){
            actualScene = 2;
            this.control.resetControl(this.cursors);
            this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})
        }*/
        

        //Player's movement
        this.player.setVelocity(
            //X
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, xAxis, yAxis), this.player,this.playerSpeed, this.maxSpeed)[0],
            //Y
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, xAxis, yAxis), this.player,this.playerSpeed, this.maxSpeed)[1]);
        
        if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0){
            this.player.anims.play(this.control.animation(this.player), true);
        }
        
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + playerHp + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    killEnnemi(player, ennemis){
        if(!invulnerable)   // Si le joueur n'est pas invulnerable
        {
            playerHp --;                    // Le joueur perd un pv
            invulnerable = true;            // Il deviens invulnerable
            
            if (playerHp > 0){  // Si le joueur est encore en vie après s'être pris le coup
                this.time.addEvent({ delay: 200, repeat: 9, callback: function(){player.visible = !player.visible;}, callbackScope: this}); // Le joueur passe de visible a non visible toutes les 200ms 9 fois de suite
            }
    
            this.time.addEvent({ delay: 2000, callback: function(){invulnerable = false;}, callbackScope: this});  // Le joueur n'est plus invulnerable après 2000ms
        }
            
        let randomCoin = (Math.floor(Math.random() * 3))+2;

        for (let i = 0; i < randomCoin; i++){
            let randomx = (Math.floor(Math.random() * 20)-10)*60;
            let randomy = (Math.floor(Math.random() * 20)-10)*60;
            this.coin = new Coin(this, 50, ennemis.x, ennemis.y, randomx, randomy);
            this.coin.body.setSize(26, 36)
            this.coin.body.setOffset(3, 1)
            this.coin.anims.play('coin_spin', true)
        }

        ennemis.destroy();
    }

    collectCoin(player, coins){
        playerCoin += coins.getValue()
        coins.destroy();
    }

    getBoot(player, boots){

        if (playerCoin >= 150){ 
            this.maxSpeed += 250;
            playerCoin -= 150;
            boots.destroy();
            this.priceBoot.destroy();
            boot = true;
        }
    }

    getKey(player, keyy){
        this.map.replaceByIndex(385, 297, 60, 23, 1, 1, 1);
        key = true; 
        keyy.destroy();
    }
    
}


//P 960, 540
//E 400, 700