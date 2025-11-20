export class GameOver extends Phaser.Scene {
    constructor() {
        super('GameOver');
    }

    preload() {
        this.load.image('background', 'assets/food/Sample.png');
        
    }

    create() {
        this.background = this.add.sprite(640, 320, 'background');
        this.add.text(320, 300, 'You Died!', { fontSize: '128px', fill: '#FFF', align: "center" });
        this.add.text(320, 440, 'Press SPACE to Retry', { fontSize: '56px', fill: '#FFF', align: "center" });

        this.space = this.input.keyboard.addKey("SPACE", true, true);
    }


    update() {
        if (this.space.isDown){
            this.scene.stop("GameOver");
            this.scene.start("Start");
        }


    }




}