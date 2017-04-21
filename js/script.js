
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
// function playSoundTouch(e) {
//   let keyEl = e.target;
//   if (keyEl.nodeName == "SPAN" || keyEl.nodeName == "KBD")
//     keyEl = keyEl.parentElement;
//
//   const audioEl = document.querySelector(`audio[data-key="${keyEl.getAttribute("data-key")}"]`);
//
//   const soundSprite = [
//     {
//       start: 0,
//       end: 3000
//     }, {
//       start: 3500,
//       end: 6789
//     }
//   ];
//   function playSoundFile(idx) {
//     audioEl.currentPosition = soundSprite[idx].start;
//     var x = setInterval(function() {
//       if (audioEl.currentPosition >= soundSprite[idx].end) {
//         audioEl.pause();
//         clearInterval(x);
//       }
//     }, 50);
//   }
//
//   if (!audioEl)
//     return;
//   audioEl.currentTime = 0;
//   audioEl.play();
//   playSoundFile(0);
//   keyEl.style.transitionDuration = `${audioEl.duration * 0.5}s`;
//   keyEl.classList.add('playing');
//
// }

window.addEventListener('keydown', playSoundKey, false);

function endTransition(e) {
  this.classList.remove('started');
}

const keys = document.querySelectorAll('.key');
keys.forEach(keyEl => {
  // keyEl.addEventListener('touchstart', playSoundTouch, false);
  keyEl.addEventListener('transitionend', endTransition, false);
});
