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

    create(){
        knife = true;
        //Import des functions de la scene 'control'
        this.control = this.scene.get('control');

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('TilesetVillage', 'tileset');
        this.hitbox = this.physics.add.image(0, 0, 'hitbox').setOrigin(0, 0.5).setSize(64, 25);

        this.bot = this.map.createStaticLayer('bot', this.tileset, 0, 0);
        this.top = this.map.createDynamicLayer('collision', this.tileset, 0, 0);

        this.merchant = this.add.image(1760, 800, 'merchant');

        if(!boot){
            this.boot = this.physics.add.image(this.merchant.x, this.merchant.y + 50, 'boot');
            this.priceBoot = this.add.text(this.boot.x-30, this.boot.y+25, '150', { fontSize: '32px', fill: '#000' });
        }

        this.coins = this.physics.add.group();
        
        this.sword = this.physics.add.image(850, 675, 'sword').setAngle(-135).setSize(32, 40);

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

        this.control.resetControl(this.cursors);

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.inputText = this.add.text(16, 144, 'Right: ' + inputP[0] + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3], { fontSize: '32px', fill: color }).setScrollFactor(0);
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: color }).setScrollFactor(0);
        
        //Collider
        //Player
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this);
        this.physics.add.collider(this.player, this.top);
        this.physics.add.overlap(this.player, this.boot, this.getBoot, null, this);
        this.physics.add.overlap(this.player, this.sword, this.getSword, null, this);


        //Coin
        this.physics.add.collider(this.coins, this.top)


        this.top.setCollisionByProperty({collides:true});
        //this.top.setCollision([385, 306]);
        //this.top.setCollisionByExclusion(-1, true);

        this.top.setTileLocationCallback(61, 12, 1, 1, ()=>{
            if (knife){
                knife = false;
                this.scene.start('scene2', {playerX: this.player.x , playerY: this.player.y, maxSpeed: this.maxSpeed})}
        })
        
        this.camera = this.cameras.main.setSize(1280,720);
        this.camera.startFollow(this.player, true, 0.08, 0.08);
        this.camera.setBounds(0, 0, 2400, 1600);

        this.inventory0 = this.add.image(1150, 50, 'blood').setScrollFactor(0);
        this.bloodText = this.add.text(this.inventory0.x + 25, this.inventory0.y - 16, bloodAmount, { fontSize: '38px', fill: '#fff' }).setScrollFactor(0);

        this.inventory1 = this.add.image(1150, 100, 'coin_inventory').setScrollFactor(0);
        this.coinText = this.add.text(this.inventory1.x + 25, this.inventory1.y - 16, playerCoin, { fontSize: '38px', fill: '#fff' }).setScrollFactor(0);
        
        if(!boot){
            this.inventory2 = this.add.image(1150, 150, 'boot_off').setScrollFactor(0);
        }
        else {
            this.inventory2 = this.add.image(1150, 150, 'boot_on').setScrollFactor(0);

        }

        if(!sword){
            this.inventory3 = this.add.image(1150, 200, 'sword_off').setScrollFactor(0);
        }
        else {
            this.inventory3 = this.add.image(1150, 200, 'sword_on').setScrollFactor(0);

        }

        /*var test = this;

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

        if(boot){
            this.inventory2.setTexture('boot_on')
        }

        if(sword){
            this.inventory3.setTexture('sword_on')
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
        
        if(this.player.body.velocity.x != 0 || this.player.body.velocity.y != 0 || attack){
            this.player.anims.play(this.control.animation(this.player), true);
        }
        
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.inputText.setText('Right: ' + playerHp + ' Left: ' + inputP[1] + ' Down: ' + inputP[2] + ' Up: ' + inputP[3]);
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
                this.coin.body.setSize(26, 36);
                this.coin.body.setOffset(3, 1);
                this.coin.anims.play('coin_spin', true);
            }

            ennemis.destroy();
        }
    }

    collectCoin(player, coins){
        if (coins._moving == false){
        playerCoin += coins.getValue();
        coins.destroy();
        this.coinText.setText(playerCoin);
        }
    }

    getBoot(player, boots){

        if (playerCoin >= 150){ 
            this.maxSpeed += 100;
            playerCoin -= 150;
            this.coinText.setText(playerCoin);
            boots.destroy();
            this.priceBoot.destroy();
            boot = true;
        }
    }

    /*getKey(player, weapon){
        this.map.replaceByIndex(385, 297, 60, 23, 1, 1, 1);
        knife = true; 
        weapon.destroy();
    }*/

    getSword(player, swordd){
        swordd.destroy()
        sword = true;
        knife = true;
    }
    
}


//P 960, 540
//E 400, 700