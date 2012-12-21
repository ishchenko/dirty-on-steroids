/**
 * Opera storage gets advantage of built-in extension storage mechanism.
 * Docs: http://dev.opera.com/articles/view/extensions-api-widget-preferences/
 */

d3.storage =
{
    get: function(key, defaultValue)
    {
        if (typeof widget.preferences[key] !== "undefined") {
            return widget.preferences.getItem(key);
        }

        return defaultValue;
    },
    set: function(key, value)
    {
        if (!key || key == undefined) {
            if (console) console.log("Trying to save invalid cookie! ", value);
            return;
        }

        widget.preferences.setItem(key, value);
    },
    remove: function(key)
    {
        return widget.preferences.removeItem(key);
    }
};