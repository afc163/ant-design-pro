(function(window) {
  var svgSprite =
    '<svg><symbol id="icon-link" viewBox="0 0 1024 1024"><path d="M170.666667 362.666667h213.333333c47.130667 0 85.333333 38.202667 85.333333 85.333333v128c0 47.130667-38.202667 85.333333-85.333333 85.333333H170.666667c-47.130667 0-85.333333-38.202667-85.333334-85.333333V448c0-47.130667 38.202667-85.333333 85.333334-85.333333z m21.333333 64a42.666667 42.666667 0 0 0-42.666667 42.666666v85.333334a42.666667 42.666667 0 0 0 42.666667 42.666666h170.666667a42.666667 42.666667 0 0 0 42.666666-42.666666V469.333333a42.666667 42.666667 0 0 0-42.666666-42.666666H192zM640 362.666667h213.333333c47.130667 0 85.333333 38.202667 85.333334 85.333333v128c0 47.130667-38.202667 85.333333-85.333334 85.333333h-213.333333c-47.130667 0-85.333333-38.202667-85.333333-85.333333V448c0-47.130667 38.202667-85.333333 85.333333-85.333333z m21.333333 64a42.666667 42.666667 0 0 0-42.666666 42.666666v85.333334a42.666667 42.666667 0 0 0 42.666666 42.666666h170.666667a42.666667 42.666667 0 0 0 42.666667-42.666666V469.333333a42.666667 42.666667 0 0 0-42.666667-42.666666h-170.666667z"  ></path><path d="M341.333333 469.333333l341.333334 0 0 85.333334-341.333334 0 0-85.333334Z"  ></path></symbol></svg>';
  var script = (function() {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();
  var shouldInjectCss = script.getAttribute('data-injectcss');
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~['complete', 'loaded', 'interactive'].indexOf(document.readyState)) {
        setTimeout(fn, 0);
      } else {
        var loadFn = function() {
          document.removeEventListener('DOMContentLoaded', loadFn, false);
          fn();
        };
        document.addEventListener('DOMContentLoaded', loadFn, false);
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn);
    }
    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        init = function() {
          if (!done) {
            done = true;
            fn();
          }
        };
      var polling = function() {
        try {
          d.documentElement.doScroll('left');
        } catch (e) {
          setTimeout(polling, 50);
          return;
        }
        init();
      };
      polling();
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null;
          init();
        }
      };
    }
  };
  var before = function(el, target) {
    target.parentNode.insertBefore(el, target);
  };
  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild);
    } else {
      target.appendChild(el);
    }
  };
  function appendSvg() {
    var div, svg;
    div = document.createElement('div');
    div.innerHTML = svgSprite;
    svgSprite = null;
    svg = div.getElementsByTagName('svg')[0];
    if (svg) {
      svg.setAttribute('aria-hidden', 'true');
      svg.style.position = 'absolute';
      svg.style.width = 0;
      svg.style.height = 0;
      svg.style.overflow = 'hidden';
      prepend(svg, document.body);
    }
  }
  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true;
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      );
    } catch (e) {
      console && console.log(e);
    }
  }
  ready(appendSvg);
})(window);
