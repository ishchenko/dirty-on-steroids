if(typeof chrome !== 'undefined')
{
    var s = document.createElement('script');
    s.src = chrome.extension.getURL("dev.d3.user.js");
    (document.head||document.documentElement).appendChild(s);
}
