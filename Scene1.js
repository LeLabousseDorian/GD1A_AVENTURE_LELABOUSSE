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
        this.load.image('item', "assets/item_ph.png");
        this.load.image('coin', "assets/coin_ph.png");
        this.load.image('player', 'assets/player_ph.png');
        this.load.image('ennemi', 'assets/ennemi_ph.png');
        this.load.image('merchant', 'assets/merchant_ph.png');


        //Tiled
        this.load.image('terrain_sheet', 'assets/terrain_sprite.png');
        this.load.tilemapTiledJSON('map', 'testmap.json');
    }

    create(){
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        this.xAxis = 0;  //Stick xAxys
        this.yAxis = 0;  //Stick xAxys

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('terrain', 'terrain_sheet');

        this.bot = this.map.createStaticLayer('bot', this.tileset, 0, 0);
        this.top = this.map.createDynamicLayer('top', this.tileset, 0, 0);

        this.merchant = this.add.image(2125, 300, 'merchant');
        this.boot = this.physics.add.image(2125, 400, 'item');
        this.priceBoot = this.add.text(this.boot.x-30, this.boot.y+50, '150', { fontSize: '32px', fill: '#000' });

        this.key = this.physics.add.image(1000, 800, 'item');


        this.ennemis = this.add.group();
        this.ennemi1 = new Ennemi(this, 400, 700);
        this.ennemi2 = new Ennemi(this, 1400, 900);
        this.ennemi3 = new Ennemi(this, 1000, 800);

        this.coins = this.physics.add.group();

        this.player = this.physics.add.image(this.x, this.y, 'player');
        this.player.setCollideWorldBounds(true);
        
        this.cursors = this.input.keyboard.createCursorKeys();

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.inputText = this.add.text(16, 144, 'Right: ' + inputP[0] + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3], { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        
        //Collide
        //Player
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.overlap(this.player, this.ennemis, this.killEnnemi, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.top);
        this.physics.add.overlap(this.player, this.boot, this.getBoot, null, this);
        this.physics.add.overlap(this.player, this.key, this.getKey, null, this);


        //Ennemis
        this.physics.add.collider(this.ennemis, this.platforms);

        //Coin
        this.physics.add.collider(this.coins, this.top)


        this.top.setCollisionByProperty({collides:true});
        //this.top.setCollision([385, 306]);
        //this.top.setCollisionByExclusion(-1, true);

        this.top.setTileLocationCallback(59, 23, 1, 1, ()=>{
            if (key){
                actualScene = 2;
                this.control.resetControl(this.cursors);
                this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})}
        })
        

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

        let pad = Phaser.Input.Gamepad.Gamepad;
    
    
        if(this.input.gamepad.total){   //Si une manette est connecté
            pad = this.input.gamepad.getPad(0)  //pad récupère les inputs du joueur
            this.xAxis = pad ? pad.axes[0].getValue() : 0;   //Si le stick est utilisé xAxys récupère la valeur sur l'axe X, sinon il est égale a 0
            this.yAxis = pad ? pad.axes[1].getValue() : 0;   //Pareil pour l'axe Y
    }


        if (this.ennemis.getLength() == 0){
            this.map.removeTileAt(58, 22, {layer: this.top});
            this.map.removeTileAt(59, 22, {layer: this.top});
            this.map.removeTileAt(60, 22, {layer: this.top});
            this.map.removeTileAt(58, 23, {layer: this.top});
            this.map.removeTileAt(60, 23, {layer: this.top});
            this.map.removeTileAt(58, 24, {layer: this.top});
            this.map.removeTileAt(59, 24, {layer: this.top});
            this.map.removeTileAt(60, 24, {layer: this.top});
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
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, this.xAxis, this.yAxis), this.player,this.playerSpeed, this.maxSpeed)[0],//X
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, this.xAxis, this.yAxis), this.player,this.playerSpeed, this.maxSpeed)[1]);//Y

        
        this.sceneText.setText('Scene '+ actualScene + ': ' + this.xAxis);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + inputP[0] + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3]);
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    killEnnemi(player, ennemis){
        let randomx = ennemis.x + Math.floor(Math.random() * 300)-150;
        let randomy = ennemis.y + Math.floor(Math.random() * 300)-150;
        this.coin = new Coin(this, 20, randomx, randomy);
        ennemis.destroy();
    }

    collectCoin(player, coins){
        playerCoin += coins.getValue()
        coins.destroy();
    }

    getBoot(player, boots){

        if (playerCoin >= 150){ 
            playerCoin -= 150   
            boots.destroy();
            this.priceBoot.destroy();
            boot = true;
            this.maxSpeed += 250}
        
    }

    getKey(player, keyy){
        key = true; 
        keyy.destroy();
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