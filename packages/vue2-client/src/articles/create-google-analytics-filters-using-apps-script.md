# Create Google Analytics Filter using Apps Script
#### Manage Google Analytics settings from Apps Script by creating View Filters programmatically. In this example I create Referrer Spam Filters.

*<div class="article-meta-data"> by <span class="article-meta-author" itemprop="author"><a href="https://twitter.com/kfinley" target="_blank" title="kfinley on Twitter">Kyle Finley</a></span> Published: <time itemprop="pubdate" datetime="8/3/2015 1:03:07 PM">Monday, August 3, 2015</time></div>*

---

## Out, Damn'd Spam! Out, I Say!
---
If you've ever managed Google Analytics for a site you know Referrer Spam can really over inflate your visits and as a result really mess up your Bounce Rates, Conversion Rates, and more. There are tons of article out there on how to fight referrer spammers and several techniques. I typically rely on creating filters in Google Analytics and applying them to my views. This can be very time consuming if you try to manage it by hand so I've created my own Google Sheets based Google Analytics Admin tool that helps automate some of the tasks including managing referrer spam filters.

If you're interested in building something like this the fundamental thing you'll need to do is create a filter and apply it to a view. If you want to create one filter per spam referrer that works or you can create filters that will match for multiple referrers using a regular expressions like "0n-line.tv|100dollars-seo.com|12masterov.com|etc." If you take the latter approach keep in mind that a Filter expression value can not be more than 255 characters so you'll be creating several filters. I take this approach and I currently create around 20 filters.

Below is the code needed to create a Filter in Google Analytics using Apps Script. First you create the filter and then you create a link associating that filter with a specific view.

```javascript
var filter = {name: "Filter Name,
              accountId: GOOGLE_ANALYTICS_ACCOUNT_ID,
              excludeDetails: {field: "CAMPAIGN_SOURCE",
                               expressionValue: FILTER_EXPRESSION_VALUE,
                               matchType: "MATCHES",
                               caseSensitive: false,
                               kind: "analytics#filterExpression"},
              type : "EXCLUDE",
              kind: "analytics#filter"};

filter = Analytics.Management.Filters.insert(filter, GOOGLE_ANALYTICS_ACCOUNT_ID);

var link = Analytics.Management.ProfileFilterLinks.insert({filterRef: {id: filter.id}},
GOOGLE_ANALYTICS_ACCOUNT_ID,  GOOGLE_ANALYTICS_PROPERTY_ID,
GOOGLE_ANALYTICS_VIEW_ID);
```
