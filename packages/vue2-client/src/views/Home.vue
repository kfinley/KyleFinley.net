<template>
  <section>
    <div class="jumbotron jumbotron-fluid"></div>
    <div class="container justified-hyphenated">
      <div class="col-12 pt-2">
        <h2 class="text-center"><router-link to="/music">Music</router-link></h2>
        <p>
          Kyle Finley is an upright jazz bassist. Originally from Hope, AR and now splits his time between Hot Springs, AR and San Francisco. You can catch him playing gig and running jazz jams in the San Francisco area. Kyle's been a bassist for over 30 years, guitar for the same, and trombone even longer. After too many years keeping music playing only at home and putting away the uprightKyle plays with several groups and runs The Dirty Works Jazz Band playing gigs and hosting several jazz jams a week. Details on bands and jams as well as his full schedule can be found on the <router-link :to="{ name: routes.Music }">Music Page</router-link>.
        </p>
        <p>
          Kyle is primarily an upright bassist focusing on classic jazz, mostly bebop, hard bop, and soul jazz, but he's known to venture out into other genres now and then. While bass is his primary, Kyle plays trombone and guitar as well. He also teaches lessons for bass, guitar, and general jazz fundamentals.
        </p>
        <p>
          For booking or lessons contact Kyle via <a href="mailto:Kyle@KyleFinley.net">email</a>.
        </p>
        <p>
         <RegularGigs id="regularGigs" class="text-center" />
        </p>
        <p>
        <h3 class="text-center">
          <router-link to="/music#calendar">View Full Calendar</router-link>
        </h3>
      </p>
        <h2 class="text-center"><router-link :to="{ name: routes.Software }">Software & Tech</router-link></h2>
        <p>
          Before turning focus back to music Kyle has been working in and out of tech for over 25 years. He started working in networking then moved to software where he worked as a consultant and then into startup land helping build many software product systems. He's worn many hats and has worked heads down designing and building product as well as hand in hand with clients as a consultant or contractor. Having worked in several industries he has a wide breadth of knowledge and experience using technology to solve problems. Some of these industries include: online food ordering & delivery, clothing retail, fundraising, sports software, online-dating. Kyle has been able to apply fundamentals of using a well defined product development system with software product development principles in order to build quality systems at breakneck speed. Currently music and his music related businesses are Kyle's main focus but software is always there in some capacity.
        </p>
        <p>To find out what Kyle is working on check out his <router-link :to="{ name: routes.Software }">software page</router-link>.</p>
        <!--
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
      -->
        <h2 class="text-center">Board Sports<br /><i>Skate | Kite | Snow | Standup Paddle</i></h2>
        <p>
          Kyle is a life long boarder. He started skating when he was about 6, learning from guys at the local bike tracks. He started snowboarding at 13 and
          has been kiteboarding 20 years. He's kiteboarded almost every coastal state in the US and several of the inland
          states. Kyle has taught kiteboarding both privately and with a few kite schools on the east and west coast.
        </p>
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
