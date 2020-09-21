{
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 400;
  canvas.height = 400;

  canvas.setAttribute(
    "style",
    "display:block;margin:auto;background-color: #ddd"
  );

  document.body.appendChild(canvas);

  const ball = {
    x: null,
    y: null,
    width: 4,
    height: 4,
    speed: 4,
    dx: null,
    dy: null,

    update: function () {
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();

      if (this.x < 0 || this.x > canvas.width) this.dx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.dy *= -1;
      this.x += this.dx;
      this.y += this.dy;
    },
  };
  const paddle = {
    x: null,
    y: null,
    width: 100,
    height: 15,
    speed: 0,

    update: function () {
      ctx.fillRect(this.x, this.y, this.width, this.height);
      ctx.fill();
      this.x += this.speed;
    },
  };
  const block = {
    width: null,
    height: 20,
    data: [],

    update: function () {
      this.data.forEach((brick) => {
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        ctx.stroke();
      });
    },
  };
  const level = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1],
  ];

  const init = () => {
    paddle.x = canvas.width / 2 - paddle.width / 2;
    paddle.y = canvas.height - paddle.height;

    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2 + 50;
    ball.dx = ball.speed;
    ball.dy = ball.speed;

    block.width = canvas.width / level[0].length;

    for (let i = 0; i < level.length; i++) {
      for (let j = 0; j < level[i].length; j++) {
        if ([i][j]) {
          block.data.push({
            x: block.width * j,
            y: block.height * i,
            width: block.width,
            height: block.height,
          });
        }
      }
      console.log(block.data);
    }
  };

  const collide = () => {};
  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    paddle.update();
    ball.update();
    block.update();
    requestAnimationFrame(loop);
  };
  init();
  loop();

  document.addEventListener("keydown", (e) => {
    // if (e.key === ArrowRight) {
    //   paddle.speed = -6;
    // }
    // if (e.key === ArrowLeft) {
    //   paddle.speed = 6;
    // }
    // console.log(e.key); // なんのキーを押したのか
    if (e.key === "ArrowRight") paddle.speed = -6;
    if (e.key === "ArrowLeft") paddle.speed = 6;
  });
  document.addEventListener("keyup", () => (paddle.speed = 0));
}
