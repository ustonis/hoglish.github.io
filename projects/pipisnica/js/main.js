class ThemeManager {
    static themes = {
        information: [
            "данные", "файл", "код", "база", "сеть", "знание", "запись", "бит", "бита", "цифра",
            "знак", "сигнал", "поток", "память", "диск", "носитель", "вывод", "ввод", "доступ", "поиск"
        ],
        
        phylosophy: [ 
            "ум", "дух", "бытие", "смысл", "форма", "идея", "материя", "бог", "добро", "зло",
            "истина", "ложь", "знание", "вера", "разум", "чувство", "этика", "мораль", "нрав", "свобода"
        ],
        
        math: [
            "число", "цифра", "счет", "ряд", "сумма", "разность", "произведение", "частное", "доля", "дробь",
            "числитель", "знаменатель", "делитель", "делимое", "остаток", "модуль", "степень", "корень", "квадрат", "куб"
        ],
        
        biology: [
            "рост", "пубертат", "гормон", "тестостерон", "эстроген", "прогестерон", "гипофиз", "гипоталамус", "пол", "ген",
            "хромосома", "днк", "рнк", "геном", "белок", "фермент", "рецептор", "клетка", "митоз", "мейоз"
        ],
        
        sleng: [
            "краш", "чилить", "рофлить", "кринж", "кринжово", "агриться", "вайб", "вайбовать", "омлет", "шазам",
            "бангер", "эщкере", "зашквар", "хайп", "хайпить", "рил", "рил ток", "пон", "ноу пон", "скилл"
        ]
    };

    static getAvailableThemes() {
        return Object.keys(this.themes);
    }

    static getThemeWords(themeName) {
        return [...this.themes[themeName]] || [];
    }

    static getRandomTheme(selectedThemes) {
        if (!selectedThemes || selectedThemes.length === 0) {
            const allThemes = this.getAvailableThemes();
            return allThemes[Math.floor(Math.random() * allThemes.length)];
        }
        return selectedThemes[Math.floor(Math.random() * selectedThemes.length)];
    }

    static getThemeDisplayName(theme) {
        const themeNames = {
            information: "Информационные технологии",
            phylosophy: "Философия",
            math: "Математика",
            biology: "Биология",
            sleng: "Современный сленг"
        };
        return themeNames[theme] || theme;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Показываем темы на странице
    showThemesOnPage();
});


function showThemesOnPage() {
    const container = document.getElementById("container");
    if (!container) {
        console.error("Элемент с id 'container' не найден");
        return;
    }
    
    container.innerHTML = '';
    
    // Получаем все доступные темы
    const availableThemes = ThemeManager.getAvailableThemes();
    
    // Создаем элементы для каждой темы
    availableThemes.forEach(themeKey => {
        const themeDisplayName = ThemeManager.getThemeDisplayName(themeKey);
        const wordCount = ThemeManager.getThemeWords(themeKey).length;
        
        const themeElement = document.createElement('div');
        themeElement.className = 'theme-item';
        themeElement.innerHTML = `
            <label class="theme-label">
                <input type="checkbox" 
                       id="${themeKey}" 
                       class="theme-checkbox" 
                       value="${themeKey}"
                       >
                ${themeDisplayName}
                <span class="theme-word-count">
                    (${wordCount} слов)
                </span>
            </label>
        `;
        
        container.appendChild(themeElement);
    });
}

// Функция для получения выбранных тем
function getSelectedThemes() {
    const checkboxes = document.querySelectorAll('.theme-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Функция для получения всех слов из выбранных тем
function getAllWordsFromSelectedThemes() {
    const selectedThemes = getSelectedThemes();
    let allWords = [];
    
    selectedThemes.forEach(themeKey => {
        const themeWords = ThemeManager.getThemeWords(themeKey);
        allWords = allWords.concat(
            themeWords.map(word => ({
                word: word,
                theme: themeKey,
                displayTheme: ThemeManager.getThemeDisplayName(themeKey)
            }))
        );
    });
    
    return allWords;
}

// Функция для получения случайного слова из ВСЕХ выбранных тем
function getRandomWordFromAllSelected() {
    const allWords = getAllWordsFromSelectedThemes();
    
    if (allWords.length === 0) {
        alert("Пожалуйста, выберите хотя бы одну тему!");
        return null;
    }
    
    // Возвращаем случайное слово из всех доступных слов в выбранных темах
    return allWords[Math.floor(Math.random() * allWords.length)];
}








const startButton = document.getElementById('start-button');

// Добавляем обработчик клика
startButton.addEventListener('click', function() {
    // Получаем выбранные темы
    const selectedThemes = getSelectedThemes();
    
    // Проверяем, что выбрана хотя бы одна тема
    if (selectedThemes.length === 0) {
        alert('Выберите хотя бы одну тему, осел!');
        return;
    }
    
    // Получаем все слова из выбранных тем
    const allWords = getAllWordsFromSelectedThemes();
    
    // Выбираем случайное слово
    const randomIndex = Math.floor(Math.random() * allWords.length);
    const selectedWordData = allWords[randomIndex];
    
    // Сохраняем данные для игры
    localStorage.setItem('currentWord', selectedWordData.word);
    localStorage.setItem('currentTheme', selectedWordData.theme);
    localStorage.setItem('remainingAttempts', '12');
    localStorage.setItem('usedLetters', JSON.stringify([]));
    
    // Перенаправляем на страницу игры
    window.location.href = 'pipisnica.html';
});

// Функция для получения выбранных тем
function getSelectedThemes() {
    const checkboxes = document.querySelectorAll('.theme-checkbox:checked');
    return Array.from(checkboxes).map(checkbox => checkbox.value);
}

// Функция для получения всех слов из выбранных тем
function getAllWordsFromSelectedThemes() {
    const selectedThemes = getSelectedThemes();
    let allWords = [];
    
    selectedThemes.forEach(themeKey => {
        const themeWords = ThemeManager.getThemeWords(themeKey);
        allWords = allWords.concat(
            themeWords.map(word => ({
                word: word,
                theme: themeKey,
                displayTheme: ThemeManager.getThemeDisplayName(themeKey)
            }))
        );
    });
    
    return allWords;
}

const backButton = document.getElementById("backToMainList");
    if (backButton) {
        backButton.addEventListener('click', () => {
            localStorage.removeItem('currentWord');
            localStorage.removeItem('currentTheme');
            localStorage.removeItem('remainingAttempts');
            localStorage.removeItem('usedLetters');
            window.location.href = "../../index.html";
        });
    }




