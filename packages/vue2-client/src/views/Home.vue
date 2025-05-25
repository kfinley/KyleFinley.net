<template>
  <section>
    <div class="jumbotron jumbotron-fluid"></div>
    <div class="container justified-hyphenated">
      <div class="col-12 pt-2">
        <!--<h2 class="text-center"><router-link to="/music">Music</router-link></h2>-->
        <p>
          Kyle Finley is a Jazz &amp; Bassist actively gigging around the San Francisco Bay Area. Kyle plays with several groups and runs the Dirty Works Jazz Band hosting a several jazz jams a week. Details on the bands, jams, and gigs he's actively working with can be found on his <router-link :to="{ name: routes.Music }">Music Page</router-link>.
        </p>
        <p>
          Kyle is primarily an upright bassist focusing on classic jazz, mostly bebop, hard bop, and soul jazz, but he's known to venture out into other genres now and then. While bass is his primary, he plays trombone and guitar as well as teaches bass &amp; jazz fundamentals &amp; theory lessons.
        </p>
        <p>
         <RegularGigs id="regularGigs" class="text-center" />
        </p>  
        <p>
        <h3>
          <router-link to="/music#calendar">View Full Calendar</router-link>
        </h3>
      </p>
        <!--
        <h2 class="text-center"><router-link :to="{ name: routes.Software }">Software</router-link></h2>
        
        <p>
          I've been a software developer now for over 20 years. It's been an adventure! I've watched the internet grow and industries form.
          I've worked on lots of things and have worn many hats. I have lots of ideas and many opinions. Sometimes I write them down but as
          a songwriter friend told me once "Ya know the problem is, nobody really cares!" Good point....
        </p>
        <p>To find out what I'm working on lately check out my <router-link :to="{ name: routes.Software }">software page</router-link>.</p>
        <h2 class="text-center"><a href="https://acarnamedsu.com" target="Su">Traveling</a></h2>
        <p>
          I enjoy traveling a lot but I don't travel as much as I used to. I was a weekly flying consultant for years, active in the Couch
          Surfing scene for a bit, and I've driven around most of the country. I've road tripped around the Gulf of Mexico and up the east
          coast in a Jeep Wrangler while kiteboarding every state. Lately I've been exploring the West and SW in my Gen 2 Subaru Outback
          wagon named Su.
        </p>
        <p>More info about our adventures in Subie Su can be found at <a href="https://acarnamedsu.com" target="Su">ACarNamedSu.com</a>.</p>

        <h2 class="text-center">Photography</h2>
        <p>
          I've enjoyed photography and have been into it since I was a kid. Some of my earliest memories of shooting photos was running
          around my family's lake house shooting pictures with a small "spy" camera I got when I was probably 7. I learned how to develop
          black &amp; whites in high school but then the digital camera revolution started so I just took point and click shots for a while.
          I eventually got a DSLR in 2011 and started to relearn how to really use a camera. I'm a casual photographer and rarely do paid
          gigs but I enjoy shooting outdoors, night cityscapes, low light cocktails &amp; bar scenes, live music shows, portraits, and
          action shots.
        </p>
        <h2 class="text-center">Boarding<br /><i>Skate | Kite | Snow | Standup Paddle</i></h2>
        <p>
          I'm a life long boarder. I started skating when I was about 6 and haven't stopped yet! I started snowboarding when I was 13 and
          I've been kiteboarding now for almost 20 years. I've kiteboarded almost every coastal state in the US and several of the inland
          states. I don't kite as much as I used to but it's something I still enjoy and have been known to teach students now and then. I
          try to longboard every day and can honestly say I'm on a board 3-5 days a week regularly. No, I don't ride an electric board.
        </p>
        -->
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { RouteNames } from '../router/RouteNames';
import RegularGigs from "./../components/RegularGigs.vue";

@Component({
  components: {
    RegularGigs
  }
})
export default class Home extends Vue {
    routes = RouteNames;
}
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
  font-weight: bold;
}

@media (min-width: 901px) {
  .jumbotron > div > p {
    font-size: larger;
  }
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
</style>
