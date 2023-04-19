import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
iframe.src = 'https://player.vimeo.com/video/236203659';
iframe.width = '640';
iframe.height = '360';
iframe.allowfullscreen;
iframe.frameborder = '0';
iframe.allow = 'autoplay; encrypted-media';

const player = new Player(iframe);

let timerId;

//ВИКОРИСТАННЯ setInterval()======

// player.on('play', playPlayer);
// player.on('pause', pausePlayer);

//and використання setInterval()===

//ВИКОРИСТАННЯ throttle=========

player.on('timeupdate',throttle(function () {getTimeVideo();}, 1000)
);
// and використання throttle==============

function playPlayer() {
  timerId = setInterval(() => {
    getTimeVideo();
  }, 1000);
}

function getTimeVideo() {
  player
    .getCurrentTime()
    .then(seconds => {
      localStorage.setItem('videoplayer-current-time', seconds);
    })
    .catch(function (error) {
      // an error occurred
    });
}

function getTimeLocalStorage() {
  return localStorage.getItem('videoplayer-current-time')
    ? localStorage.getItem('videoplayer-current-time')
    : 0;
}

player
  .setCurrentTime(Number(getTimeLocalStorage()))
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

function pausePlayer() {
  player
    .pause()
    .then(function () {
      clearTimeout(timerId); // зупиняяємо setTimeout
    })
    .catch(function (error) {
      switch (error.name) {
        case 'PasswordError':
          // the video is password-protected and the viewer needs to enter the
          // password first
          break;

        case 'PrivacyError':
          // the video is private
          break;

        default:
          // some other error occurred
          break;
      }
    });
}
