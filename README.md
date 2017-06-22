[![Stories in Ready](https://badge.waffle.io/ODudek/player-html5.png?label=ready&title=Ready)](https://waffle.io/ODudek/player-html5?utm_source=badge)
# Simple HTML5 player
Simple player in html5 and JS

#Changlelog 
### 1.0.1  

1. Added
    - Better way to hide and show controls bar (need a little work on that)
    - `Timeout` = 5 seconds for controls bar
    - `$($controls).clearQueue();` to avoid situation that controls bar animate few times without any event

2. Bugs
    - Seeking isn't working every time, because of `timeupdate`. When we will try to seek and `timeupdate` will change at the same time, seeking won't work
    - After exit fullscreen by `ESC` icon of fullscreen doesn't change (Probably because of default settings of browser)

3. TODO
    - Fix bugs
    - Add styles for every browser (Safari, Firefox, Opera, IE)
    
### 1.0.2

1. Added
    - Tests by jasmine (It's only beginning)
    - Removed icon of fullscreen (In fullscreen and miniplayer icon is the same)
    - Used ternary operator and replaced some `if` statements
2. Bugs
    - Seeking isn't working every time, because of `timeupdate`. When we will try to seek and `timeupdate` will change at the same time, seeking won't work
    - Player does not support other browsers
3. TODO
    - Add autoplay after end of video
    - Add buffer bar
    
### 1.0.3

1. Added
    - Removed tests by jasmine
    - Added `webpack`
    - Hiding control bar 
    - seeking fix 
    
    
