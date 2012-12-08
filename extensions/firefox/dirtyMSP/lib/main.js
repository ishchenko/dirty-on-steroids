var data = require("self").data;
var pageMod = require("page-mod");
pageMod.PageMod({
  include: "*.d3.ru",
  contentScriptFile: data.url("d3.user.js")
});