# Store value for a selected label using Typeahead.js & jQuery
#### jQuery & Twitter Typeahead.js solution that doesn't require additional maps for label text and value. Store id for a selected label in jQuery Data Collection.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="7/30/2014 3:54:38 PM">Wednesday, July 30, 2014</time></div>*

---

## Simple Way to Store the Typeahead ID Value
While working on my startup project I've been using the [Typeahead.js](http://twitter.github.io/typeahead.js) library for handling autocomplete for form elements using AJAX calls to populate the list. It's a great little framework from [Twitter](http://twitter.com/) that is simple to use and works like a champ! If you're not using it and looking for an autocomplete solution check it out.

While working on a page I ran into a situation where I wanted to show a list of text for users to select from but wanted to store the ID related to that item so I could use it later. A quick search led me to a common solution of using arrays as a lookup map for the selected value. I thought this was a bit of overkill and there was a better solution and came up with this.

Sample source data returned from AJAX request (query text for this example is "ben"):

```json
[
  {
    "Id": "d99d4138-640d-4a2c-a1a5-0269ed817f9d",
    "Name": "Ben Gibbard"
  },
 {
    "Id": "43f19a29-7980-4ed1-af41-538244477d1a",
    "Name": "Breaking Benjamin"
  },
 {
    "Id": "13d34403-12af-4aab-97b7-a712c2ac83c4",
    "Name": "The Bends"
  }
]
```

And here's the code to wire up the element with Typeahead.sj:

```javascript
var artists = new Bloodhound({
    datumTokenizer: Bloodhound.tokenizers.obj.whitespace("name"),
    queryTokenizer: Bloodhound.tokenizers.whitespace,
    remote: {
        url: "/api/getartists/%QUERY"
    },
    limit: 10
});
artists.initialize();

$("#typeaheadElement").typeahead({
    hint: true,
    highlight: true,
    minLength: 2
},
{
    name: "result",
    displayKey: "Name",
    source: artists.ttAdapter()
}).bind("typeahead:selected", function(obj, datum, name) {
    $(this).data("seletectedId", datum.Id);
});
```

So basically instead of building up a map of the label text to a corresponding ID I just bind the typeahead selected event and store the ID of the selected item. Now when you need the ID for the user selected from the Typeahead.js autocomplete list it's stored in elements Data collection as "selectedId" and is stupid easy to retrieve:

```javascript
$(document).on("click", "#someButton", function (e) {
    e.preventDefault();
    alert($("#typeaheadElement").data("seletectedId"));
});
```

You could also just as easily store the value in a hidden field if you'd prefer but why add another element to the page when you just need the value? [jQuery.data](http://api.jquery.com/jquery.data/) is already available since Typeahead.js and Bloodhound require it so just use it!

That's it! Let me know your thoughts, comments, opinions, or criticisms on Twitter at [@KFinley](https://twitter.com/kfinley).
