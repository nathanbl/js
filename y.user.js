// ==UserScript==
// @name Y
// @version 2.0
// @run-at         document-start
// @include https://m.youtube.com/*
// ==/UserScript==

var MOVIE_NAME = [
    ['gười đà', 180, 100],
    ['ọ lem th', 180, 100]
]

var CHANNEL_NAME = [
    ['ười vi ', 5, 0],
    ['gon tv 5 ', 20, 0],
    ['ews 577', 38, 0],
]

function insertAfter(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
}
function insertBefore(el, referenceNode) {
    referenceNode.parentNode.insertBefore(el, referenceNode);
}
var _url = location.href
var isKeyDown = false;
var isForcePause = false;
var qualities = ['hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny', 'auto'];
function _checkNum(n) {
    if (!n) {
        return false;
    }
    if (n == 'NaN') {
        return false;
    }
    return true
}
//document.addEventListener("DOMContentLoaded", function() {
window.p = null;
window.vid = null;
window.my_played = '0';
window.dur = 0
var i___1, i___2;
var video_width, video_height, video_css, video_css_debug;
var video_getPlayer_iv = 5 * 1000
var video_currentCheck_iv = 1 * 1000

/*
var video_height = 'height:720px;width:1280px;'
var video_height = 'height:1080px;width:1920px;'
var video_height = 'height:1050px;width:1867px;'*/
var isOldPlayer = false;

function getPlayer() {
    window.p = document.getElementById('movie_player') ||
        document.getElementById('movie_player-flash');
    if(window.p) {
        isOldPlayer = true;
        window.vid = window.p.querySelector('video')
        console.log('window.vid', window.vid)
    } else {
        window.p = document.querySelector('#player video')
        window.vid = window.p
    }
    // console.log(window.p)
    _url = location.href
}
function getPlayerDesk() {
    window.p = document.getElementById('movie_player') ||
        document.getElementById('movie_player-flash');
    if(window.p) window.vid = window.p.querySelector('video')
    // console.log(window.p)
    _url = location.href
}
function startPlayer() {
    if (_url.indexOf('watch?') == -1) {
        return;
    }
    if (!window.vid || !window.vid.src) {
        console.log('not found video')
        var playButton = document.querySelector('.ytp-cued-thumbnail-overlay .ytp-button')
        if (playButton) {
            console.log('playButton', playButton)
            playButton.click()
        }
        return;
    }
    console.log('startPlayer window.my_played', window.my_played, window.vid.src)
    if (!window.vid.src) return;
    if (window.my_played == window.vid.src) {
        console.log('startPlayer old')
        if (window.vid.paused) {
            //window.vid.play()
        }
        return;
    }
    console.log('startPlayer new')
    
    var data = null
    var title = document.title
    if (isOldPlayer) {
        data = window.p.getVideoData()
        title = data['title']
        title = '@' + title + ' - Youtube'
        
        console.log(window.p, data, window.p.getDuration())
        
        var qCur = window.p.getPlaybackQuality()
        var qSet = 'hd720'
        if (qCur != qSet) {
            window.p.setPlaybackQuality(qSet);
            try {
                window.p.setPlaybackQualityRange(qSet, qSet);
            } catch(e) {}
            title = '@720-' + title
        }
    }
    document.title = title
    var div = document.createElement("div");
    div.setAttribute('id', 'my_fixed_title')
    div.setAttribute('style', 'position:fixed;top: 1em;left: 11em;z-index: 9999;color: yellow;background: #393939;max-height: 2em;max-width: 80em;overflow: hidden;')
    div.innerHTML = '<h2 style="color:yellow">'+video_css_debug + ' - ' + title+'</h2>';
    document.body.appendChild(div)
    //document.title = document.querySelector('.video-main-content-title').innerText + ' - Youtube'
    
    var cMovieName = '######';
    var cMovieIntro = 0;
    var cMovieEnd = 0;
    for(var i = 0; i < MOVIE_NAME.length; i++) {
        var _movie = MOVIE_NAME[i];
        console.log('_movie', _movie)
        if (title.toLowerCase().indexOf(_movie[0]) != -1) {
            cMovieName = _movie[0]
            cMovieIntro = _movie[1]
            cMovieEnd = _movie[2]
            break;
        }
    }
    
    document.documentElement.setAttribute('style','background: #000;')
    document.body.setAttribute('style','background: #000;')
    
    if (isOldPlayer) {
        document.querySelector('#player').setAttribute('style',video_css)
        document.querySelector('.player-container').setAttribute('style','right:0')
        window.p.setAttribute('style',video_css) //  + 'border: 5px solid green'
        window.p.querySelector('video').setAttribute('style',video_css)
    }
    
    if (cMovieIntro != 0) {
        console.log('seek to', cMovieIntro)
        if (isOldPlayer) {
            window.p.seekTo(cMovieIntro)
        } else {
            window.vid.currentTime = cMovieIntro;
        }
        //p.pauseVideo()
    }
    if (isOldPlayer) {
        window.p.playVideo()
        window.p.unMute()
    } else {
        window.vid.play()
        window.vid.muted = false
    }
    
    if (window.vid.paused) {
        if (isOldPlayer) {
            window.vid.play()
        } else {
            window.vid.play()
        }
    }

    if (!window.vid.paused) {
        window.my_played = window.vid.src;
        console.log('window.vid.src', window.my_played)
        if (isOldPlayer) {
            var curVideoHeight = window.vid.clientHeight;//document.querySelector('#player').querySelector('video').clientHeight
            if (_url.indexOf('list=') != -1) {
                var right = document.querySelector('ytm-playlist')
                right.setAttribute('style', 'position:absolute;right:0;top:'+curVideoHeight+'px;background:#fff;z-index:99999')
                right.querySelector('.playlist-content').setAttribute('style', 'position: relative')
                console.log('ytm-playlist', right)
            } else {
                var right = document.querySelectorAll('.page-container ytm-single-column-watch-next-results-renderer ytm-item-section-renderer')
                if (!right) {
                    return
                }
                right[1].setAttribute('style', 'position:absolute;right:0;top:'+curVideoHeight+'px;background:#fff;display:block;z-index:99999')
                console.log('ytm-item-section-renderer', right)
            }
        }
    }
    if (isOldPlayer) {
        window.dur = window.p.getDuration()
    } else {
        window.dur = window.vid.duration
    }
    /*
    var isEnded = false
    window.vid.ontimeupdate = function() {
        if (isEnded) return;
        console.log(window.vid.currentTime, cMovieEnd, window.dur)
        var cur = window.vid.currentTime
        if (window.dur > 0 && cur >= (window.dur - cMovieEnd)) {
            window.vid.currentTime = window.dur - 2;
            isEnded = true;
            //window.dur = 0;
        }
    };*/
    
    i___2 = setInterval(function() {
        if(!window.vid) {
            return
        }
        var cur = window.vid.currentTime
        if (isOldPlayer) {
            cur = window.p.getCurrentTime()
        }
        if (window.dur > 0 && cur >= (window.dur - cMovieEnd)) {
            clearInterval(i___2)
            if (isOldPlayer) {
                window.p.seekTo(window.dur - 2)
            } else {
                window.vid.currentTime = window.dur - 2;
            }
            window.dur = 0;
        }
    }, video_currentCheck_iv)
}

function init() {
    if (_url.indexOf('m.youtube.com') != -1) {
        window.setTimeout(function() {
            getPlayer()
            
            video_width = '100%'; //window.innerWidth
            video_height = parseInt(window.innerHeight, 10)
            if(!_checkNum(video_height)) {
                video_height = 550 + 50
            }
            video_height = (video_height - 50) + 'px'
            
            if (isOldPlayer) {
                video_width = parseInt(window.innerWidth, 10)
                if(!_checkNum(video_width)) {
                    video_width = '100%'
                }
            }
            if (video_width.toString().indexOf('%') == -1) {
                video_width = video_width + 'px'
            }

            video_css = 'width:'+video_width+'; height:'+video_height+';'
            video_css_debug = [video_width, '|', video_height]

            console.log(video_css)

            /*if (_url.indexOf('playlist?list=') != -1) {
                document.title = document.querySelector('.playlist-header .section h2').innerText
            }*/

            i___1 = setInterval(function() {
                console.log('startPlayer', i___1)
                getPlayer()
                startPlayer()
            }, video_getPlayer_iv)
        //})(document, window);
        }, 2000);
    } else {
        if (_url.indexOf('watch?') == -1) {
            return;
        }
        getPlayerDesk()
            
        window.vid.addEventListener('ended', function() {
            //window.p.mute()
            window.p.querySelector("button.ytp-mute-button").click()
            var div_e = document.querySelector('#my_fixed_div')
            div_e.innerHTML += '<hr><div style="font-size: 5em;background:yellow;color:red">FINISHED END VIDEO</div>'
        }, false);
        
        var data = window.p.getVideoData()
        console.log('data', data)
        
        var cMovieName = '######';
        var cMovieIntro = 0;
        var cMovieEnd = 0;
        for(var i = 0; i < CHANNEL_NAME.length; i++) {
            var _channel = CHANNEL_NAME[i];
            console.log('_channel', _channel)
            if (data['author'].toLowerCase().indexOf(_channel[0]) != -1) {
                cMovieName = _channel[0]
                cMovieIntro = _channel[1]
                cMovieEnd = _channel[2]
                break;
            }
        }
        console.log('cMovieIntro', cMovieName, cMovieIntro, cMovieEnd)
        if (cMovieIntro != 0) {
            window.p.mute()
            console.log('seek to', cMovieIntro)
            window.p.seekTo(cMovieIntro);//p.pauseVideo()
        }
        
        if (window.p.isMuted()) window.p.querySelector("button.ytp-mute-button").click()
        
        var div = document.createElement("div");
        div.setAttribute('id', 'my_fixed_div')
        div.setAttribute('style', 'position: absolute; top: 8em; left: 9em; z-index: 9999; background: #ccc; width: 64em; height: 25em;')
        div.innerHTML = '<h1 style="font-size: 5em;">### Click or Esc to hide ###<br>Alt + click to PAUSE</h1>';
        div.addEventListener('click', function() {
            console.log(this)
            this.style.display = 'none';
            this.setAttribute('id', 'my_fixed_div_HIDE')
        }, false)
        document.body.appendChild(div)
        
        setTimeout(function() {
            div.style.height = '36em';
        }, 8 * 1000)
        
        window.addEventListener("keydown", e => {
            console.log('keydown:', e)
            /*
            if (isKeyDown) {
                e.preventDefault();
                return;
            }*/
            isKeyDown = true;
            if (e.keyCode == 27) { // esc == close gallery and DELETE FILE !!!!!!!!!!!!!
                e.preventDefault();
                var dh = document.querySelector('#my_fixed_div_HIDE')
                console.log('dh:', dh)
                if (dh) {
                    dh.style.display = 'block';
                    dh.setAttribute('id', 'my_fixed_div')
                } else {
                    var d = document.querySelector('#my_fixed_div')
                    if (d) {
                        d.style.display = 'none';
                        d.setAttribute('id', 'my_fixed_div_HIDE')
                    }
                }
            }
            if (e.altKey) {
                isForcePause = true;
            }
        }, false);
        window.addEventListener("keyup", e => {
            isKeyDown = false;
        }, false);
    }
}
init()
//});

