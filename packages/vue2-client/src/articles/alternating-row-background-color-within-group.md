# Alternate Row Background Color within a Group
### How to create Background Color for Alternating Rows within a Group in Reporting Services

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="7/6/2006 5:00:00 AM">Thursday, July 6, 2006</time></div>*

---

A typical report enhancement is to provide alternating row background colors for a table within Reporting Services. This is pretty easy if you have a simple table with no groupings. Just use the following expression in the row BackGroundColor property:

```javascript
= IIF(RowNumber(Nothing) Mod 2, "Gainsboro", "White")
```
This becomes a little more tricky when you have groupings involved. But thanks to Chris Hays and his Reporting Services Sleazy Hacks I found how to do alternating row colors at the group level. Use this expression for the details row within a group:

```javascript
= IIF(RunningValue(Fields!Some_Field.Value, CountDistinct, "Group_Name") Mod 2, "Gainsboro", "White")
```

For this you need to use the field you are grouping the details row on and for "Group_Name" use the parent group for that details section. I'm sure this can be done with multiple groups in a table but I haven't tried it yet.

Good luck and happy Reporting Services Hacking! :)

Now Playing:Ultimate Fakebook - Open Up And Say Awesome - When I'm With You I'm OK
