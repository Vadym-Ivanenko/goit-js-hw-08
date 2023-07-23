import throttle from 'lodash.throttle';
import Player from '@vimeo/player';
const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_VIDEOPLAYER_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  // data is an object containing properties specific to that event
  localStorage.setItem(LOCALSTORAGE_VIDEOPLAYER_KEY, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));
window.addEventListener('DOMContentLoaded', onGotoTheLastView);

function onGotoTheLastView() {
  const seconds = localStorage.getItem(LOCALSTORAGE_VIDEOPLAYER_KEY);
  player
    .setCurrentTime(seconds)
    .then(function (seconds) {
      // seconds = the actual time that the player seeked to
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          // the time was less than 0 or greater than the video’s duration
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
