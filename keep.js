/*
* Keep Silk Open
* https://gitlab.com/DaGammla/keep-silk-open
*
* Released under the MIT license
* https://gitlab.com/DaGammla/keep-silk-open/-/blob/main/LICENSE
*
* 2022 by DaGammla
*/
(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const alwaysUse = typeof AlwaysUseSilk != "undefined" && !!AlwaysUseSilk;
    goFullScreen
    if (userAgent.includes("silk") || alwaysUse) {

        const visualMode = typeof SilkVisualMode != "undefined" && !!SilkVisualMode;

        let source = document.currentScript.getAttribute("src");
        const lastDivider = source.lastIndexOf("/");
        source = source.slice(0, lastDivider + 1) + "media.mp3";

        const nowQuery = () => `?q=${Date.now()}`;

        const audio = document.createElement("audio");
        audio.controls = visualMode;
        audio.src = source + nowQuery();
        audio.muted = true;
        audio.autoplay = true;
        document.body.appendChild(audio);

        const listenEvents = ["keydown", "pointerdown", "click"];

        const addAllListeners = (listener) => {
            listenEvents.forEach(ev => {
                document.addEventListener(ev, listener);
            });
        };

        const removeAllListeners = (listener) => {
            listenEvents.forEach(ev => {
                document.removeEventListener(ev, listener);
            });
        };

        const reload = () => {
            audio.src = source + nowQuery();
            audio.currentTime = 0;
            audio.play();
        };

        audio.onended = reload;

        const startMedia = () => {
            reload();
            audio.muted = false;
        };

        audio.onplaying = () => removeAllListeners(startMedia);
        addAllListeners(startMedia);

        // Fullscreen functionality
        const goFullScreen = () => {
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }
        };

        // Attempt to go full screen after any of the events (click, keydown, pointerdown)
       addAllListeners(goFullScreen);
    }
})();
