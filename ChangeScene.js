class ChangeScene extends Phaser.Scene{

    constructor(){
        super("changeScene");
    }

    positionScene(playerX, playerY){
        //Compare la position du joueur en pourcentage dans l'écran,
        //Si il est plus a droite qu'il n'est en haut/bas on ne change que le x etc...

        //Si le joueur est a gauche de l'écran avant de changer de scène
        if (playerX/widthScreen < playerY/heightScreen && playerX/widthScreen < 1-playerY/heightScreen){
            x = (widthScreen*(1-playerX/widthScreen))-30;
            y = playerY;
        }
        
        else if (1-playerX/widthScreen < playerY/heightScreen && 1-playerX/widthScreen < 1-playerY/heightScreen){
            x = (widthScreen*(1-playerX/widthScreen))+30;
            y = playerY;
        }

        else if (1-playerX/widthScreen < playerY/heightScreen && playerX/widthScreen < playerY/heightScreen){
            y = (heightScreen*(1-playerY/heightScreen))+30;
            x = playerX;
        }

        else{
            y = (heightScreen*(1-playerY/heightScreen))-30;
            x = playerX;
        }


        return [x, y];
    }


}