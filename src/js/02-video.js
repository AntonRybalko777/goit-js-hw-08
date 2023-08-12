import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const key = 'videoplayer-current-time';

player.on('timeupdate', throttle(handlerTimeUpdate, 1000));

function handlerTimeUpdate(evt) {
  localStorage.setItem(key, evt.seconds);
}

player.setCurrentTime(localStorage.getItem(key) ?? 0);
