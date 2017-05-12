(function (){
  'use strict';
  function playSoundKey(e) {
    const audioEl = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const keyEl = document.querySelector(`.key[data-key="${e.keyCode}"]`);
    if (!audioEl)
      return;
    audioEl.currentTime = 0;
    audioEl.play();
    keyEl.style.transitionDuration = `${audioEl.duration * 0.5}s`;
    keyEl.classList.add('started');
  }

  window.addEventListener('keydown', playSoundKey);

  function endTransition(e) {
    this.classList.remove('started');
  }

  var keys = document.querySelectorAll('.key');
  var keysArr = [].slice.call(keys);
  keysArr.forEach(keyEl => {
    keyEl.addEventListener('transitionend', endTransition);
  });
})();
