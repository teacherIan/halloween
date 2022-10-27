const fullScreenButton = document.querySelector('.full');
const pixi = document.querySelector('.pixi');

setInterval(() => {
  console.log('ran interval');
  let hue = Math.random() * 360;
  let grayScale = Math.random() * 100;
  pixi.style.filter = `hue-rotate(${hue}deg)`;
  pixi.style.filter = `grayscale(${grayScale}%)`;
}, 10000);

const laugh = new Audio('./evil-laugh-49831.mp3');
const horn = new Audio('./scary-horn-7090.mp3');
fullScreenButton.addEventListener('click', () => {
  pixi.requestFullscreen();
  fullScreenButton.style.display = 'none';
  laugh.play();
  horn.play();
});

horn.addEventListener('ended', () => {
  laugh.play();
  horn.play();
  console.log('Audio ended');
});

class glitch {
  constructor(el) {
    // create stage
    const imgLink = './CRANE.jpg';
    const canvas = document.querySelector('.pixi');

    let hue = Math.random() * 360;
    pixi.style.filter = `hue-rotate(${hue}deg)`;

    const app = new PIXI.Application({
      view: canvas,
      width: window.innerWidth,
      height: window.innerHeight,
      transparent: true,
    });

    // image
    const texture = PIXI.Texture.from(imgLink);
    this.img = new PIXI.Sprite(texture);

    // center image
    this.img.width = window.innerWidth;
    this.img.height = window.innerHeight;
    this.img.x = app.screen.width / 2 - 30;
    this.img.y = app.screen.height / 2;
    this.img.anchor.x = 0.5;
    this.img.anchor.y = 0.5;

    // add image to stage
    app.stage.addChild(this.img);

    // create all filters, rgb split and glitch slices
    this.img.filters = [
      new PIXI.filters.RGBSplitFilter(),
      new PIXI.filters.GlitchFilter(),
    ];

    // reset rgb split
    this.img.filters[0].red.x = 0;
    this.img.filters[0].red.y = 0;
    this.img.filters[0].green.x = 0;
    this.img.filters[0].green.y = 0;
    this.img.filters[0].blue.x = 0;
    this.img.filters[0].blue.y = 0;

    // reset glitch
    this.img.filters[1].slices = 0;
    this.img.filters[1].offset = 20;

    // begin animation
    this.anim = this.anim.bind(this);
    this.anim();
  }

  randomIntFromInterval(min, max) {
    return Math.random() * (max - min + 1) + min;
  }

  anim() {
    const THAT = this;

    const tl = gsap.timeline({
      delay: this.randomIntFromInterval(0, 3),
      onComplete: this.anim,
    });

    tl.to(this.img.filters[0].red, {
      duration: 0.2,
      x: this.randomIntFromInterval(-100, 100),
      y: this.randomIntFromInterval(-15, 15),
    });

    tl.to(this.img.filters[0].red, {
      duration: 0.01,
      x: 0,
      y: 0,
    });

    tl.to(
      this.img.filters[0].blue,
      {
        duration: 0.2,
        x: this.randomIntFromInterval(-15, 15),
        y: 0,
        onComplete() {
          THAT.img.filters[1].slices = 100;
          THAT.img.filters[1].direction = THAT.randomIntFromInterval(-75, 75);

          // console.log(THAT.img.filters[1].slices)
        },
      },
      '-=0.2'
    );

    tl.to(this.img.filters[0].blue, {
      duration: 0.1,
      x: this.randomIntFromInterval(-150, 150),
      y: this.randomIntFromInterval(-50, 50),
      onComplete() {
        THAT.img.filters[1].slices = 120;
        THAT.img.filters[1].direction = THAT.randomIntFromInterval(-175, 175);
      },
    });

    tl.to(this.img.filters[0].blue, {
      duration: 0.01,
      x: 0,
      y: 0,
      onComplete() {
        THAT.img.filters[1].slices = 0;
        THAT.img.filters[1].direction = 0;
      },
    });

    tl.to(
      this.img.filters[0].green,
      {
        duration: 0.2,
        x: this.randomIntFromInterval(-15, 15),
        y: 0,
      },
      '-=0.2'
    );

    tl.to(this.img.filters[0].green, {
      duration: 0.1,
      x: this.randomIntFromInterval(-20, 20),
      y: this.randomIntFromInterval(-15, 15),
    });

    tl.to(this.img.filters[0].green, {
      duration: 0.01,
      x: 0,
      y: 0,
    });

    tl.timeScale(0.02);
  }
}
new glitch();
