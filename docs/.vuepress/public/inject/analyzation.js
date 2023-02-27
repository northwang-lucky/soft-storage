(function () {
  var host, domainId;
  if (window.location.hostname.indexOf('vercel.app') < 0) {
    host = 'https://analyzation.northwang-lucky.com';
    domainId = 'a81f5094-9995-4be4-8a7a-c7af05f5ec8b';
  } else {
    host = 'https://analyzation.vercel.app';
    domainId = '3a3e5f16-2345-43ab-bc0a-fabfe7a75461';
  }
  var sdk = host + '/tracker.js';

  var script = document.createElement('script');
  script.async = true;
  script.src = sdk;
  script.dataset = { ackeeServer: host, ackeeDomainId: domainId };
  script.dataset.ackeeServer = host;
  script.dataset.ackeeDomainId = domainId;
  script.dataset.ackeeOpts = JSON.stringify({
    detailed: true,
    ignoreOwnVisits: window.NODE_ENV !== 'development',
  });
  document.head.appendChild(script);

  window.ACKEE_SERVER = host;
  window.ACKEE_OPTS = script.dataset.ackeeOpts;
})();
