// ==UserScript==
// @name Y
// @version 1.0
// @run-at         document-start
// @include https://m.youtube.com/*
// ==/UserScript==

var MOVIE_NAME = [
    ['gười đà', 180, 100],
    ['ọ lem th', 180, 100]
]

var _url = location.href
var isKeyDown = false;
var isForcePause = false;
var qualities = ['hd2160', 'hd1440', 'hd1080', 'hd720', 'large', 'medium', 'small', 'tiny', 'auto'];

window.p = null;
window.vid = null;
window.my_played = '0';
window.dur = 0
var i___1 = null;
var i___2 = null;
/*
var video_height = 'height:720px;width:1280px;'
var video_height = 'height:1080px;width:1920px;'
var video_height = 'height:1050px;width:1867px;'*/
var video_width=window.innerWidth
var video_height=window.innerHeight - 50
var video_css='width:'+video_width+'px; height:'+video_height+'px;'

var video_getPlayer_iv = 5 * 1000
var video_currentCheck_iv = 1 * 1000

console.log(video_css)

//(function(document, window) {
window.setTimeout(function() {
    function insertAfter(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode.nextSibling);
    }
    function insertBefore(el, referenceNode) {
        referenceNode.parentNode.insertBefore(el, referenceNode);
    }
    if (_url.indexOf('m.youtube.com') != -1) {
        //if (_url.indexOf('watch?v=') == -1) {
        //    return;
        //}
        if (_url.indexOf('playlist?list=') != -1) {
            document.title = document.querySelector('.playlist-header .section h2').innerText
        }
        
        function getPlayer() {
            window.p = document.getElementById('movie_player') ||
                document.getElementById('movie_player-flash');
            if(window.p) window.vid = window.p.querySelector('video')
            // console.log(window.p)
            _url = location.href
            /*if (_url != location.href) {
                _url = location.href
                window.my_played = 'on url diff';
            }*/
        }
        function startPlayer() {
            if (_url.indexOf('watch?v=') == -1) {
                return;
            }
            if (!window.p) {
                console.log('not found video')
                return;
            }
            console.log('window.my_played', window.my_played, window.vid.src)
            if (!window.vid.src) return;
            if (window.my_played == window.vid.src) {
                console.log('startPlayer old')
                if (window.vid.paused) {
                    //window.p.playVideo()
                }
                return;
            }
            console.log('startPlayer new')
            
            //if (window.p) clearInterval(i___1)
            console.log(window.p, window.p.getVideoData(), window.p.getDuration())
            
            //window.p.pauseVideo();
            
            document.body.setAttribute('style','background: #000;')
            document.documentElement.setAttribute('style','background: #000;')
            document.querySelector('#player').setAttribute('style',video_css)
            document.querySelector('.player-container').setAttribute('style','right:0')
            window.p.setAttribute('style',video_css) //  + 'border: 5px solid green'
            window.p.querySelector('video').setAttribute('style',video_css)
            
            var data = window.p.getVideoData()
            document.title = '@' + data['title'] + ' - Youtube'
            
            var qCur = window.p.getPlaybackQuality()
            var qSet = 'hd720'
            if (qCur != qSet) {
                window.p.setPlaybackQuality(qSet);
                try {
                    window.p.setPlaybackQualityRange(qSet, qSet);
                } catch(e) {}
                document.title = '@720-' + data['title'] + ' - Youtube'
            }
            //document.title = document.querySelector('.video-main-content-title').innerText + ' - Youtube'
            
            var cMovieName = '######';
            var cMovieIntro = 0;
            var cMovieEnd = 0;
            for(var i = 0; i < MOVIE_NAME.length; i++) {
                var _movie = MOVIE_NAME[i];
                console.log('_movie', _movie)
                cMovieName = _movie[0]
                cMovieIntro = _movie[1]
                cMovieEnd = _movie[2]
                if (data['title'].toLowerCase().indexOf(cMovieName) != -1) {
                    break;
                }
            }
            
            if (cMovieIntro != 0) {
                console.log('seek to', cMovieIntro)
                window.p.seekTo(cMovieIntro);//p.pauseVideo()
            }
            
            window.p.playVideo()
            
            if (window.vid.paused) {
                window.p.playVideo()
                return;
            }
            //setTimeout(function() {
                if (!window.vid.paused) {
                    window.my_played = window.vid.src;
                    console.log('window.vid.src', window.my_played)
                }
                //else {
                //    window.p.playVideo()
                //}
            //}, 200)
            
            //setTimeout(function() {
            if (_url.indexOf('&list=') != -1) {
                var right = document.querySelector('ytm-playlist')
                right.setAttribute('style', 'position:absolute;right:0;top:'+video_height+'px;background:#fff;display:block;z-index:99999')
                console.log('ytm-playlist', right)
            } else {
                var right = document.querySelectorAll('.page-container ytm-single-column-watch-next-results-renderer ytm-item-section-renderer')
                if (!right) {
                    return
                }
                right[1].setAttribute('style', 'position:absolute;right:0;top:'+video_height+'px;background:#fff;display:block;z-index:99999')
                console.log('ytm-item-section-renderer', right)
            }
            //}, 1000)
            
            window.dur = window.p.getDuration()
            
            i___2 = setInterval(function() {
                if(!window.p) {
                    return
                }
                var cur = window.p.getCurrentTime()
                if (window.dur > 0 && cur >= (window.dur - cMovieEnd)) {
                    clearInterval(i___2)
                    window.p.seekTo(window.dur - 2);
                    window.dur = 0;
                    
                    // window.my_played = '#on_END';
                    
                    /*
                    window.p.pauseVideo();
                    
                    if (_url.indexOf('&list=') != -1) {
                        document.querySelectorAll('ytm-playlist-controls .playlist-controls-primary c3-material-button')[1].querySelector('button').click()
                    } else {
                        window.p.nextVideo()
                    }
                    */
                    
                    /*
                    window.p = null;
                    //clearInterval(i___1)
                    i___1 = setInterval(function() {
                        // console.log('========== on end video setInterval', i___1, i___2)
                        startPlayer()
                    }, 2000)*/
                    //clearInterval(i___2)
                }
            }, video_currentCheck_iv)
        }
        /*
        i___0 = setInterval(function() {
            //console.log('getPlayer', i___0)
            getPlayer()
        }, video_currentCheck_iv)*/
        
        i___1 = setInterval(function() {
            //console.log('startPlayer', i___1)
            getPlayer()
            startPlayer()
        }, video_getPlayer_iv)
        
    } else {
        if (_url.indexOf('watch?v=') == -1) {
            return;
        }
        var div = document.createElement("div");
        div.setAttribute('id', 'my_fixed_div')
        div.setAttribute('style', 'position: absolute; top: 8em; left: 9em; z-index: 9999; background: #ccc; width: 64em; height: 25em;')
        div.innerHTML = '<h1 style="font-size: 5em;">### Click or Esc to hide ###<br>Alt + click to PAUSE</h1>';
        div.addEventListener('click', function() {
            console.log(this)
            this.style.display = 'none';
            this.setAttribute('id', 'my_fixed_div_HIDE')
        }, false)
        document.querySelector('body').appendChild(div)
        
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
//})(document, window);
}, 1000)

