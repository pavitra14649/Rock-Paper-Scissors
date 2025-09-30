let userScore = 0;
let computerScore = 0;
let isPlaying = false;

const choiceEmojis = {
    rock: '🪨',
    paper: '📄',
    scissors: '✂️'
};

const choiceNames = {
    rock: 'Rock',
    paper: 'Paper',
    scissors: 'Scissors'
};

function play(userChoice) {
    if (isPlaying) return;
    
    isPlaying = true;
    
    // Add visual feedback to selected button
    const selectedBtn = document.querySelector(`[data-choice="${userChoice}"]`);
    selectedBtn.classList.add('selected');
    
    // Disable all buttons during animation
    document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.add('disabled'));
    
    // Show countdown
    showCountdown(() => {
        const choices = ['rock', 'paper', 'scissors'];
        const computerChoice = choices[Math.floor(Math.random() * 3)];
        
        // Show player choice immediately
        const playerChoiceEl = document.getElementById('player-choice');
        playerChoiceEl.textContent = choiceEmojis[userChoice];
        playerChoiceEl.classList.add('animate');
        
        // Animate computer choice selection
        animateComputerChoice(() => {
            const computerChoiceEl = document.getElementById('computer-choice');
            computerChoiceEl.textContent = choiceEmojis[computerChoice];
            computerChoiceEl.classList.add('animate');
            
            // Determine winner and update score
            setTimeout(() => {
                const result = determineWinner(userChoice, computerChoice);
                updateScore(result);
                displayResult(result, userChoice, computerChoice);
                
                // Re-enable buttons and reset state
                setTimeout(() => {
                    selectedBtn.classList.remove('selected');
                    document.querySelectorAll('.choice-btn').forEach(btn => btn.classList.remove('disabled'));
                    playerChoiceEl.classList.remove('animate');
                    computerChoiceEl.classList.remove('animate');
                    isPlaying = false;
                }, 1000);
            }, 500);
        });
    });
}

function showCountdown(callback) {
    const countdownEl = document.getElementById('countdown');
    let count = 3;
    
    const countInterval = setInterval(() => {
        if (count > 0) {
            countdownEl.textContent = count;
            countdownEl.classList.add('animate');
            
            setTimeout(() => {
                countdownEl.classList.remove('animate');
            }, 300);
            
            count--;
        } else {
            countdownEl.textContent = 'GO!';
            countdownEl.classList.add('animate');
            
            setTimeout(() => {
                countdownEl.textContent = '';
                countdownEl.classList.remove('animate');
                clearInterval(countInterval);
                callback();
            }, 500);
        }
    }, 800);
}

function animateComputerChoice(callback) {
    const computerChoiceEl = document.getElementById('computer-choice');
    const choices = ['🪨', '📄', '✂️'];
    let animationCount = 0;
    const maxAnimations = 8;
    
    const animationInterval = setInterval(() => {
        computerChoiceEl.textContent = choices[Math.floor(Math.random() * 3)];
        animationCount++;
        
        if (animationCount >= maxAnimations) {
            clearInterval(animationInterval);
            callback();
        }
    }, 100);
}

function determineWinner(userChoice, computerChoice) {
    if (userChoice === computerChoice) {
        return 'draw';
    } else if (
        (userChoice === 'rock' && computerChoice === 'scissors') ||
        (userChoice === 'paper' && computerChoice === 'rock') ||
        (userChoice === 'scissors' && computerChoice === 'paper')
    ) {
        return 'win';
    } else {
        return 'lose';
    }
}

function updateScore(result) {
    const userScoreEl = document.getElementById('user-score');
    const computerScoreEl = document.getElementById('computer-score');
    const userScoreCard = document.querySelector('.score-card.player');
    const computerScoreCard = document.querySelector('.score-card.computer');
    
    if (result === 'win') {
        userScore++;
        userScoreEl.textContent = userScore;
        userScoreCard.classList.add('winner');
        setTimeout(() => userScoreCard.classList.remove('winner'), 600);
    } else if (result === 'lose') {
        computerScore++;
        computerScoreEl.textContent = computerScore;
        computerScoreCard.classList.add('winner');
        setTimeout(() => computerScoreCard.classList.remove('winner'), 600);
    }
}

function displayResult(result, userChoice, computerChoice) {
    const resultEl = document.getElementById('result');
    let message = '';
    let className = '';
    
    if (result === 'draw') {
        message = `It's a draw! Both chose ${choiceNames[userChoice]} ${choiceEmojis[userChoice]}`;
        className = 'draw';
    } else if (result === 'win') {
        message = `🎉 You win! ${choiceNames[userChoice]} ${choiceEmojis[userChoice]} beats ${choiceNames[computerChoice]} ${choiceEmojis[computerChoice]}`;
        className = 'win';
    } else {
        message = `😔 You lose! ${choiceNames[computerChoice]} ${choiceEmojis[computerChoice]} beats ${choiceNames[userChoice]} ${choiceEmojis[userChoice]}`;
        className = 'lose';
    }
    
    // Clear previous classes
    resultEl.classList.remove('win', 'lose', 'draw');
    
    // Add new class and message
    resultEl.textContent = message;
    resultEl.classList.add(className);
}

function resetGame() {
    userScore = 0;
    computerScore = 0;
    
    document.getElementById('user-score').textContent = '0';
    document.getElementById('computer-score').textContent = '0';
    document.getElementById('player-choice').textContent = '❓';
    document.getElementById('computer-choice').textContent = '❓';
    document.getElementById('result').textContent = 'Choose your weapon!';
    document.getElementById('result').classList.remove('win', 'lose', 'draw');
    document.getElementById('countdown').textContent = '';
    
    // Reset any animations
    document.querySelectorAll('.choice-btn').forEach(btn => {
        btn.classList.remove('selected', 'disabled');
    });
    
    isPlaying = false;
}

// Add some fun sound effects (optional - requires audio files)
function playSound(type) {
    // You can add audio files and play them here
    // const audio = new Audio(`sounds/${type}.mp3`);
    // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Initialize the game
document.addEventListener('DOMContentLoaded', () => {
    resetGame();
});
