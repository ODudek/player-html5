# Simple HTML5 player
Simple player in html5 in JS

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
