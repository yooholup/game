export class Start extends Phaser.Scene {

    constructor() {
        super('Start');
    }

    preload() {
        this.load.image('background', 'assets/food/Sample.png');
        this.load.image('character', 'assets/characters/PNG/Adventurer/Poses/adventurer_cheer1.png');
        this.load.image('tiles', 'assets/food/Tilemap/tilemap_packed.png');
        this.load.image('bg_tiles', 'assets/tilemap-backgrounds_packed.png');
        this.load.tilemapTiledJSON('tilemap', 'assets/diego1.tmj');

    }

   /* makeTilemap(x,y){
        var background = undefined;
        if (this.tilemaps[x+"_" + y]) return;
        this.tilemaps[x+"_" + y] = true;
        x = x*15*32;
        y = y*15*32;
        
        background = this.add.tilemap('tilemap', 18, 18, 15, 15);
       
        var tileset = background.addTilesetImage("tilemap_packed", "tiles", 32, 32, 0, 2);
        var bg = background.createLayer("background", tileset, x, y);
        bg.setDepth(0);
        var layer = background.createLayer("obstacles", tileset, x, y);
        layer.setCollisionBetween(1,1767);
        this.physics.add.collider(layer, this.player);
        var paths = background.createLayer("paths", tileset, x, y);
        
        this.paths.add(paths);
        paths.setCollisionBetween(1,1767);
        this.physics.add.existing(paths);
        background.createLayer("decoration", tileset, x, y);
    } */

    create() {
        //this.background = this.add.sprite(640, 320, 'background');
        this.player = this.add.sprite(150, 500, 'character');
        this.player.setScale(0.3, 0.3);
        this.physics.add.existing(this.player);
        this.player.speed = 300;
        //this.player.setDepth(1);

        const map = this.make.tilemap( { key: "tilemap", tileWidth: 18, tileHeight: 18 });
        const tileset = map.addTilesetImage("tilemap_packed", "tiles");
        const bg_set = map.addTilesetImage("tilemap-backgrounds_packed.png", 'bg_tiles');
        const bg = map.createLayer("background", bg_set, 0, 360);
        bg.setDepth(0);

        //Align.scaleToGameW(map, 2);
        const ground = map.createLayer("ground", tileset, 0, 360);
        ground.setCollisionBetween(1, 1767);
        this.physics.add.collider(ground, this.player);
        var decoration = map.createLayer("decoration", tileset, 0, 360);
        decoration.setDepth(2);
        const platform = map.createLayer("platform", tileset, 0, 360);
        platform.setCollisionBetween(1, 1767);
        this.physics.add.collider(platform, this.player);
        const moving = map.createLayer("moving_platform", tileset, 0, 360);
        const exit = map.createLayer("exit", tileset, 0, 360);
        const danger = map.createLayer("danger", tileset, 0, 360);
        var collectibles = map.createLayer("collectibles", tileset, 0, 360);





        this.last_time = 0;

        this.die = this.input.keyboard.addKey("CTRL", true, true);
        this.right = this.input.keyboard.addKey("D", true, true);
        this.left = this.input.keyboard.addKey("A", true, true);
        this.jump = this.input.keyboard.addKey("SPACE", true, true);

        this.cameras.main.setBounds(0,0, map.width, map.height);
        this.cameras.main.startFollow(this.player, true);
        this.cameras.main.setDeadzone(1000, 200);
    }

    update(time) {
        let dt = (time - this.last_time)/1000;
        this.last_time = time;

        const speed = this.player.speed;
        
        if (this.die.isDown){
            this.scene.stop("Start");
            this.scene.start("GameOver");
        }

        if (this.right.isDown){
            this.player.x += speed*dt;
        }

        if (this.left.isDown){
            this.player.x -= speed*dt;
        }

        if (this.jump.isDown){
            this.player.y -= speed*dt;
        }

        if (this.player.body.velocity.y > 0){
            this.player.body.setGravityY(300);
        }
        else{
            this.player.body.setGravityY(150);
        }
    }
    
}
