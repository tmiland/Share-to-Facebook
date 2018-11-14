// Copyright 2004-present Facebook. All Rights Reserved.

var chrome = window.chrome;

chrome.browserAction.onClicked.addListener(function(_tab) {
  if (chrome.tabs) {
    // send a message to the active tab
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0]) {
        var activeTab = tabs[0];
        var contentInfo = {
          message: 'fb.browser_action.click',
          current_url: activeTab.url,
        };
        chrome.tabs.sendMessage(activeTab.id, contentInfo);
      }
    });
  }
});

chrome.runtime.onInstalled.addListener(function(details) {
  if (details.reason == 'install') {
    const INSTALL_URL = 'https://www.facebook.com/share_chrome_extension/install';
    var xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open("GET", INSTALL_URL, true);
    xmlHttpRequest.send(null);
  }
});

const UNINSTALL_URL = 'https://www.facebook.com/share_chrome_extension/uninstall';
chrome.runtime.setUninstallURL(UNINSTALL_URL);

// Create link share of current page with quotation
// TODO i18n and "link", "image","video", "audio"
var contexts = ['page', 'selection'];
var contextsConfig = {
  page: {
    title: chrome.i18n.getMessage("contextMenuSharePage"),
  },
  selection: {
    title: chrome.i18n.getMessage("contextMenuShareQuote"),
  },
};

for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var config = contextsConfig[context];
  if (config) {
    chrome.contextMenus.create({
      title: config.title,
      contexts: [context],
      onclick: function(info, tab) {
        chrome.tabs.sendMessage(tab.id, {
          message: 'fb.context_menu_item.' + context + '.click',
          current_url: tab.url,
        });
      },
    });
  }
}
