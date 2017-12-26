import path from 'path';
require('./styles.scss');

require.context("./assets/sounds", false, /\.wav$/);
require.context("./assets/img", false, /\.jpeg$/);

const SOUND = path.resolve(__dirname, './sounds');
const sounds = {
  1: {
    path: `${SOUND}/bird1.wav`,
    keyID: 65,
    name: 'Bird',
    keyName: 'A'
  },
  2: {
    path: `${SOUND}/bird2.wav`,
    keyID: 83,
    name: 'Woodpecker',
    keyName: 'S'
  },
  3: {
    path: `${SOUND}/bird3.wav`,
    keyID: 68,
    name: 'Bird 2',
    keyName: 'D'
  },
  4: {
    path: `${SOUND}/lake.wav`,
    keyID: 70,
    name: 'Lake',
    keyName: 'F'
  },
  5: {
    path: `${SOUND}/owl1.wav`,
    keyID: 71,
    name: 'Owl',
    keyName: 'G'
  },
  6: {
    path: `${SOUND}/water1.wav`,
    keyID: 72,
    name: 'Water',
    keyName: 'H'
  },
  7: {
    path: `${SOUND}/wind1.wav`,
    keyID: 74,
    name: 'Wind',
    keyName: 'J'
  },


}
function initApp(){
  initKeyboard();
  initSounds();
  const keys = document.querySelectorAll('.key');
  const keysArr = [].slice.call(keys);
  keysArr.forEach(keyEl => {
    keyEl.addEventListener('transitionend', endTransition);
  });
  window.addEventListener('keydown', playSoundKey);
}

function initKeyboard() {
  const visualKeyboard = document.querySelector('div.keys');
  for(let i = 0; i < Object.keys(sounds).length; i++){
    const newKey = document.createElement('div');
    const kbd = document.createElement('kbd');
    const sound = document.createElement('span');
    newKey.className = 'key';
    sound.className = 'sound';
    sound.textContent = Object.values(sounds)[i].name;
    kbd.textContent = Object.values(sounds)[i].keyName;
    newKey.dataset.key = Object.values(sounds)[i].keyID;
    /*Append elements to DOM*/
    newKey.appendChild(kbd);
    newKey.appendChild(sound);
    visualKeyboard.appendChild(newKey);
  }
}
function initSounds() {
let body = document.querySelector('body');
  for(let i = 0; i < Object.keys(sounds).length; i++){
    const newAudio = document.createElement('audio');
    newAudio.src = Object.values(sounds)[i].path;
    console.log(newAudio.src);
    newAudio.dataset.key = Object.values(sounds)[i].keyID;
    body.appendChild(newAudio);
  }
}

function playSoundKey(e) {
  const audioEl = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const keyEl = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const volumeEl = document.querySelector("input.volume-changer");
  if (!audioEl)
    return;
  audioEl.currentTime = 0;
  audioEl.volume = volumeEl.value;
  audioEl.play();
  keyEl.style.transitionDuration = `${audioEl.duration * 0.5}s`;
  keyEl.classList.add('started');
  const fadePoint = audioEl.duration * 0.6;
  let fadeAudio = setInterval(function () {

        // Only fade if past the fade out point or not at zero already
        if ((audioEl.currentTime >= fadePoint) && (audioEl.volume != 0.0)) {
            audioEl.volume -= 0.1;
        }
        // When volume at zero stop all the intervalling
        if (audioEl.volume === 0.0) {
            clearInterval(fadeAudio);
        }
    }, 200);
}

function endTransition(e) {
  this.classList.remove('started');
}


window.onload = initApp;
