import {Polygon} from './polygon.js';

class App {
  constructor() {
    this.canvas = document.createElement('canvas');
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.pixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

    window.addEventListener('resize', this.resize.bind(this), false);
    this.resize();

    this.isDown = false;
    this.moveX = 0;
    this.offsetX = 0;

    document.addEventListener('pointerdown', this.onDown.bind(this), false);
    document.addEventListener('pointermove', this.onMove.bind(this), false);
    document.addEventListener('pointerup', this.onUp.bind(this), false);
    document.addEventListener('click', this.onClick.bind(this), false); // 다각형 클릭 시도



    window.requestAnimationFrame(this.animate.bind(this));
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;

    this.canvas.width = this.stageWidth * this.pixelRatio;
    this.canvas.height = this.stageHeight * this.pixelRatio;
    this.ctx.scale(this.pixelRatio, this.pixelRatio);

    this.polygon = new Polygon(
      this.stageWidth / 2,
      this.stageHeight + (this.stageHeight / 4), 
      this.stageHeight / 1.2,
      15
    );
  }

  animate() {
    window.requestAnimationFrame(this.animate.bind(this));

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);


    this.moveX *= 0.92;

    this.polygon.animate(this.ctx, this.moveX);
  }

  onDown(e) {
    this.isDown = true;
    this.moveX = 0;
    this.offsetX = e.clientX;

  }

  onMove(e) {
    if (this.isDown) {
      this.moveX = e.clientX - this.offsetX;
      this.offsetX = e.clientX;
    }
  }

  onUp(e) {
    this.isDown = false;
  }
  onClick(e) {
    const clickX = e.clientX * this.pixelRatio;
    const clickY = e.clientY * this.pixelRatio;
  
    // 다각형이 여러 개인 경우 각각의 다각형을 클릭했는지 확인합니다.
    if (this.polygon.isPointInPolygon(clickX, clickY)) {
      // 여기에 각 다각형을 클릭했을 때 수행할 동작을 추가합니다.
      // 예를 들어, 각 다각형에 대한 링크로 리디렉션하려면 다음과 같이 사용할 수 있습니다.
      window.location.href = 'p1/p1.html'; // 대상 웹 페이지의 URL을 여기에 넣으세요
    }
  }
}

window.onload = () => {
  new App();
}

