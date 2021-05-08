class Control extends Phaser.Scene{

    constructor(){
        super("control");
    }

    inputJoueur(cursors, inputP, pad, xAxis, yAxis){
        //Input
            
        inputP[4] = cursors.space.isDown || pad.X ? true : false;

        //Le joueur appuie sur Droite(Clavier) ou pad Droite/stick vers la Droite(Manette)
        inputP[0] = cursors.right.isDown || pad.right || xAxis > 0.4 ? true : false;

        //Le joueur appuie sur Gauche(Clavier) ou pad gauche/stick vers la Gauche(Manette)
        inputP[1] = cursors.left.isDown || pad.left || xAxis < -0.4 ? true : false;

        //Le joueur appuie sur Bas(Clavier) ou pad Bas/stick vers la Bas(Manette)
        inputP[2] = cursors.down.isDown || pad.down || yAxis > 0.5 ? true : false;

        //Le joueur appuie sur Haut(Clavier) ou pad Haut/stick vers la Haut(Manette)
        inputP[3] = cursors.up.isDown || pad.up || yAxis < -0.5 ? true : false;

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

        if (inputP[4] && sword){
            attack = true;
        }

        if (inputP[0]){
            direction = 'right'
            player.setVelocityX(playerSpeed);
        }
        
        if (inputP[1]){
            direction = 'left'
            player.setVelocityX(-playerSpeed);
        }

        if (!inputP[0] && !inputP[1]){
            player.setVelocityX(0);
        }

        if (inputP[0] && inputP[1]){
            player.setVelocityX(0);
        }

        if (inputP[2]){
            direction = 'down'
            player.setVelocityY(playerSpeed);
        }

        if (inputP[3]){
            direction = 'up'
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

    animation(player){

        if (attack){

            if(direction == 'down'){
                return 'downAttack';
            }

            if(direction == 'up'){
                return 'upAttack'; 
            }

            if(direction == 'left'){
                return 'leftAttack';
            }

            if(direction == 'right'){
                return 'rightAttack';
            }
            
        }

        if (player.body.velocity.x > 0){
            return 'right'
        }

        if (player.body.velocity.x < 0){
            return 'left'
        }

        if (player.body.velocity.y > 0){
            return 'down'
        }

        if (player.body.velocity.y < 0){
            return 'up'
        }
        

    }

    resetControl(cursors){
            cursors.left.isDown = false;
            cursors.right.isDown = false;
            cursors.up.isDown = false;
            cursors.down.isDown = false;
    }
}