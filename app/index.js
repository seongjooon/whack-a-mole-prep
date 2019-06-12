// Load application styles
import 'styles/index.css';

(function () {
  let beforeId;
  let scoreBoard = 0;
  let remainedCount = 10;
  let isGameStarted = false;

  const holeStage = Array(9).fill(null).reduce((acc, _, i) => {
    const innerArr = Math.floor(i / 3);
    if (acc[innerArr] && acc[innerArr].length < 3) acc[innerArr].push({ id: i, isUp: false });
    if (!acc[innerArr]) acc[innerArr] = [{ id: i, isUp: false }];
    return acc;
  }, []);

  const getRandomNumber = () => Math.floor(Math.random() * 3);

  const checkCount = () => {
    if (remainedCount !== 0) return;
    gameOver();
  };

  const punchMole = e => {
    remainedCount--;
    document.getElementById("punch-count").innerHTML = `Count : ${remainedCount}`;

    const id = e.target.id.split('-')[1] * 1;
    const flatten = holeStage.reduce((acc, v) => ([...acc, ...v]), []);
    const selectedHole = flatten.filter(v => v.id === id)[0];

    if (!selectedHole.isUp) return checkCount();
    document.getElementById(e.target.id).src = 'assets/images/hole.jpg';
    scoreBoard++;
    selectedHole.isUp = false;

    if (isGameStarted) setTimeout(riseMole, 1000);
    checkCount();
  };

  const riseMole = () => {
    let selectedHole = holeStage[getRandomNumber()][getRandomNumber()];

    if (beforeId === selectedHole.id) return riseMole();
    selectedHole.isUp = true;
    beforeId = selectedHole.id;
    document.getElementById(`hole-${selectedHole.id}`).src = 'assets/images/mole.jpg';

    setTimeout(() => hideMole(selectedHole.id), 3000);
  };

  const hideMole = id => {
    const flatten = holeStage.reduce((acc, v) => ([...acc, ...v]), []);
    const selectedHole = flatten.filter(v => v.id === id)[0];

    if (!selectedHole.isUp) return;
    document.getElementById(`hole-${id}`).src = 'assets/images/hole.jpg';
    selectedHole.isUp = false;

    if (isGameStarted) setTimeout(riseMole, 1000);
  };

  const gameOver = () => {
    isGameStarted = false;

    for (let i = 0; i < 9; i++) {
      document.getElementById(`hole-${i}`).removeEventListener('click', punchMole);
    }

    document.getElementById("score-board").style.display = 'inline';
    document.getElementById("score-board").innerHTML = `Your Punch Score : ${(scoreBoard / 10) * 100}`;
    document.getElementById("restart-btn").style.display = 'inline';
  };

  const gameStart = () => {
    isGameStarted = true;
    scoreBoard = 0;
    remainedCount = 10;

    document.getElementById("score-board").style.display = 'none';
    document.getElementById("restart-btn").style.display = 'none';
    document.getElementById("punch-count").innerHTML = `Count : ${remainedCount}`;

    for (let i = 0; i < 9; i++) {
      document.getElementById(`hole-${i}`).addEventListener('click', punchMole);
    }

    document.getElementById("start-btn").style.display = 'none';
    setTimeout(riseMole, 1000);
  };

  document.getElementById('start-btn').addEventListener('click', gameStart);
  document.getElementById('restart-btn').addEventListener('click', gameStart);
})();
