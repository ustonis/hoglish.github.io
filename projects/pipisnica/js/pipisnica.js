class Game {
    constructor() {
        this.russianAlphabet = [
            'а', 'б', 'в', 'г', 'д', 'е', 'ё', 'ж', 'з', 'и', 
            'й', 'к', 'л', 'м', 'н', 'о', 'п', 'р', 'с', 'т', 
            'у', 'ф', 'х', 'ц', 'ч', 'ш', 'щ', 'ъ', 'ы', 'ь', 
            'э', 'ю', 'я'
        ];
        
        this.word = localStorage.getItem('currentWord') || '';
        this.theme = localStorage.getItem('currentTheme') || '';
        this.hiddenWord = [];
        this.usedLetters = new Set(JSON.parse(localStorage.getItem('usedLetters')) || []);
        this.maxAttempts = 12;
        this.attemptsLeft = parseInt(localStorage.getItem('remainingAttempts')) || this.maxAttempts;
        this.kuni = this.word.split('');
        this.anus = new Array(this.kuni.length).fill("-");
    }

    start() {
        this.initWord();
        this.renderAlphabet();
        this.updateWordDisplay();
        this.updateHangman();
    }

    initWord() {
        // Проверяем уже угаданные буквы
        this.kuni.forEach((letter, index) => {
            if (this.usedLetters.has(letter)) {
                this.anus[index] = letter;
            }
        });
    }

    renderAlphabet() {
        const vocabContainer = document.getElementById("vocablary");
        vocabContainer.innerHTML = '';
        
        this.russianAlphabet.forEach(letter => {
            const button = document.createElement("button");
            button.className = "noClickLetter";
            button.innerText = letter;
            button.id = `letter-${letter}`;
            
            if (this.usedLetters.has(letter)) {
                button.disabled = true;
                button.style.backgroundColor = this.word.includes(letter) ? "green" : "red";
                button.style.color = "white";
            }
            
            button.onclick = () => this.checkLetter(letter, button);
            vocabContainer.appendChild(button);
        });
    }

    checkLetter(letter, element) {
        if (this.usedLetters.has(letter)) return;
        
        this.usedLetters.add(letter);
        localStorage.setItem('usedLetters', JSON.stringify(Array.from(this.usedLetters)));
        
        let letterFound = false;
        let jo = 0;
        
        for (let i = 0; i < this.kuni.length; i++) {
            if (letter === this.kuni[i]) {
                this.anus[i] = letter;
                letterFound = true;
                jo++;
            }
        }
        
        if (letterFound) {
            element.style.backgroundColor = "green";
            element.style.color = "white";
            element.disabled = true;
            this.updateWordDisplay();
        } else {
            element.style.backgroundColor = "red";
            element.style.color = "white";
            element.disabled = true;
            this.attemptsLeft--;
            localStorage.setItem('remainingAttempts', this.attemptsLeft.toString());
            this.updateHangman();
        }
        
        if (!letterFound && this.attemptsLeft-1 <= 0) {
            this.endGame(false);
            return;
        }
        
        if (this.anus.join("") === this.kuni.join("")) {
            this.endGame(true);
        }
    }

    updateWordDisplay() {
        const wordElement = document.getElementById("word_");
        wordElement.innerHTML = '';
        this.anus.forEach(letter => {
            wordElement.innerHTML += letter;
        });
    }

    updateHangman() {
        const wrongAttempts = this.maxAttempts - this.attemptsLeft;
        for (let i = 1; i <= wrongAttempts; i++) {
            const part = document.getElementById(`pi${i}`);
            if (part) part.style.display = "block";
        }
    }

    endGame(isWin) {     
        setTimeout(() => {
            if (isWin) {
                alert("🎉 Поздравляем! Вы отгадали слово: " + this.word);
            } else {
                alert("💀 Игра окончена! Загаданное слово: " + this.word);
            }
            
            localStorage.removeItem('currentWord');
            localStorage.removeItem('currentTheme');
            localStorage.removeItem('remainingAttempts');
            localStorage.removeItem('usedLetters');
            window.location.href = "choiseTheme.html";
        }, 500);
    }
}


// Инициализация игры при загрузке
document.addEventListener('DOMContentLoaded', () => {
    const game = new Game();
    game.start();
    
    // Кнопка назад
    const backButton = document.getElementById("backToChoise");
    if (backButton) {
        backButton.addEventListener('click', () => {
            localStorage.removeItem('currentWord');
            localStorage.removeItem('currentTheme');
            localStorage.removeItem('remainingAttempts');
            localStorage.removeItem('usedLetters');
            window.location.href = "choiseTheme.html";
        });
    }
});