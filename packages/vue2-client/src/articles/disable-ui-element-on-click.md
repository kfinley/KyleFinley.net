# Disable HTML Element on Click

#### Very simple way to disable a UI element (such as a submit button) when it's clicked using ~20 lines of JavaScript.

_<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author">Kyle Finley</span> Published: <time itemprop="pubdate" datetime="9/9/2015">Wednesday September 9, 2015</time></div>_
_<div class="article-meta-data">Updated: Monday June 5, 2023</div>_

---

### Is this thing working?!?! :rage:

A common UX issue I see in web apps is that when a button is clicked then it should be disabled until the action it performs is completed. This issue became obvious with early AJAX websites and I still see people forget about this all the time. This means the user has no idea if the site is actually working or not, so they just click on the button over and over and over. This is rarely the site developer wanted and can often cause weird things to happen or create multiple records. Plus not to mention, it's just down right frustrating for the user. This is just a bad user experience and should be handled more gracefully.

Some people solve this by adding an obnoxious "Loading..." overlay for the entire page but that's a bit much don't you think? There are even many plugins out there that claim to handle this by doing similar things. Why add a plugin for something that's actually really easy to handle? This should be built into your core UI components that are part of your Design System.

I've used something similar to the following for several years. It's a simple CSS and JavaScript approach that works for all browsers and is only about 20 lines of JavaScript (unminified). This approach doesn't require CSS file additions and when you need to disable or enable an element you just make a call to the JS functions that you can tuck away in your site's common JavaScript file.

### Show me the code!!!


Here's the JavaScript code to add to your site's JS file.

```javascript
const styleString =
    ".disabledElement{-ms-filter:'progid:DXImageTransform.Microsoft.Alpha(Opacity=30)';filter:alpha(opacity=30);-moz-opacity:0.3;-khtml-opacity:0.3;opacity:0.3;cursor:default;background-position:top;pointer-events:none;}";

// Helper function for adding style block to head tag
function addCss(id, css) {
  const styleBlock = document.getElementById(id);

  if (!styleBlock) {
    var s = document.createElement("style");
    s.setAttribute("id", id);
    s.setAttribute("type", "text/css");
    if (s.styleSheet) {
      // IE
      s.styleSheet.cssText = css;
    } else {
      // the world
      s.appendChild(document.createTextNode(css));
    }
    document.getElementsByTagName("head")[0].appendChild(s);
  }
}

function disableElement(element) {

  addCss("disabledElementStyles", styleString);

  element.classList.add("disabledElement");
}

function enableElement(element) {
  if (element.classList.contains("disabledElement")) {
    element.classList.remove("disabledElement");
  }
}

function disableElements(elementArray) {
  elementArray.forEach(disableElement);
}

function enableElements(elementArray) {
  elementArray.forEach(enableElement);
}
```

### How do you use it?
Using the code is very simple. At the beginning of some event that's triggered by an element you call the disableElement function. When your code is done and you want to let the user click the element again you call enableElement. If you have multiple elements you want to enable / disable there are functions that take an array of elements to enable or disable.

Here's a sample using a function tied to a button click event. Here we disable the button, do some work, then enable the button it when we're done.

```javascript
function buttonClick(e) {
  disableElement(e);

  //
  // Do some work
  //
  enableElement(e);
}
```

That's it! One thing to keep in mind especially when doing AJAX calls is that if the call fails you should make sure you re-enable the button. A good way to do this if you're using jQuery is to use the .always() method of the AJAX call like this (yes this is very dated... but the point still applies).

```javascript
$("#someButton").click(function () {
  $.post("/someurl", data, function (data, status) {
    if (status == "success") {
      // Do whatever you need to do on success
    }
  })
    .fail(function (xhr, error) {
      // Handle the failure gracefully by showing error messages to the user
    })
    .always(function (data) {
      enableElement($("#someButton"));
    });
});
```

### How does it work?
So what's going on here? If you can't figure it out from reading the code (which if you can't you should seriously just stop developing websites because this isn't hard stuff... or you're just learning so that's OK), all that's happening here is we're adding some CSS to the page, adding a CSS class to the element, and removing the class to enable the element. That's it.
