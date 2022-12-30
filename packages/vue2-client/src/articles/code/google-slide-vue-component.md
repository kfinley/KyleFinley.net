# Google Slides Vue Component

#### Creating a responsive Google Slides player as a VueJS Component

_<div class="article-meta-data"> by Kyle Finley</span> Published:
<time itemprop="pubdate" datetime="12/30/2022">Friday, Dec 30, 2022</time></div>_

---

As part of my ongoing reworking of my little website I've decided to start publishing a
bunch of old presentations for personal archival purposes. Most of the presentations were
built with Google Slides so I wanted an easy way to embed these slides into articles on my
site. After some quick searches I found you can easily embed a slide that is publicly
available with an iFrame like so.

```html
<iframe
  src="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/embed"
></iframe>
```

This works but I quickly realized I needed the iFrame to be responsive. Another quick
search and I found [Amit Agarwal's](https://twitter.com/labnol)
_[How to Embed Google Slides Like a Pro!](https://www.labnol.org/embed-google-slides-200615)_
article. Check out Amit's article for more details but with his recommended CSS we can
make the slide player responsive by wrapping the iFrame like so.

```html
<div class="responsive">
  <iframe
    src="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/embed"
  ></iframe>
</div>
```

Quick test and sure enough this works as expected. Awesome!

This is when I realized a problem. There didn't seem to be a way to full screen a deck.
Which makes these slides completely useless on mobile devices.

After a quick search on full screen options for G Slide embeds I landed on K8oms.net's
[presentation article](https://www.k8oms.net/images/presentations) which showed a G Slide
player with a full screen icon overlay (on desktop only). Hmmmm. :thinking:

A quick look at the html source and I found this...

```html
<div jscontroller="VYKRW" jsaction="rcuQ6b:rcuQ6b;">
  <div
    class="WIdY2d M1aSXe"
    data-embed-doc-id="1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw"
    data-embed-open-url="https://docs.google.com/presentation/d/1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw/present"
    data-embed-thumbnail-url="https://drive.google.com/thumbnail?id=1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw&amp;sz=w967-h540-p-k-nu"
  >
    <div jsname="WXxXjd" class="t5qrWd" style="padding-top: 62.0437956204%"></div>
    <a
      class="oWHwWc L6cTce-purZT L6cTce-pSzOP"
      target="_blank"
      title="Open Presentation, Field Day 2 in new window"
      aria-label="Open Presentation, Field Day 2 in new window"
      href="https://docs.google.com/presentation/d/1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw/present"
      ><svg class="hmuWb" viewBox="0 0 24 24" focusable="false">
        <path d="M0 0h24v24H0z" fill="none"></path>
        <path
          d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
        ></path></svg></a
    ><iframe
      jsname="L5Fo6c"
      jscontroller="usmiIb"
      jsaction="rcuQ6b:WYd;"
      class="YMEQtf L6cTce-purZT L6cTce-pSzOP KfXz0b"
      sandbox="allow-scripts allow-popups allow-forms allow-same-origin allow-popups-to-escape-sandbox allow-downloads allow-modals"
      frameborder="0"
      aria-label="Presentation, Field Day 2"
      allowfullscreen=""
      src="https://docs.google.com/presentation/d/1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw/embed?delayms=3000&amp;loop=true&amp;start=true"
    ></iframe>
    <div class="TPTLxf"></div>
    <div
      class="JmGwdf SzkQif L6cTce-hJDwNd L6cTce-dQCS7c"
      role="link"
      tabindex="0"
      jsaction="click:QNTBYd"
      aria-label="Presentation, Field Day 2"
    >
      <div class="t0pVcb">
        <div
          class="TZchLb FQ4MFe"
          style="background-image: url(https://drive.google.com/thumbnail?id=1konr3BlvAFVJYLvofrGmriVm2SFTE0BvwBaMjy79bPw&amp;sz=w967-h540-p-k-nu);"
        ></div>
      </div>
      <div class="pHBU0d">
        <div class="ojy9Ed">
          <img
            class="McKOwe"
            src="https://www.gstatic.com/images/icons/material/product/1x/slides_32dp.png"
          /><span class="pB4Yfc">Field Day 2</span>
        </div>
      </div>
    </div>
  </div>
</div>
```

The jsname, jscontroller, jsaction attributes quickly jumped out at me. After another quick search I found Eric Xu's [answer on SO](https://stackoverflow.com/a/65461417) with Jimish Fotariya's comment that pointed me to [Google's JSAction Library](https://github.com/google/jsaction). From JSAction's GitHub Page

> "JsAction is a small event delegation library that decouples event binding from the code that can handle the event."

Sounds cool. But this isn't all that helpful. After looking at the html code from k8oms.net I can see they're getting the overlay to work essentially the same way I would. Which is place an adjacent element before or after the iFrame then use style it to float over the slides player.

I also noticed a few more attributes on the iFrame and most notably ```allowfullscreen=""```. Adding this attribute to the iFrame did nothing.

From further inspection of the network traffic from calls to K8oms it looks like these are possibly Google Sites hosted pages which means there's some probably some Google library sugar making this all work. At any rate after 10 min digging into it I could see a simple solution for just rolling my own simple Google Slides VueJS component.

First I needed to make a full-screen icon for the iFrame. After a little tweaking and borrowing the SVG paths from K8oms's output I came up this. It doesn't dynamically show the full-screen icon like the Google Sites embed does but it does show it on mobile which the Google Sites setup doesn't. :rocket:

```html
<p>
  <a href="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/present" target="_blank">
  <svg viewBox="0 0 24 24" focusable="false" style="
    position: absolute;
    z-index: 10;
    fill: white;
    height: 5%;
    right: 35px;
    opacity: 40%;
"><path d="M0 0h24v24H0z" fill="none"></path> <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"></path>
</svg>
</a>
  <div class="responsive-google-slides">
    <iframe src="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/embed" allowfullscreen></iframe>
  </div>
</p>

```

Cool. :partying_face: Now I just need to spin this into a VueJS component and I can have a nice reusable component to use anywhere I want.

And here's what that component looks like:
<git-hub-source-code lang="html" path="https://api.github.com/repos/kfinley/KyleFinley.net/contents/packages/vue2-client/src/components/GSlides.vue"/>
If ths source isn't showing above it can be found here: [GSlides](https://github.com/kfinley/KyleFinley.net/blob/main/packages/vue2-client/src/components/GSlides.vue)

And here's how it can be used:

```html

<g-slides presentation-id="1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI" label="IaC with CDK"></g-slides>

```

