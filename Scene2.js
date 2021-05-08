class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        //this.changeScene = this.scene.get('changeScene');
        
        this.maxSpeed = data.maxSpeed;
        this.playerSpeed = this.maxSpeed;

        //this.x = this.changeScene.positionScene(data.playerX, data.playerY)[0];
        //this.y = this.changeScene.positionScene(data.playerX, data.playerY)[1];

        this.x = data.x;
        this.y = data.y;

    }

    create(){

        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        this.waiting = 120;

        this.map = this.make.tilemap({ key: 'dungeon' });
        this.tileset = this.map.addTilesetImage('TilesetDungeon', 'tileset');

        this.bot = this.map.createStaticLayer('bot', this.tileset, 0, 0);
        this.top = this.map.createDynamicLayer('collision', this.tileset, 0, 0);

        this.coins = this.physics.add.group();

        this.hitbox = this.physics.add.image(0, 0, 'hitbox').setOrigin(0, 0.5).setSize(64, 25);


        this.ennemis = this.physics.add.group();
        new Ennemi(this, 1810, 224, 'ennemi');
        new Ennemi(this, 1940, 450, 'ennemi');
        new Ennemi(this, 1780, 300, 'ennemi');

        this.player = this.physics.add.sprite(this.x, this.y, 'player').setSize(28, 15).setOffset(1, 40);
        this.player.setCollideWorldBounds(true);

        this.player.on('animationcomplete', function(){ //  Autorise le personnage à bouger uniquement quand l'animation d'attaque se fini
            attack = false;
        });

        this.visual = this.map.createDynamicLayer('visual', this.tileset, 0, 0);

        this.cursors = this.input.keyboard.addKeys({ 'up': Phaser.Input.Keyboard.KeyCodes.UP,
            'down': Phaser.Input.Keyboard.KeyCodes.DOWN, 
            'left': Phaser.Input.Keyboard.KeyCodes.LEFT,
            'right': Phaser.Input.Keyboard.KeyCodes.RIGHT,
            'space' : Phaser.Input.Keyboard.KeyCodes.SPACE
        });
        
        //Test Text
        this.sceneText = this.add.text(16, 16, 'Scene '+ playerCoin, { fontSize: '32px', fill: '#ddd' }).setScrollFactor(0);
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' }).setScrollFactor(0);
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' }).setScrollFactor(0);
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' }).setScrollFactor(0);
        
        //Player
        this.physics.add.overlap(this.player, this.ennemis, this.hitPlayer, null, this);
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.top);
        this.physics.add.overlap(this.hitbox, this.ennemis, this.killEnnemi, null, this);

        //Ennemis
        this.physics.add.collider(this.ennemis, this.top);

        //Coin
        this.physics.add.collider(this.coins, this.top)

        this.top.setCollisionByProperty({collides:true});

        this.camera = this.cameras.main.setSize(1280,720);
        this.camera.startFollow(this.player, true, 0.08, 0.08);
        this.camera.setBounds(0, 0, 2400, 1600);


        this.top.setTileLocationCallback(61, 11, 1, 1, ()=>{
            if (key){
                this.scene.start('scene2', {x: this.player.x , y: this.player.y, maxSpeed: this.maxSpeed})}
        })
    }
    
    update(){

        let pad = Phaser.Input.Gamepad.Gamepad;
    
    
        if(this.input.gamepad.total){   //Si une manette est connecté
            pad = this.input.gamepad.getPad(0);  //pad récupère les inputs du joueur
            xAxis = pad ? pad.axes[0].getValue() : 0;   //Si le stick est utilisé xAxys récupère la valeur sur l'axe X, sinon il est égale a 0
            yAxis = pad ? pad.axes[1].getValue() : 0;   //Pareil pour l'axe Y
        }

        if(this.waiting > 0){
            this.waiting--;
        }

        for(var i = 0; i < this.coins.getChildren().length; i++){
            var coin = this.coins.getChildren()[i];

            if (coin._moving){
                coin.update();
            }
        }

        if(this.waiting <= 0){
            for(var i = 0; i < this.ennemis.getChildren().length; i++){
                var ennemi = this.ennemis.getChildren()[i];
                ennemi.movement(this.player);
                this.sceneText.setText('X: ' + this.player.x + ' Y: ' + ennemi.movement(this.player));
            }
        }
                

        //Player's movement
        this.player.setVelocity(
            //X
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, xAxis, yAxis), this.player,this.playerSpeed, this.maxSpeed)[0],
            //Y
            this.control.movementJ(this.control.inputJoueur(this.cursors, inputP, pad, xAxis, yAxis), this.player,this.playerSpeed, this.maxSpeed)[1]);
        
        if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0 || attack){
            this.player.anims.play(this.control.animation(this.player), true);
        }

        if(attack){
            if(direction =='left'){
                this.hitbox.setSize(64, 25)
                this.hitbox.x = this.player.x-32;
                this.hitbox.y = this.player.y+5;
            }

            if(direction =='right'){
                this.hitbox.setSize(64, 25)
                this.hitbox.x = this.player.x+32;
                this.hitbox.y = this.player.y+5;
            }

            if(direction =='up'){
                this.hitbox.setSize(25, 64)
                this.hitbox.x = this.player.x+5;
                this.hitbox.y = this.player.y-34;
            }

            if(direction =='down'){
                this.hitbox.setSize(25, 64)
                this.hitbox.x = this.player.x-5;
                this.hitbox.y = this.player.y+34;
            }
        }

        this.sceneText.setText('Scene '+ playerCoin);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    hitPlayer(player, ennemi){
        if(!invulnerable)   // Si le joueur n'est pas invulnerable
        {
            playerHp --;                    // Le joueur perd un pv
            invulnerable = true;            // Il deviens invulnerable
            
            if (playerHp > 0){  // Si le joueur est encore en vie après s'être pris le coup
                this.time.addEvent({ delay: 200, repeat: 9, callback: function(){player.visible = !player.visible;}, callbackScope: this}); // Le joueur passe de visible a non visible toutes les 200ms 9 fois de suite
            }
    
            this.time.addEvent({ delay: 2000, callback: function(){invulnerable = false;}, callbackScope: this});  // Le joueur n'est plus invulnerable après 2000ms
        }
    }

    killEnnemi(player, ennemis){
        if(attack){
            let randomCoin = (Math.floor(Math.random() * 3))+2;

            for (let i = 0; i < randomCoin; i++){
                let randomx = (Math.floor(Math.random() * 20)-10)*50;
                let randomy = (Math.floor(Math.random() * 20)-10)*50;
                this.coin = new Coin(this, 50, ennemis.x, ennemis.y, randomx, randomy);
                this.coin.body.setSize(26, 36)
                this.coin.body.setOffset(3, 1)
                this.coin.anims.play('coin_spin', true)
            }

            ennemis.destroy();
        }
    }

    collectCoin(player, coins){
        if (coins._moving == false){
            playerCoin += coins.getValue();
            coins.destroy();
        }
    }

}