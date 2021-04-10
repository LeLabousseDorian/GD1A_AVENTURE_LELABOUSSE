class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        this.playerSpeed = data.playerSpeed;
        this.camera = data.camera;
    }

    preload(){

    }

    create(){
        
        this.debutScene = true;
        this.add.image(960, 540, 'sky');
        this.add.image(400,300, 'item');

        //Platform
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(960, 1055, 'platform');

        //Input
        this.cursors = this.input.keyboard.createCursorKeys();

        this.sceneText = this.add.text(16, 16, 'Scene '+ actualScene + ': ' + this.random, { fontSize: '32px', fill: '#ddd' });
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' });
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' });
        this.cameraText = this.add.text(16, 112, 'Camera: '+ this.camera, { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        
        //Collider
        this.physics.add.collider(this.player, this.platforms);
    }
    
    update(){

        if (this.debutScene){
            this.debutScene = false;
            this.camera.fadeIn(101);
        }

        if (this.cursors.left.isDown){
            this.player.setVelocityX(-this.playerSpeed);
        }
        else if (this.cursors.right.isDown){
            this.player.setVelocityX(this.playerSpeed);
        }
        
        else{
            this.player.setVelocityX(0);
        }
        
        this.sceneText.setText('Scene '+ actualScene + ': ' + this.player);
        this.playerXText.setText('X: '+ Math.round(this.player.x));
        this.playerYText.setText('Y: '+ Math.round(this.player.y));
        this.velocityText.setText('X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y);
    }

    inputJoueur(cursors, inputP){
        //Input
        if (cursors.right.isDown){
            inputP[0] = true;
        }

        if (cursors.right.isUp){
            inputP[0] = false;
        }

        if (cursors.left.isDown){
            inputP[1] = true;
        }

        if (cursors.left.isUp){
            inputP[1] = false;
        }

        if (cursors.down.isDown){
            inputP[2] = true;
        }

        if (cursors.down.isUp){
            inputP[2] = false;
        }

        if (cursors.up.isDown){
            inputP[3] = true;
        }

        if (cursors.up.isUp){
            inputP[3] = false;
        }

        return (inputP);
    }

    movementJ(inputP, player, playerSpeed, maxSpeed){
        //Logic

        //Si le joueur se déplace en diagonale, sa vitesse est réduite
        if (player.body.velocity.x != 0 && player.body.velocity.y != 0){
            playerSpeed = maxSpeed*0.66;
        }

        else{
            playerSpeed = maxSpeed;
        }

        if (inputP[0]){
            player.setVelocityX(playerSpeed);
        }
        
        if (inputP[1]){
            player.setVelocityX(-playerSpeed);
        }

        if (!inputP[0] && !inputP[1]){
            player.setVelocityX(0);
        }

        if (inputP[0] && inputP[1]){
            player.setVelocityX(0);
        }

        if (inputP[2]){
            player.setVelocityY(playerSpeed);
        }

        if (inputP[3]){
            player.setVelocityY(-playerSpeed);
        }
        
        if (!inputP[2] && !inputP[3]){
            player.setVelocityY(0);
        }

        if (inputP[2] && inputP[3]){
            player.setVelocityY(0);
        }

        

        return [player.body.velocity.x, player.body.velocity.y];
    }
}