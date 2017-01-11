let SPACE = 32;
let $playPauseBtn = document.getElementById('play-pause');
let $muteBtn = document.getElementById('mute');
let $fullScreenBtn = document.getElementById('full-screen');
let $seekBar = document.getElementById('seek-bar');
let $volumeBar = document.getElementById('volume-bar');
let $durMinutes = document.getElementById('dur-minutes');
let $durSeconds = document.getElementById('dur-seconds');
let $controls = document.getElementById('controls');

function initializePlayer() {
    $($seekBar).on('change', seek);
    $($video).on('timeupdate', timeUpdate);
    $($playPauseBtn).click(playPause);
    $($muteBtn).click(mute);
    $($fullScreenBtn).click(fullScreen);
    $($volumeBar).on('change', volume);
    $(document).on('DOMContentLoaded', volumeDefault);
    $($controls).hover(showBar, hideBar);
    $(document).keydown(keys);
    addSettings();
    checkIfMuted();
    checkIfAutoplay();
}

function playPause() {
    let $playPauseBtnClass = $playPauseBtn.getAttribute('class');
    if ($playPauseBtnClass == 'play button') {
        $playPauseBtn.setAttribute('class', 'pause button');
        $video.play();
    }
    else {
        $playPauseBtn.setAttribute('class', 'play button');
        $video.pause();
    }
}


function mute() {
    if ($video.muted == false) {
        $muteBtn.setAttribute('class', 'mute button');
        $volumeBar.value = 0;
        $video.muted = true;
    } else {
        $muteBtn.setAttribute('class', 'unmute button');
        if (typeof(Storage) !== 'undefined') {
            let lastVolume = localStorage.getItem('volume');
            $volumeBar.value = lastVolume;
            $video.muted = false;
            return lastVolume;
        } else {
            alert('Twoja przegladarka nie wspiera LocalStorage');
        }

    }
}

function fullScreen() {
    let $fullScreenBtnClass = $fullScreenBtn.getAttribute('class');
    if ($fullScreenBtnClass == 'full-screen-off button') {
        $fullScreenBtn.setAttribute('class', 'full-screen-on button');
        $video.webkitRequestFullscreen();
    } else {
        $fullScreenBtn.setAttribute('class', 'full-screen-off button');
        document.webkitExitFullscreen();
    }
}

function seek(time) {
    time = $video.duration * ($seekBar.value / 100);
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
    if (minutes < 10) {
        $durMinutes.innerHTML = '0' + minutes + ':';
    } else {
        $durMinutes.innerHTML = minutes + ':';
    }
    if (seconds < 10) {
        $durSeconds.innerHTML = '0' + seconds;
    } else {
        $durSeconds.innerHTML = seconds;
    }
}

function volume() {
    $($video).prop('volume', updateVolume);
}

function checkIfMuted() {
    if (videoSettings[0].mute == true) {
        $muteBtn.setAttribute('class', 'mute button');
        $volumeBar.value = 0;
    } else {
        $muteBtn.setAttribute('class', 'unmute button');
        $video.removeAttribute('muted');
    }
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
    if (videoSettings[0].autoplay == true) {
        $playPauseBtn.setAttribute('class', 'pause button');
    } else {
        $video.removeAttribute('autoplay');
    }
}

function hideBar() {
    $($controls).animate({
        opacity: 0
    })
}

function showBar() {
    $($controls).animate({
        opacity: 1
    })
}

function keys(e) {
    switch (e.keyCode) {
        case SPACE:
            let $playPauseBtnClass = $playPauseBtn.getAttribute('class');
            if ($playPauseBtnClass == 'play button') {
                $playPauseBtn.setAttribute('class', 'pause button');
                $video.play();
            }
            else {
                $playPauseBtn.setAttribute('class', 'play button');
                $video.pause();
            }
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
