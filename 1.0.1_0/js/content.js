// Copyright 2004-present Facebook. All Rights Reserved.

var chrome = window.chrome;
const APP_ID = 123561918055313;

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.message === 'fb.browser_action.click'
        || request.message === 'fb.context_menu_item.page.click'
        || request.message === 'fb.context_menu_item.selection.click') {
      showDialog(
        window.getSelection().toString(),
        request.current_url
      );
    }
  }
);

function showDialog(quote, currentURL) {
  var shareDialogURL = 'https://www.facebook.com/sharer/sharer.php?';
  shareDialogURL = shareDialogURL.concat('app_id=', APP_ID);
  shareDialogURL = shareDialogURL.concat('&u=', currentURL);
  if (quote) {
    shareDialogURL = shareDialogURL.concat('&quote=', quote);
  }

  var windowSpecs = 'toolbar=no, location=no, status=no, menubar=no,' +
                    'scrollbars=yes, resizable=yes, width=600, height=400';
  window.open(shareDialogURL, 'fbShareWindow', windowSpecs);
}
