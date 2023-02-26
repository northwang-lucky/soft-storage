var msg_en = `The system has detected that your AD blocker blocked our statistical buried points, which prevents us from using data analysis to continuously improve the experience of reading documents. We currently don't have any AD elements in our document, so feel free to add the following two domains to the whitelist of our blockers:

soft-storage.northwang-lucky.com
soft-storage.vercel.app`;

var msg_zh = `系统检测到您的广告拦截插件拦截了我们的统计埋点，这会导致我们无法通过数据分析来持续优化阅读文档的体验。我们的文档中目前没有任何广告元素，请放心将以下两个域名加入到拦截器的白名单中：

soft-storage.northwang-lucky.com
soft-storage.vercel.app`;

function createMessageBox() {
  var messageBox = document.createElement('div');
  messageBox.className = 'checker-message-box';

  var header = document.createElement('header');

  var title = document.createElement('span');
  title.className = 'title';
}

var xhr = new XMLHttpRequest();
xhr.open('GET', '/js-sdk-event.min.js');
xhr.onerror = function () {
  if (xhr.readyState === 4 && xhr.status === 0) {
    var msg = window.location.pathname.indexOf('/docs/zh') < 0 ? msg_en : msg_zh;
    alert(msg);
  }
};
xhr.send();
