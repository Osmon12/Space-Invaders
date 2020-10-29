document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".grid");
  for (let i = 0; i < 625; i++) {
    let div = document.createElement("div");
    div.setAttribute("data-i", i);
    container.appendChild(div);
  }

  document.addEventListener("keydown", moveShooter);
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  let width = 25;
  let currentShooterI = 612;
  let currentInvaderI = 0;
  let alienInvadersTakeDown = [];
  let score = 0;
  let direction = 1;
  let invaderId;

  //define the alien invaders
  const alienInvaders = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    25,
    26,
    27,
    28,
    29,
    30,
    31,
    32,
    33,
    34,
    35,
    36,
    37,
    38,
    39,
    50,
    51,
    52,
    53,
    54,
    55,
    56,
    57,
    58,
    59,
    60,
    61,
    62,
    63,
    64,
    75,
    76,
    77,
    78,
    79,
    80,
    81,
    82,
    83,
    84,
    85,
    86,
    87,
    88,
    89,
  ];

  //draw the alien invaders
  alienInvaders.forEach((invader) => {
    squares[currentInvaderI + invader].classList.add("invader");
  });

  //draw the shooter
  squares[currentShooterI].classList.add("shooter");

  //show info about game process
  alert("Hi \n Press Space to shoot \n and ⬅ or ➡ to move");

  //move the shooter along a line
  function moveShooter(e) {
    squares[currentShooterI].classList.remove("shooter");
    switch (e.keyCode) {
      case 37:
        if (currentShooterI % width !== 0) {
          currentShooterI -= 1;
        }
        break;
      case 39:
        if (currentShooterI % width < width - 1) {
          currentShooterI += 1;
        }
        break;
    }
    squares[currentShooterI].classList.add("shooter");
  }

  //move the alien invaders
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0;
    const rightEdge =
      alienInvaders[alienInvaders.length - 1] % width === width - 1;

    if ((leftEdge && direction === -1) || (rightEdge && direction === 1)) {
      direction = width;
    } else if (direction === width) {
      if (leftEdge) direction = 1;
      else direction = -1;
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      squares[alienInvaders[i]].classList.remove("invader");
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      alienInvaders[i] += direction;
    }
    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (!alienInvadersTakeDown.includes(i)) {
        squares[alienInvaders[i]].classList.add("invader");
      }
    }

    //decide a game over
    if (squares[currentShooterI].classList.contains("invader", "shooter")) {
      alert("Game Over");
      squares[currentShooterI].classList.add("boom");
      clearInterval(invaderId);
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++) {
      if (alienInvaders[i] > squares.length - (width - 1)) {
        alert("Game Over");
        clearInterval(invaderId);
      }
    }

    //decide a Win
    if (alienInvadersTakeDown.length === alienInvaders.length) {
      alert("You Win 😂");
      clearInterval(invaderId);
    }
  }
  invaderId = setInterval(moveInvaders, 400);

  //shoot at aliens
  function shoot(e) {
    let laserI;
    let currentLaserI = currentShooterI;

    //move the laser form the shgooter to the alien Invader
    function moveLaser() {
      squares[currentLaserI].classList.remove("laser");
      currentLaserI -= width;
      squares[currentLaserI].classList.add("laser");
      if (squares[currentLaserI].classList.contains("invader")) {
        squares[currentLaserI].classList.remove("invader");
        squares[currentLaserI].classList.remove("laser");
        squares[currentLaserI].classList.add("boom");

        setTimeout(() => squares[currentLaserI].classList.remove("boom"), 250);
        clearInterval(laserI);

        const alienTakenDown = alienInvaders.indexOf(currentLaserI);
        alienInvadersTakeDown.push(alienTakenDown);
        score++;
        result.textContent = score;
      }

      if (currentLaserI < width) {
        clearInterval(laserI);
        setTimeout(() => squares[currentLaserI].classList.remove("laser"), 100);
      }
    }

    switch (e.keyCode) {
      case 32:
        laserI = setInterval(moveLaser, 50);
    }
  }
  document.addEventListener("keyup", shoot);
});
