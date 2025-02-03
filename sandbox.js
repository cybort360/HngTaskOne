const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelector('[data-testid="colorOptions"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreDisplay = document.querySelector('[data-testid="score"]');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');

let targetColor = 0;
let score = 0;

function initialize() {
  const target = Math.floor(Math.random() * colors.length);
  targetColor = colors[target];
  colorBox.style.backgroundColor = targetColor;
  function shuffle(array) {
    for (let i =  array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  
  const shuffledColors = shuffle([...colors]);
  
  colorOptions.innerHTML = '';
  
  shuffledColors.forEach(color => {
    createColorButton(color);
  });
  
  gameStatus.textContent = '';
}


function createColorButton(color) {
  const button = document.createElement('button');
  button.style.backgroundColor = color;
  button.dataset.color = color;
  button.setAttribute('data-testid', 'colorOptions');
  button.addEventListener('click', Guess);
  colorOptions.appendChild(button);
};

function Guess(event) {
  const selectedColor = event.target.dataset.color;
  const buttons = document.querySelectorAll('[data-testid="colorOption]');

  buttons.forEach(button => {
    button.disabled = true;
    if(button.dataset.color === targetColor) {
      button.classList.add('correct-animation')
    }
  
});

function handleCorrectGuess() {
  score++;
  scoreDisplay.textContent = score;

  gameStatus.textContent = 'Correct! Take another Guess';

  setTimeout(initialize, 1000);
}

function handleWrongGuess(wrongButton) {
  score = 0;
  scoreDisplay.textContent = score;

  gameStatus.textContent = 'Wrong! Resetting...'

  wrongButton.classList.add('wrong-animation');

  setTimeout(initialize, 1500);
}

if(selectedColor === targetColor) {
  handleCorrectGuess();
} else {
  handleWrongGuess(event.target);
}
}
newGameButton.addEventListener('click', () => {
  score = 0;
  scoreDisplay.textContent = score;
  initialize();
});

initialize();