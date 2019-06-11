// Load application styles
import 'styles/index.css';

(function () {
  let scoreBoard = 0;
  let count = 10;
  let beforeId;

  let stage = [];
  const stage1 = Array(9).fill(null).map((_, i) => ({ id: i, isUp: false}));

  for (let i = 0; i < 3; i++) {
    stage.push(stage1.splice(0, 3));
  }
  document.getElementById("punch-count").innerHTML = `Count : ${count}`;
  const getRandomNumber = () => Math.floor(Math.random() * 3);

  const punchMole = (e) => {
    count--;
    document.getElementById("punch-count").innerHTML = `Count : ${count}`;
    if (count === 0 && scoreBoard === 0) {
      for (let i = 0; i < 9; i++) {
        document.getElementById(`hole-${i}`).removeEventListener('click', punchMole);
        document.getElementById(`hole-${i}`).src = 'assets/images/hole.jpg';
      }
      getRandomMole = null;
      document.getElementById("score-board").innerHTML = `Your Punch Score : ${(scoreBoard / 10) * 100}`;
      document.getElementById("restartBtn").style.display = 'inline';
    } else if (count === 0 && scoreBoard > 0 && scoreBoard < 10) {
      for (let i = 0; i < 9; i++) {
        document.getElementById(`hole-${i}`).removeEventListener('click', punchMole);
        document.getElementById(`hole-${i}`).src = 'assets/images/hole.jpg';
      }
      getRandomMole = null;
      document.getElementById("score-board").innerHTML = `Your Punch Score : ${(scoreBoard / 10) * 100}`;
      document.getElementById("restartBtn").style.display = 'inline';
    } else if (count === 0) {
      for (let i = 0; i < 9; i++) {
        document.getElementById(`hole-${i}`).removeEventListener('click', punchMole);
        document.getElementById(`hole-${i}`).src = 'assets/images/hole.jpg';
      }
      getRandomMole = null;
      document.getElementById("score-board").innerHTML = `Your Punch Score : ${((scoreBoard + 1) / 10) * 100}`;
      document.getElementById("restartBtn").style.display = 'inline';
    }

    const id = e.target.id.split('-')[1] * 1;
    const flatten = stage.reduce((acc, v) => {
      return [...acc, ...v];
    }, []);
    const targetMole = flatten.filter(v => v.id === id)[0];

    if (!targetMole.isUp) return;
    document.getElementById(e.target.id).src = 'assets/images/hole.jpg';
    scoreBoard++;
    targetMole.isUp = false;
    setTimeout(getRandomMole, 1000);
  };

  let getRandomMole = () => {
    let randomMole = stage[getRandomNumber()][getRandomNumber()];
    if (beforeId === randomMole.id) return getRandomMole();
    randomMole.isUp = true;
    beforeId = randomMole.id;
    document.getElementById(`hole-${randomMole.id}`).src = 'assets/images/mole.jpg';
    setTimeout(() => { hideMole(randomMole.id) }, 3000);
  };

  const hideMole = id => {
    const flatten = stage.reduce((acc, v) => {
      return [...acc, ...v];
    }, []);
    const targetMole = flatten.filter(v => v.id === id)[0];
    if (!targetMole.isUp) return;
    document.getElementById(`hole-${id}`).src = 'assets/images/hole.jpg';
    targetMole.isUp = false;
    setTimeout(getRandomMole, 1000);
  };

  const gameStart = () => {
    for (let i = 0; i < 9; i++) {
      document.getElementById(`hole-${i}`).addEventListener('click', punchMole);
    }

    document.getElementById("startBtn").style.display = 'none';
    setTimeout(getRandomMole, 1000);
  };

  const reload = () => location.reload();

  document.getElementById('startBtn').addEventListener('click', gameStart);
  document.getElementById('restartBtn').addEventListener('click', reload);
})();
