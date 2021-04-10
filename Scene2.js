class Scene2 extends Phaser.Scene {
    
    constructor(){
        super("scene2")
    }

    init(data){
        this.playerSpeed = data.playerSpeed;
        this.sceneText = data.sceneText;
        this.camera = data.camera
        this.player = data.player
    }

    preload(){

    }

    create(){
        this.debutScene = true;
        this.add.image(960, 540, 'sky');
        this.add.image(400,300, 'item');
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(960, 1055, 'platform');
        this.player.visible = true;
        this.cursors = this.input.keyboard.createCursorKeys();
        this.playerXText = this.add.text(16, 48, 'X: '+ this.player.x, { fontSize: '32px', fill: '#ddd' });
        this.playerYText = this.add.text(16, 80, 'Y: '+ this.player.y, { fontSize: '32px', fill: '#ddd' });
        this.cameraText = this.add.text(16, 112, 'Camera: '+ this.camera, { fontSize: '32px', fill: '#ddd' });
        this.velocityText = this.add.text(16, 176, 'X: ' + this.player.body.velocity.x + ' Y: ' + this.player.body.velocity.y, { fontSize: '32px', fill: '#ddd' });
        this.physics.add.collider(this.player, this.platforms);
    }
    
    update(){

        if (this.debutScene){
            this.debutScene = false;
            this.camera.fadeIn(101)
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
}