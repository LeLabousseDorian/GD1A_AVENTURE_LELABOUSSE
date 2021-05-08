class Menu extends Phaser.Scene{

    constructor(){
        super("menu");
    }

    preload(){
        this.load.image('boot', "assets/boot.png");
        this.load.spritesheet('coin', "assets/coinsheet.png", { frameWidth: 32, frameHeight: 26 });
        this.load.atlas('player', 'assets/player.png', 'assets/player.json');
        this.load.image('ennemi', 'assets/monstre.png');
        this.load.image('merchant', 'assets/merchant.png');
        this.load.image('sword', 'assets/sword.png');
        this.load.image('hitbox', 'assets/hitbox.png');
        this.load.image('blood', "assets/blood.png");
        this.load.image('coin_inventory', "assets/coin.png");
        this.load.image('boot_off', "assets/Boot_off.png");
        this.load.image('boot_on', "assets/Boot_on.png");
        this.load.image('sword_off', "assets/Sword_off.png");
        this.load.image('sword_on', "assets/Sword_on.png");
        this.load.image('hp3', "assets/hp3.png");
        this.load.image('hp2', "assets/hp2.png");
        this.load.image('hp1', "assets/hp1.png");
        this.load.image('gameover', 'assets/gameOver.png');
        this.load.image('control', 'assets/control.png');



        //Tiled
        this.load.image('tileset', 'assets/TilesetVillage.png');
        this.load.tilemapTiledJSON('map', 'village.json');
        this.load.tilemapTiledJSON('dungeon', 'dungeon.json');

    }

    create(){
        this.scene.start('scene1', {playerX: 352, playerY: 288, maxSpeed: 250})
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'left',
                start: 1,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'right',
                start: 1,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'up',
                start: 1,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'down',
                start: 1,
                end: 3,
                zeroPad: 1
            }),
            frameRate: 5,
        });

        this.anims.create({
            key: 'leftAttack',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'attackLeft',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 2,
        });

        this.anims.create({
            key: 'rightAttack',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'attackRight',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 2,
        });

        this.anims.create({
            key: 'upAttack',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'attackUp',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 2,
        });

        this.anims.create({
            key: 'downAttack',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'attackDown',
                start: 1,
                end: 2,
                zeroPad: 1
            }),
            frameRate: 2,
        });

        this.anims.create({
            key: 'coin_spin',
            frames: this.anims.generateFrameNumbers('coin', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

    }
}