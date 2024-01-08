<template>
  <article class="article-wrapper" itemscope itemtype="https://schema.org/Article">
    <router-view />
  </article>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import hljs from "highlight.js/lib/core";
import vbscript from "highlight.js/lib/languages/vbscript";
import csharp from "highlight.js/lib/languages/csharp";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import html from "highlight.js/lib/languages/vbscript-html";
import xml from "highlight.js/lib/languages/xml";
import scss from "highlight.js/lib/languages/scss";
import css from "highlight.js/lib/languages/css";

import "highlight.js/styles/github-dark-dimmed.css";

@Component
export default class ArticleLayout extends Vue {
  async mounted() {
    this.handleHighlight();
    this.handlePTags();
    this.rewriteImagesForLocalDev();
  }

  get dke_tracks() {
    return [
      {
        title: "DKE - Bill Bailey",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "132G2xcyEln3pbNJ0G_-fdOLpcY5m6Na-"
      },
      {
        title: "DKE - How'm I Doin'",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1HiEQNwhJ7gCC0_ObID6_8fPtTDx6RscW"
      },
      {
        title: "DKE - She Lived Down By The Firehouse",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1A-8ruiLp4OVULfWVZDarD9FiK-rZz2AA"
      },
      {
        title: "DKE - Railroad Bill",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1VrotkPOOWl9d_lcuUuiJQlH3OoN2A72E"
      },
      {
        title: "Daisy & Friends - They're Red Hot",
        location: "The Lucky Horseshoe Parklet",
        date: "5/23/2023",
        id: "1lxUYS0FjQDNzOsxRZX9N8sTTfl9V-coS"
      },
      {
        title: "Daisy & Friends - San Francisco Bay Blues",
        location: "The Lucky Horseshoe Parklet",
        date: "5/23/2023",
        id: "1FGfj1PeRhzOanu-EY2cZ7JtJ46OIe0tU"
      },
      {
        title: "Parklet Jam (featuring Daisy) - Full Set",
        location: "The Lucky Horseshoe",
        date: "5/23/2023",
        id: "12IlH5Qowx5ZD3Rblp0zyFlT6uk7YOPXu"
      },
      {
        title: "DKE - Coffee Stains (Daisy Original)",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1qXgu2LLOKWxv4RMcKRPc0sJ-rddR_oCN"
      }
    ];
  }

  get dw_tracks() {
    return [
      {
        title: "Dirty Trio (Kyle, Dan, & Richard)",
        location: "Waystone - Set 1",
        date: "1/7/2024",
        id: "1DcdgLm-LRMtA_DMjmr-r9fQDiGh1gxJn"
      },
      {
        title: "Dirty Trio (Kyle, Dan, & Richard)",
        location: "Waystone - Set 2",
        date: "1/7/2024",
        id: "1vp-GRqPQLrmNv2hlq1wWXAMWNd_0FHhu"
      },
      {
        title: "Dirty Trio (Kyle, Dan, & Richard)",
        location: "Waystone - Set 3",
        date: "1/7/2024",
        id: "111zf3bgjB23h5lZzY8poReoxSBCQF4ao"
      },
      {
        title: "Dirty Works",
        location: "Ivory & Vine - Set 1",
        date: "10/14/2023",
        id: "1VV_UhiuHj-ShCjOJrVGVJXdjOI-OLoVG"
      },
      {
        title: "Dirty Works",
        location: "Ivory & Vine - Set 2",
        date: "10/14/2023",
        id: "1nzp4D_U8fLrJrCV2GRjpjZmBNYS5PYXG"
      },
      {
        title: "Dirty Works",
        location: "The Lucky Horseshoe - Set 1",
        date: "10/12/2023",
        id: "1Ho5bZ6MhXAmqkpz8qekHtvS7sdIYTun5"
      },
      {
        title: "Dirty Works",
        location: "The Lucky Horseshoe - Set 2",
        date: "10/12/2023",
        id: "1E_wTZ8RcqC6vIPQ45CwVwNZwj8tyuUxs"
      },
      {
        title: "Dirty Works",
        location: "The Lucky Horseshoe - Set 1",
        date: "9/23/2023",
        id: "1P0mmbzvHFGQOLphkQTGGDfwgi10VcLQ6"
      },
      {
        title: "Dirty Works",
        location: "The Lucky Horseshoe - Set 2",
        date: "9/23/2023",
        id: "1orkYH4ApeDu6rrXdEJ8k6din3EmxC6oj"
      }
    ];
  }

  get shoe_tracks() {
    return [
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 1 ",
        date: "11/15/2023",
        id: "17kN9rNXWzTiPI4uJtxuD3FGVPi0hzfE2"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 2 ",
        date: "11/15/2023",
        id: "1yZlmM4TpmANuMksyYGZypMOXKuc-gzfV"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 1",
        date: "9/20/2023",
        id: "1WtrgM1AGpNquvnkzCr1LQm1rcyTu3IbO"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 2",
        date: "9/20/2023",
        id: "11yqPLaw0q_hxRDkJAqEs9JivzOrY7CMQ"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 1",
        date: "8/16/2023",
        id: "1xbVh1oAb1vkB9aBJBhinxd3bkKX5PwZt"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 2",
        date: "8/16/2023",
        id: "1ao0nJJdz3n2KcfNGnRt7G2laVmJTPuW6"
      },
      {
        title: "Overtime Jazz Jam",
        location: "The Lucky Horseshoe - Set 1",
        date: "7/9/2023",
        id: "1MRZatxHFzORqq2OErVsmVl35XnS90S4g"
      },
      {
        title: "Overtime Jazz Jam",
        location: "The Lucky Horseshoe - Set 2",
        date: "7/9/2023",
        id: "1LneWfZku7cGuFXsGSB4JSVThwgfA4DD3"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 1",
        date: "6/21/2023",
        id: "1X34fVUm6WNwMFvsJaEfXJmdRAOrEH7Gm"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe - Set 2",
        date: "6/21/2023",
        id: "1-6xPClYO2JRSAQ6_zg5BphGiWorhO8J5"
      },
      { title: "Shoe Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "5/17/2023", id: "1YSrIZaYuH0Dufo1wm84YlTIghtuurTxX" },
      { title: "Shoe Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "5/17/2023", id: "1JYubC-BTwk4jkYARl54D46Gez-Wd_hT3" },
      { title: "Shoe Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "4/19/2023", id: "1aD6PFdnn_bLE4mHT2oTJ8bnVhJkA17xH" },
      { title: "Shoe Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "4/19/2023", id: "1qL-CwSJW_j0lT1vlfozhlk9f8bHSXBL1" },
      { title: "Shoe Jazz Jam", location: "The Lucky Horseshoe", date: "3/15/2023", id: "1Ne6Qpm3hVcoquJWvT6X5S56j2wECxH7E" }
    ];
  }

  get waystone_tracks() {
    return [
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 1",
        date: "11/20/2023",
        id: "1OIsfanxKMcrdLngi1i0Xom9LHK5JtGPg"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 2",
        date: "11/20/2023",
        id: "1HhMBZBW7p9H6nitZ2CWa-V3gSpYHvDbg"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 3",
        date: "11/20/2023",
        id: "1Wp5VkdTMe2iiwaq3aTJiDNi8VBKoURyy"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 4",
        date: "11/20/2023",
        id: "1nwB_ACicLzqeD-bXYRh9Hrbd9Er4uKhD"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 1 ",
        date: "11/13/2023",
        id: "1ImnGsPQnFrSpi_0_Ono-qhCuR1Me2gQN"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 2",
        date: "11/13/2023",
        id: "1nwq0Mjq5pMjCKyJ4-00Me5hGsYvFBcX9"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 1",
        date: "11/6/2023",
        id: "1uQ7cqch4nwfdTHuwwffpT3DeYKOOHN7J"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 2",
        date: "11/6/2023",
        id: "1YQAHS_ZJ_FflcIH5YteQoJJsuACS4oRQ"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone - Set 3",
        date: "11/6/2023",
        id: "1YYROim7F_p6VqDLz2Rj6HQ69bmgFedKn"
      }
    ];
  }

  handleHighlight() {
    let shouldHighlight: boolean = false;

    Array.from(document.querySelectorAll("code")).map(code => {
      Array.from(code.classList).map(c => {
        // console.log(c)
        shouldHighlight = this.registerLanguageIfIncluded("vb", "vbscript", vbscript, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("csharp", "csharp", csharp, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("javascript", "javascript", javascript, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("json", "json", json, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("html", "html", html, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("xml", "xml", xml, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("scss", "scss", scss, c) || shouldHighlight;
        shouldHighlight = this.registerLanguageIfIncluded("css", "css", css, c) || shouldHighlight;
      });
    });

    if (shouldHighlight) {
      hljs.highlightAll();
    }
  }

  registerLanguageIfIncluded(langSlug, lang, langRef, c) {
    if (c.includes(langSlug)) {
      // console.log(`Registering ${lang} for ${c}`)
      hljs.registerLanguage(langSlug, langRef);
      return true;
    }
    return false;
  }

  handlePTags() {
    Array.from(document.querySelectorAll(".article-wrapper > div > p")).map(p => {
      // Remove indent for any paragraphs that are 2 lines or less.
      if (p.clientHeight <= 50) {
        p.style["text-indent"] = "0";
      }
      // Remove indent for any images
      if (p.children.length == 1 && p.children[0].localName == "img") {
        p.style["text-indent"] = "0";
      }
    });
  }

  rewriteImagesForLocalDev() {
    //silly hack to be able to run local. Should compile this out...
    document.querySelectorAll("img").forEach(i => {
      i.src = i.src.replace("media", "@fs/vite-client/media");
    });
  }
}
</script>

<style lang="scss">
.article-wrapper {
  padding: 2em;
}

.article-wrapper > div > p {
  text-indent: 15px;
  text-align: justify;
  text-justify: auto;

  -webkit-hyphens: auto;
  -webkit-hyphenate-limit-before: 3;
  -webkit-hyphenate-limit-after: 3;
  -webkit-hyphenate-limit-chars: 6 3 3;
  -webkit-hyphenate-limit-last: always;
  -webkit-hyphenate-limit-zone: 8%;

  -moz-hyphens: auto;
  -moz-hyphenate-limit-chars: 6 3 3;
  -moz-hyphenate-limit-lined: 2;
  -moz-hyphenate-limit-last: always;
  -moz-hyphenate-limit: 8%;

  -ms-hyphens: auto;
  -ms-hyphens-limit-chars: 6 3 3;
  -ms-hyphens-limit-lines: 2;
  -ms-hyphens-limit-last: always;
  -ms-hyphens-limit-zone: 8%;

  hyphens: auto;
  hyphenate-limit-chars: 6 3 3;
  hyphenate-limit-lies: 2;
  hyphenate-limit-last: always;
  hyphenate-limit-zone: 8%;
}

.article-wrapper > div > div > p > img {
  max-width: 99%;
  border-radius: 6px;
}

blockquote {
  font: 14px/22px normal helvetica, sans-serif;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 50px;
  padding-left: 15px;
  border-left: 3px solid #ccc;
}
</style>
