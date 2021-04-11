class ChangeScene extends Phaser.Scene{

    constructor(){
        super("changeScene");
    }

    positionScene(playerX, playerY){
        //Compare la position du joueur en pourcentage dans l'écran,
        //Si il est plus a droite qu'il n'est en haut/bas on ne change que le x etc...

        //Si le joueur est a gauche de l'écran avant de changer de scène
        if (playerX/1920 < playerY/1080 && playerX/1920 < 1-playerY/1080){
            x = (1920*(1-playerX/1920))-30;
            y = playerY;
        }
        
        else if (1-playerX/1920 < playerY/1080 && 1-playerX/1920 < 1-playerY/1080){
            x = (1920*(1-playerX/1920))+30;
            y = playerY;
        }

        else if (1-playerX/1920 < playerY/1080 && playerX/1920 < playerY/1080){
            y = (1080*(1-playerY/1080))+30;
            x = playerX;
        }

        else{
            y = (1080*(1-playerY/1080))-30;
            x = playerX;
        }

        if (playerX == null){
            x = 960;
            y = 540;
        }

        return [x, y];
    }


}