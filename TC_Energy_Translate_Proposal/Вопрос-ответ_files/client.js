(function(window, undefined){
  if (/\bMSIE 6/.test(navigator.userAgent) && !window['opera']) {
    return;
  }

/**
 * @enum {string}
 */
var LivetexSettings = {
  HTTP_BALANCER: 'balancer-cloud.livetex.ru',
  CHAT_BALANCER: '//balancer-cloud.livetex.ru',
  BALANCER: '//balancer-cloud.livetex.ru',
  MEDIA_SERVER: 'tel.livetex.ru',
  BILLING_URL: 'https://billing.livetex.ru/',
  LTX_URL: '//web-client.livetex.ru/'
};

LTX_VERSION = '28.1.0';
if (typeof LiveTex !== 'undefined' &&
    typeof LiveTex['liveTexID'] !== 'undefined') {
  window['liveTexID'] = LiveTex['liveTexID'];
}

function isOldBrowser() {
  var ua = window.navigator.userAgent;
  var versionReg = new RegExp('version\/(\\d+(\\.\\d+)?)', 'i');
  var msReg = new RegExp('(?:msie |rv:)(\\d+(\\.\\d+)?)', 'i');
  var operaReg = new RegExp('(?:opera|opr)[\\s\/](\\d+(\\.\\d+)?)', 'i');

  function getFirstMatch(regex) {
    var match = ua.match(regex);
    return (match && match.length > 1 && match[1]) || '';
  }

  var versionIdentifier = getFirstMatch(versionReg);

  if (/msie|trident/i.test(ua)) {
    return (getFirstMatch(msReg) < 8 || document.compatMode !== 'CSS1Compat');
  }

  if (/opera|opr/i.test(ua)) {
    var version = versionIdentifier || getFirstMatch(operaReg);
    return version < 12;
  }

  return false;
}

function nop() {}

function loadAppJs() {
  function completeHandler() {
    script.onreadystatechange = nop;
    script.onload = nop;
    document.body.removeChild(script);
  }

  var script = document.createElement('script');
  script.onreadystatechange = function() {
    if (script.readyState === 'complete' ||
        script.readyState === 'loaded') {
      completeHandler();
    }
  };

  script.onload = completeHandler;
  script.src = LivetexSettings['BALANCER'] + '/get-client/?site_id=' +
      liveTexID.toString() + '&version=' + LTX_VERSION;
  document.body.appendChild(script);
}

if (/Opera Mini/.test(navigator.userAgent)) return false;

if (typeof window['LiveTex'] === 'undefined') {
  window['LiveTex'] = {};
}

if (window['LiveTex']['is_init'] !== true && !isOldBrowser()) {
  window['LiveTex']['is_init'] = true;
  loadAppJs();
} else {
  if (typeof console !== 'undefined' &&
      typeof console.error !== 'undefined') {
    console.error('LiveTex script loaded two or more times. ' +
        'Load the script only once, please.');
  }
}
})(window);
