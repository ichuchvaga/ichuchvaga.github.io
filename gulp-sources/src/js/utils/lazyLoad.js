/* global document window location IntersectionObserver */
import ready from './documentReady.js';

ready(function () {
    const lazyImages = [].slice.call(document.querySelectorAll("img.lazy"));
    const lazyVideos = [].slice.call(document.querySelectorAll(".youtube-lazy"));

    if ("IntersectionObserver" in window) {
      let lazyImageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            //lazyImage.srcset = lazyImage.dataset.srcset;
            lazyImage.classList.remove("lazy");
            lazyImageObserver.unobserve(lazyImage);
          }
        });
      });

      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });


      // youtube video observer
      let lazyYoutubeVideoObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyVideo = entry.target;
            let lazyVideoParams = '';

            if (lazyVideo.dataset.embed.indexOf('rutube') === -1) {
              lazyVideoParams = '?enablejsapi=1&rel=0&showinfo=0&autoplay=1';
            }

            lazyVideo.classList.remove("youtube-lazy");

            if (new URL(lazyVideo.dataset.embed, location.origin).origin === location.origin) {
              lazyVideo.innerHTML = '<video controls width="' + lazyVideo.dataset.width + '" height="' + lazyVideo.dataset.height + '" poster="' + lazyVideo.dataset.thumb + '">' +
                '<source src="' + lazyVideo.dataset.embed + '" />' +
                '</video>';
            } else {

              let iframeElement = document.createElement('iframe');
              iframeElement.width = lazyVideo.dataset.width;
              iframeElement.height = lazyVideo.dataset.height;
              iframeElement.frameBorder = "0";
              iframeElement.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen; screen-wake-lock";
              iframeElement.src = lazyVideo.dataset.embed + lazyVideoParams;
              iframeElement.allowFullScreen = 'allowfullscreen';

              if (lazyVideo.dataset.embed.indexOf('rutube') !== -1) {
                iframeElement.addEventListener('load', function(){
                  iframeElement.contentWindow.postMessage(JSON.stringify({
                    type: 'player:play',
                    data: {}
                  }), '*');
                }, false);
              }

              lazyVideo.innerHTML = '';
              lazyVideo.append(iframeElement);

              /*lazyVideo.innerHTML = '<iframe width="' + lazyVideo.dataset.width + '" height="' + lazyVideo.dataset.height + '" frameBorder="0" ' +
                'allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"' +
                'src="' + lazyVideo.dataset.embed + lazyVideoParams + '"' +
                ' allowFullScreen="allowfullscreen"></iframe>';*/
            }

          lazyYoutubeVideoObserver.unobserve(lazyVideo);
          }
        });
      });

      lazyVideos.forEach(function(lazyVideo) {
        lazyYoutubeVideoObserver.observe(lazyVideo);
      });

    }
});
