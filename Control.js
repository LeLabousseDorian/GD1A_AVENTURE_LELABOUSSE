class Control extends Phaser.Scene{

    constructor(){
        super("control");
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

    resetControl(cursors){
        if(cursors.left.isDown){
            cursors.left.isDown = false;
        }

        if(cursors.right.isDown){
            cursors.right.isDown = false;
        }

        if(cursors.up.isDown){
            cursors.up.isDown = false;
        }

        if(cursors.down.isDown){
            cursors.down.isDown = false;
        }
    }
}