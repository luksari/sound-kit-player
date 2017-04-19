window.addEventListener('keydown', function(e) {
    const audioEl = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const keyEl = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audioEl)
        return;
    audioEl.currentTime = 0;
    audioEl.play();
    keyEl.style.transitionDuration = `${audioEl.duration * 0.5}s`;
    keyEl.classList.add('playing');
});

function removeTransition(e) {

    this.classList.remove('playing');

}

const keys = document.querySelectorAll('.key');
keys.forEach(keyEl => {
    keyEl.addEventListener('transitionend', removeTransition);
});
