# Google Slides Vue Component

#### Creating a responsive Google Slides player as a VueJS Component

_<div class="article-meta-data"> by Kyle Finley</span> Published:
<time itemprop="pubdate" datetime="12/30/2022">Friday, Dec 30, 2022</time></div>_

---

As part of my ongoing rebuild of my little personal slice of the web I've decided to start publishing a bunch of old presentations for educational and personal archival purposes. Most of the presentations were built with Google Slides so I wanted an easy way to embed these slides into articles on my site. After some quick searches I found you can easily embed a presentation that is publicly available with an iFrame like so.

```html
<iframe
  src="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/embed"
></iframe>
```

This works but I quickly realized I needed the iFrame to be responsive. Another quick search and I found Amit Agarwal's _[How to Embed Google Slides Like a Pro!](https://www.labnol.org/embed-google-slides-200615)_ article. Check out Amit's article for more details but with his recommended CSS we can make the slide player responsive by wrapping the iFrame like so.

```html
<div class="responsive">
  <iframe
    src="https://docs.google.com/presentation/d/1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI/embed"
  ></iframe>
</div>
```

Quick test and sure enough this works as expected. Awesome!

This is when I realized a problem. There didn't seem to be a way to full screen a deck. Which makes these slides completely useless on mobile devices.

After a quick search on full screen options for G Slide embeds I landed on K8oms.net's [presentation article](https://www.k8oms.net/images/presentations) which showed a G Slide
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
    . . .
  </div>
</div>
```

Well that's fun... So what's interesting here? The `allowfullscreen=""` attribute on the iFrame is the most obvious thing. Unfortunately adding this attribute to the iFrame did nothing.

The jsname, jscontroller, jsaction attributes also jumped out at me. After another quick search I found Eric Xu's [answer on SO](https://stackoverflow.com/a/65461417) with Jimish Fotariya's comment that pointed me to [Google's JSAction Library](https://github.com/google/jsaction). From JSAction's GitHub Page:

> "JsAction is a small event delegation library that decouples event binding from the code that can handle the event."

Sounds cool. But this isn't really all that helpful. After looking at the html code from k8oms.net again there's a few more noticeable things such as the `data-embed-doc-id`, `data-embed-open-url`, and `data-embed-thumbnail-url` attributes. Overall what I could see is that this things works essentially the same way I would build it. Which is to place an adjacent element before or after the iFrame then style it to float over the slides player.

After a little inspection of the network traffic for calls to K8oms it looks like these are possibly Google Sites hosted pages which means there's probably some internal Google library sugar making this all work using JSActions. At any rate after the 10 min or so digging into all this I could see a simple solution for just rolling my own simple Google Slides VueJS component that did what I needed it to do and nothing more.

First I needed to make a full-screen icon for the iFrame that I already had working. After a little tweaking and borrowing the SVG paths from K8oms' output :bowing_man: I came up this. The full-screen icon doesn't dynamically show like it does on the the Google Sites embed example, but it does show the icon on mobile which the Google Sites setup doesn't. :fire:

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

Cool. :partying_face: Now I just need to spin this into a VueJS component and I can have a nice reusable slides player widget. I'm still using Vue 2.x (personal choice for this project... don't hate on me if your personal choices don't line up :pray:). As you can see I also use TypeScript (always :fist_raised:) and yes I'm still using vue-property-decorator. :sunglasses: I'll be moving many things to Vue3 in the new year so I'll update this when that happens.

Without further adieu, here's what the new G-Slides component looks like. :tada: (If the source isn't showing it can be found here: [GSlides](https://github.com/kfinley/KyleFinley.net/blob/main/packages/vue2-client/src/components/GSlides.vue). I'm testing a new [GitHubSourceCode component](https://github.com/kfinley/KyleFinley.net/blob/main/packages/vue2-client/src/components/GitHubSourceCode.vue) that I'll post about as soon as I use it some more and work out any remaining bugs.)

<git-hub-source-code lang="html javascript typescript xml scss" path="https://api.github.com/repos/kfinley/KyleFinley.net/contents/packages/vue2-client/src/components/GSlides.vue"></git-hub-source-code>

And here's how the new G-Slides Vue Component can be used. Pretty simple.

```html
<g-slides
  presentation-id="1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI"
  label="IaC with CDK"
></g-slides>
```

Lastly here's an example of it in action. Below is the exact same tag as above. Which shows my presentation on [Infrastructure as Code with Amazon's Cloud Developer kit](/slides/iac-with-cdk/).

Happy Coding!! :beers:

<g-slides presentation-id="1af5dNWZ1Hwm9ixOrDMwydpC3i5RM2C1auSxVFClneqI" label="IaC with CDK"></g-slides>
