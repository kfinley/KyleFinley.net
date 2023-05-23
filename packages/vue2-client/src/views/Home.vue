<template>
  <section>
    <div class="jumbotron jumbotron-fluid">
      <div class="container">
        <h1 class="display-4">Kyle Finley</h1>
        <p>Musician, Traveler, Software Developer, Photographer, Skate & Kiteboarder</p>
      </div>
    </div>
    <div class="container">
      <div class="col-12 pt-2">
        <h2>Music</h2>
        <p>
          My main ax is upright bass but I started playing trombone when I was 12. I picked up the guitar and bass shortly thereafter
          playing lots of rock &amp; grunge. I moved from electric bass to upright in early high school and was pretty active through
          college playing in big bands and jazz combos. Music took a backseat in my 20s and early 30s but I've been back at it more
          seriously for more several years now and I've moved out of the woodshed and back onto the stage! I got my chops back playing
          bluegrass with the Jamaica Plain jam in Boston (lately they play Sundays at the Turtle Creek Brewery or at the JP pond), then I
          got back to jazz after moving to across the country to SF. Lately I play in a few groups and host a monthly Jazz Jam at The Lucky
          Horseshoe in Bernal Heights. More info and upcoming shows can be found on my <router-link to="/Music">Music Page</router-link>
        </p>
        <h2>Traveling</h2>
        <p>
          I've been a traveler for most of my adult life. I flew around the country as a consultant for 5 years out of college and found the
          CouchSurfing community very early on. I've driven around most of the country in my Jeep Wrangler or more lately Gen 2 Subaru
          Outback wagon. These days I do lots of driving between the west coast, Colorado, and my home state down south. I enjoy camping on
          public land as much as possible and stand up paddleboarding as many remote places as I can (Horseshoe Springs, NV is a great
          spot!).
        </p>
        <h2>Software Development</h2>
        <p>
          When I choose to work I'm a software developer. I started out with tech in high school and worked for my hometown school district
          wiring old school buildings and installing servers. In college I was a TA for the programming courses in the business school and
          moved from sysadmin work to building software for all sorts of things (help ticket systems, contact management systems, automated
          workflows, etc.). After college I worked as a consultant with a major US based firm for about 5 years then I moved into the crazy
          world of tech startups. I've worked for lots of crazy startups! I mostly enjoy building transaction based systems, financial
          platforms, e-commerce systems, food order / delivery systems, web scrapping / data harvesting, sports community and coaching
          systems, DevOps related stuff, and some data related things. I'm a recovering Agile Practitioner and prefer working with pure
          Kanban in a Lean Software Process derived from the Toyota Product System principles.
        </p>
        <h2>Photography</h2>
        <p>
          I've been into photography since I was a kid. Some of my earliest memories of shooting photos was running around my family's lake
          house shooting pictures with a small "spy" camera I got when I was probably 7. I learned how to develop black &amp; whites in high
          school but then the digital camera revolution started so I just took point and click shots until I got a DSLR in my 30s. I'm a
          casual photographer and rarely do paid gigs but I enjoy shooting outdoors, night time cityscapes, low light cocktails &amp;
          bartenders, live music shows, portraits, and action shots.
        </p>
        <h2>Skate, SUP, Snow, Kiteboarding</h2>
        <p>
          I'm a life long boarder. I started skating when I was about 6 and haven't stopped yet! I started snowboarding in jr. high and I've
          been kiteboarding now for almost 20 years. I've kiteboarded almost every coastal state in the US and several of the inland states
          as well. I don't kite as much as I used to but it's something I still enjoy and have been known to teach students now and then. I
          try to longboard every day and can honestly say I'm on a board 3-5 days a week regularly. I don't ride an electric and tend to do
          3-5 miles of pushing when I go for a good skate.
        </p>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component
export default class Home extends Vue {}
</script>

<style lang="scss">
section {
  padding: 0px 0;
  overflow: hidden;
}

.jumbotron {
  background-image: url("../../../../media/images/heros/kyle-finley-wy.jpg");
  background-size: cover;
  height: 80vh;
}

.jumbotron > div > p {
  color: rgb(67, 64, 64);
}

@media (max-width: 900px) {
  .jumbotron {
    height: 50vh;
  }
  .jumbotron > div > p {
    max-width: 37vw;
    background: white;
    padding: 8px;
    border-radius: 10px;
    opacity: 0.6;
  }
}

@media (max-width: 640px) {
  .jumbotron {
    height: 28vh;
  }
  .jumbotron > div > p {
    max-width: 50vw;
    background: white;
    padding: 8px;
    border-radius: 10px;
    opacity: 0.6;
  }
}

.container > div > p {
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
</style>
