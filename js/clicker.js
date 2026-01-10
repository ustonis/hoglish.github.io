var textNumberOfClicks = document.getElementById("clicker__main--text");
var clickButton = document.getElementById("clicker__main--button");
var clickSound = new Audio('assets/audio/ah_sound.mp3');

window.addEventListener('DOMContentLoaded', function() {
    updateNumberOfClicks();
    if (clickButton) {
        clickButton.addEventListener('click', doClick);
    }
});


function updateNumberOfClicks(){
    let count = parseInt(localStorage.getItem('clickerCount')) || 0;
    textNumberOfClicks.textContent = `На вашем счету ${count} кликов`;
}


function doClick(){
    let counter = parseInt(localStorage.getItem('clickerCount')) || 0;
    counter++;
    localStorage.setItem('clickerCount', counter);
    clickSound.currentTime = 0; 
    clickSound.play().catch(e => console.log("Автозапуск звука заблокирован"));
    updateNumberOfClicks();
}

