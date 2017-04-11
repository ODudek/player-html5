require('../styles/controls.css');
require('../styles/style.css');

let $video = document.getElementById('video');
let videoSettings = [{
    width: 700,
    height: 400,
    autoplay: false,
    mute: true,
    poster: 'images/poster.jpg',
    videoSrc: './video/example.mp4',
    type: 'video/mp4'
}];
let SPACE = 32;
let ESC = 27;
let $playPauseBtn = document.getElementById('play-pause');
let $muteBtn = document.getElementById('mute');
let $fullScreenBtn = document.getElementById('full-screen');
let $seekBar = document.getElementById('seek-bar');
let $volumeBar = document.getElementById('volume-bar');
let $durMinutes = document.getElementById('dur-minutes');
let $durSeconds = document.getElementById('dur-seconds');
let $controlBar = document.getElementById('controls');
console.log($controlBar);

function initializePlayer() {
    try {
        $($video).on('timeupdate', timeUpdate);
        $($playPauseBtn).click(playPause);
        $($muteBtn).click(mute);
        $($fullScreenBtn).click(fullScreenVideo);
        $($volumeBar).on('change', volume);
        $(document).on('DOMContentLoaded', volumeDefault);
        $(document).keydown(keys);
        checkIfMuted();
        checkIfAutoplay();
        addSettings();
        seeking();
        ToggleControlBar();
    } catch (e) {
        let $player = document.getElementById('player');
        $player.innerHTML = '<h1 style="color: #1b1d25; text-align: center">Player HTML5 is not available</h1>';
        console.log('Error: ', e);
    }
}

function ToggleControlBar() {
    $($video).on('mouseenter', function () {
        $('ul').fadeIn('fast');
    })
        .on('mouseleave', function () {
            setTimeout(function () {
                $('ul').fadeOut('fast');
            }, 4000);
        })
}

function seeking() {
    let isSeeking = false;
    $($seekBar).on('mousedown', function () {
        isSeeking = true;
        if (isSeeking) {
            pause();
            $($seekBar).on('change', seek);
        }
    });
    $($seekBar).on('mouseup', function () {
        play();
    });
}
function play() {
    $playPauseBtn.setAttribute('class', 'pause button');
    $video.play();
}

function pause() {
    $playPauseBtn.setAttribute('class', 'play button');
    $video.pause();
}

function playPause() {
    let $playPauseBtnClass = $playPauseBtn.getAttribute('class');
    $playPauseBtnClass == 'play button' ? play() : pause()
}

function mute() {
    if ($video.muted == false) {
        muted();
        $video.muted = true;
    } else {
        let lastVolume = localStorage.getItem('volume');
        $volumeBar.value = lastVolume;
        notMuted();
        return lastVolume;
    }
}

function fullScreen() {
    $fullScreenBtn.setAttribute('class', 'full-screen-on button');
    $video.webkitRequestFullscreen();
}

function exitFullScreen() {
    $fullScreenBtn.setAttribute('class', 'full-screen-off button');
    document.webkitExitFullscreen();
}

function fullScreenVideo() {
    let $fullScreenBtnClass = $fullScreenBtn.getAttribute('class');
    $fullScreenBtnClass == 'full-screen-off button' ? fullScreen() : exitFullScreen();
}

function seek(time) {
    time = $video.duration * ($seekBar.value / 100);
    time = parseInt(time);
    $video.currentTime = time;
}

function timeUpdate(value) {
    value = $video.currentTime * (100 / $video.duration);
    $seekBar.value = value;
    let durationValue = $video.currentTime;
    let minutes = parseInt(durationValue / 60);
    let seconds = parseInt(durationValue % 60);
    displayTime(minutes, seconds);
    checkIfEnded();
}

function checkIfEnded() {
    let duration = $video.duration;
    let currentTime = $video.currentTime;
    if (duration == currentTime) {
        $playPauseBtn.setAttribute('class', 'play button');
    }
}

function displayTime(minutes, seconds) {
    minutes < 10 ? $durMinutes.innerHTML = '0' + minutes + ':' : $durMinutes.innerHTML = minutes + ':';
    seconds < 10 ? $durSeconds.innerHTML = '0' + seconds : $durSeconds.innerHTML = seconds;
}

function volume() {
    $($video).prop('volume', updateVolume);
}

function muted() {
    $muteBtn.setAttribute('class', 'mute button');
    $volumeBar.value = 0;
}

function notMuted() {
    $muteBtn.setAttribute('class', 'unmute button');
    $video.removeAttribute('muted');
}

function checkIfMuted() {
    videoSettings[0].mute == true ? mute() : notMuted();
}

function updateVolume() {
    $video.muted = false;
    $muteBtn.setAttribute('class', 'unmute button');
    let volume = $volumeBar.value;
    volume = volume / 100;
    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('volume', volume * 100);
    } else {
        alert('Twoja przegladarka nie wspiera LocalStorage');
    }
    if (volume == 0) {
        $muteBtn.setAttribute('class', 'mute button');
    }
    return volume;
}

function volumeDefault() {
    if (typeof(Storage) !== 'undefined') {
        localStorage.setItem('volume', '100');
    } else {
        alert('Twoja przegladarka nie wspiera LocalStorage');
    }
}

function checkIfAutoplay() {
    videoSettings[0].autoplay == true ? $playPauseBtn.setAttribute('class', 'pause button') :
        $video.removeAttribute('autoplay');
}

function keys(e) {
    switch (e.keyCode) {
        case SPACE:
            playPause();
            break;
        case ESC:
            e.preventDefault();
            exitFullScreen();
            break;
    }
}

function addSettings() {
    let $source = document.createElement('source');
    $($video).attr('width', videoSettings[0].width);
    $($video).attr('height', videoSettings[0].height);
    $('.custom-video').width(videoSettings[0].width).height(videoSettings[0].height);
    $($video).attr('autoplay', videoSettings[0].autoplay);
    $($video).attr('muted', videoSettings[0].mute);
    $($video).attr('poster', videoSettings[0].poster);
    $($source).attr('type', videoSettings[0].type);
    $($source).attr('src', videoSettings[0].videoSrc);
    $($video).append($source);
}

initializePlayer();
