// --- DOM Elements ---
const screens = document.querySelectorAll('.screen');
const introScreen = document.getElementById('intro-screen');
const instructionsScreen = document.getElementById('instructions-screen');
const settingsScreen = document.getElementById('settings-screen');
const gameScreen = document.getElementById('game-screen');
const nameInput = document.getElementById('name-input');
const nameNextBtn = document.getElementById('name-next-btn');
const instructionsNextBtn = document.getElementById('instructions-next-btn');
const startButton = document.getElementById('start-button');
const themeSelect = document.getElementById('theme-select');
const wordLengthInput = document.getElementById('word-length-input');
const chancesInput = document.getElementById('chances-input');
const timedModeCheckbox = document.getElementById('timed-mode-checkbox');
const welcomeMessage = document.getElementById('welcome-message');
const timerDisplay = document.getElementById('timer-display');
const wordDisplay = document.getElementById('word-display');
const attemptsLeftText = document.getElementById('attempts-left');
const hintText = document.getElementById('hint-text');
const keyboardContainer = document.getElementById('keyboard');
const figureParts = document.querySelectorAll('.figure-part');
const showHintBtn = document.getElementById('show-hint-btn');
const powerupRevealBtn = document.getElementById('powerup-reveal');
const powerupRemoveBtn = document.getElementById('powerup-remove');
const powerup5050Btn = document.getElementById('powerup-5050');
const accuracyLabel = document.getElementById('accuracy-label');
const accuracyBar = document.getElementById('accuracy-bar');
const popupContainer = document.getElementById('popup-container');
const finalMessage = document.getElementById('final-message');
const finalMessageReveal = document.getElementById('final-message-reveal');
const finalHint = document.getElementById('final-hint');
const accuracyDisplay = document.getElementById('accuracy-display');
const playAgainButton = document.getElementById('play-again-button');

// --- Game Data (Expanded Word Lists) ---
const themes = {
    general: [ { word: 'idea', hint: 'A thought or suggestion.' }, { word: 'quest', hint: 'A long search for something.' }, { word: 'rhythm', hint: 'A repeated pattern of sound.' }, { word: 'journey', hint: 'An act of traveling somewhere.' }, { word: 'project', hint: 'A carefully planned enterprise.' }, { word: 'knowledge', hint: 'Facts and information acquired.' }, { word: 'experience', hint: 'Practical contact with events.' } ],
    animals: [ { word: 'wolf', hint: 'Wild canine, travels in packs.' }, { word: 'tiger', hint: 'Large striped cat.' }, { word: 'monkey', hint: 'Primate known for swinging.' }, { word: 'cheetah', hint: 'The fastest land animal.' }, { word: 'elephant', hint: 'Large mammal with a trunk.' }, { word: 'crocodile', hint: 'Large predatory reptile.' }, { word: 'salamander', hint: 'A lizard-like amphibian.' } ],
    technology: [ { word: 'code', hint: 'Instructions for a computer.' }, { word: 'server', hint: 'A computer that serves data.' }, { word: 'binary', hint: 'A system using only 0s and 1s.' }, { word: 'network', hint: 'Interconnected computing devices.' }, { word: 'database', hint: 'An organized collection of data.' }, { word: 'framework', hint: 'A reusable set of libraries.' }, { word: 'javascript', hint: 'Language of the web.' } ],
    food: [ { word: 'cake', hint: 'A sweet baked dessert.' }, { word: 'sushi', hint: 'Japanese dish with rice.' }, { word: 'burger', hint: 'A patty in a sliced bun.' }, { word: 'pancake', hint: 'A flat cake, often fried.' }, { word: 'spaghetti', hint: 'Long, thin pasta.' }, { word: 'chocolate', hint: 'A sweet food from cacao beans.' }, { word: 'pineapple', hint: 'A tropical fruit with a crown.' } ],
    sports: [ { word: 'golf', hint: 'A club-and-ball sport.' }, { word: 'score', hint: 'Points gained in a game.' }, { word: 'trophy', hint: 'A cup awarded as a prize.' }, { word: 'cricket', hint: 'A bat-and-ball game.' }, { word: 'champion', hint: 'The winner of a competition.' }, { word: 'wrestling', hint: 'A combat sport with grappling.' }, { word: 'basketball', hint: 'A game played with a hoop.' } ],
    science: [ { word: 'atom', hint: 'The basic unit of a chemical element.' }, { word: 'orbit', hint: 'The path of a celestial object.' }, { word: 'fossil', hint: 'Remains of a prehistoric organism.' }, { word: 'gravity', hint: 'The force that attracts bodies.' }, { word: 'molecule', hint: 'A group of atoms bonded together.' }, { word: 'chemistry', hint: 'The study of matter and its properties.' }, { word: 'experiment', hint: 'A procedure to test a hypothesis.' } ]
};

// --- Game State Variables ---
let selectedWord = '', selectedHint = '', playerName = '', correctLetters = [], wrongGuessCount = 0;
let maxWrongGuesses = 6, gameActive = false, timerInterval;
let usedWords = [];

// --- Functions ---
function switchScreen(screenId) {
    screens.forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

function selectNewWord(wordList) {
    let availableWords = wordList.filter(item => !usedWords.includes(item.word));
    if (availableWords.length === 0) {
        const wordsToReset = wordList.map(item => item.word);
        usedWords = usedWords.filter(word => !wordsToReset.includes(word));
        availableWords = wordList;
    }
    const { word, hint } = availableWords[Math.floor(Math.random() * availableWords.length)];
    selectedWord = word; selectedHint = hint; correctLetters = []; wrongGuessCount = 0;
    usedWords.push(word);
}

function displayWord() {
    wordDisplay.innerHTML = `${selectedWord.split('').map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`).join('')}`;
    const isWinner = selectedWord.split('').every(letter => correctLetters.includes(letter));
    if (gameActive && isWinner) {
        endGame(true);
    }
}

function updateWrongGuesses() {
    attemptsLeftText.innerText = `Wrong Guesses: ${wrongGuessCount} / ${maxWrongGuesses}`;
    figureParts.forEach((part, index) => part.classList.toggle('visible', index < wrongGuessCount));
    if (wrongGuessCount === maxWrongGuesses) {
        endGame(false);
    }
}

function updateAccuracyChart() {
    const totalGuesses = correctLetters.length + wrongGuessCount;
    const accuracy = totalGuesses > 0 ? (correctLetters.length / totalGuesses) * 100 : 100;
    accuracyLabel.innerText = `Accuracy: ${accuracy.toFixed(0)}%`;
    accuracyBar.style.height = `${accuracy}%`;
    if (accuracy < 30) accuracyBar.style.backgroundColor = '#dc3545';
    else if (accuracy < 60) accuracyBar.style.backgroundColor = '#ffc107';
    else accuracyBar.style.backgroundColor = '#28a745';
}

function handleGuess(letter, button) {
    if (!gameActive) return;
    button.disabled = true;
    if (selectedWord.includes(letter)) {
        if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            document.body.className = document.body.className.split(' ')[0] + ' bg-correct';
            displayWord();
        }
    } else {
        wrongGuessCount++;
        document.body.className = document.body.className.split(' ')[0] + ' bg-incorrect';
        updateWrongGuesses();
    }
    updateAccuracyChart();
}

function endGame(isWin) {
    if (!gameActive) return;
    gameActive = false;
    clearInterval(timerInterval);
    const currentTheme = document.body.className.split(' ')[0];
    setTimeout(() => {
        if (isWin) {
            document.body.className = `${currentTheme} bg-correct`;
            wordDisplay.querySelectorAll('.letter').forEach((span, i) => setTimeout(() => span.classList.add('guessed'), i * 100));
            setTimeout(() => showFinalMessage(true), 1200);
        } else {
            document.body.className = `${currentTheme} bg-incorrect`;
            showFinalMessage(false);
        }
    }, 200);
}

function showFinalMessage(isWin) {
    const totalGuesses = correctLetters.length + wrongGuessCount;
    const finalAccuracy = totalGuesses > 0 ? (correctLetters.length / totalGuesses) * 100 : 0;
    accuracyDisplay.innerText = `🎯 Your Final Accuracy: ${finalAccuracy.toFixed(1)}%`;
    finalMessage.innerText = isWin ? `🎉 Congratulations, ${playerName}! 🎉` : `💀 Game Over, ${playerName}! 💀`;
    finalMessageReveal.innerText = isWin ? `You guessed the word!` : `The word was: "${selectedWord}"`;
    finalHint.innerText = isWin ? '' : `Meaning: ${selectedHint}`;
    popupContainer.classList.add('show');
}

function updateTimer() {
    let seconds = parseInt(timerDisplay.dataset.time);
    seconds--;
    timerDisplay.innerText = `Time: ${seconds}s`;
    timerDisplay.dataset.time = seconds;
    if (seconds <= 0) endGame(false);
}

function startGame() {
    playerName = nameInput.value.trim() || 'Player';
    const selectedTheme = themeSelect.value;
    const customWordLength = parseInt(wordLengthInput.value);
    const customChances = parseInt(chancesInput.value);
    const isTimedMode = timedModeCheckbox.checked;

    let wordList = themes[selectedTheme];
    if (customWordLength >= 4 && customWordLength <= 10) {
        wordList = wordList.filter(item => item.word.length === customWordLength);
    }
    
    gameActive = true;
    maxWrongGuesses = (customChances >= 3 && customChances <= 10) ? customChances : 6;
    
    switchScreen('game-screen');
    document.body.className = `theme-${selectedTheme}`;
    welcomeMessage.innerText = `Good luck, ${playerName}!`;
    hintText.innerText = `Click the button for a hint!`;
    hintText.classList.remove('visible');
    popupContainer.classList.remove('show');
    
    clearInterval(timerInterval);
    timerDisplay.innerText = isTimedMode ? 'Time: 90s' : '';
    if (isTimedMode) {
        timerDisplay.dataset.time = 90;
        timerInterval = setInterval(updateTimer, 1000);
    }

    powerup5050Btn.style.display = (maxWrongGuesses > 5) ? 'none' : 'inline-block';
    [powerupRevealBtn, powerupRemoveBtn, powerup5050Btn, showHintBtn].forEach(btn => btn.disabled = false);

    selectNewWord(wordList);
    displayWord();
    updateWrongGuesses();
    updateAccuracyChart();
    keyboardContainer.innerHTML = '';
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(letter => {
        const keyButton = document.createElement('button');
        keyButton.innerText = letter; keyButton.className = 'key';
        keyButton.addEventListener('click', () => handleGuess(letter, keyButton));
        keyboardContainer.appendChild(keyButton);
    });
}

// --- Event Listeners for UI Flow ---
nameNextBtn.addEventListener('click', () => {
    if (nameInput.value.trim() === '') {
        alert('Please enter your name!');
    } else {
        playerName = nameInput.value.trim();
        switchScreen('instructions-screen');
    }
});
instructionsNextBtn.addEventListener('click', () => switchScreen('settings-screen'));
startButton.addEventListener('click', startGame);
playAgainButton.addEventListener('click', () => {
    popupContainer.classList.remove('show');
    switchScreen('settings-screen');
    document.body.className = '';
});

// --- Power-Up & Hint Listeners ---
showHintBtn.addEventListener('click', () => {
    if (!gameActive) return;
    hintText.innerText = `💡 Hint: ${selectedHint}`;
    hintText.classList.add('visible');
    showHintBtn.disabled = true;
});

powerupRevealBtn.addEventListener('click', () => {
    if (!gameActive) return;
    const unrevealed = selectedWord.split('').filter(letter => !correctLetters.includes(letter));
    if (unrevealed.length > 0) {
        const letterToReveal = unrevealed[Math.floor(Math.random() * unrevealed.length)];
        const keyButton = [...keyboardContainer.children].find(btn => btn.innerText === letterToReveal);
        if (keyButton) handleGuess(letterToReveal, keyButton);
    }
    powerupRevealBtn.disabled = true;
});

powerupRemoveBtn.addEventListener('click', () => {
    if (!gameActive || wrongGuessCount === 0) return;
    wrongGuessCount--;
    updateWrongGuesses();
    updateAccuracyChart();
    powerupRemoveBtn.disabled = true;
});

powerup5050Btn.addEventListener('click', () => {
    if (!gameActive) return;
    const incorrectLetters = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => !selectedWord.includes(l));
    const buttonsToDisable = [...keyboardContainer.children].filter(btn => !btn.disabled && incorrectLetters.includes(btn.innerText));
    buttonsToDisable.sort(() => 0.5 - Math.random());
    for (let i = 0; i < Math.floor(buttonsToDisable.length / 2); i++) {
        buttonsToDisable[i].disabled = true;
    }
    powerup5050Btn.disabled = true;
});

// --- Keyboard Input Listener ---
window.addEventListener('keydown', e => {
    if (gameActive) {
        const letter = e.key.toLowerCase();
        if (letter >= 'a' && letter <= 'z') {
            const keyButton = [...keyboardContainer.children].find(btn => btn.innerText === letter);
            if (keyButton && !keyButton.disabled) handleGuess(letter, keyButton);
        }
    }
});