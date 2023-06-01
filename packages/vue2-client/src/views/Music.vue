<template>
  <div class="container">
    <h1 class="text-center">Kyle Finley - Musician</h1>
    <p>
      <i
        >Jazz, Bluegrass, and Americana upright bassist currently slappin' strings around the San Francisco Bay area. Recordings can be
        found on my <router-link to="/media">Media Page.</router-link></i
      >
    </p>
    <Gigs class="text-center" />
    <h4 class="text-center pt-4">Bands &amp; Jams</h4>
    <ul class="bands">
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em> - Band for hire!
        Four piece featuring Joan Wilson Rueter on fiddle, Ian Epstein on guitar, and Steve Owen on dobro
      </li>
      <li>
        <em><a href="http://westsidejazzclub.com/" target="new">West Side Jazz Club</a></em> - Thursday &amp; Friday nights at
        <a href="https://www.ulasf.com" target="new">Ula SF</a> in Union Sq. (I'm new to the rotation and playing a lot lately!)
      </li>
      <li><em>The Lucky Horseshoe Open Jazz Jam</em> - Every 3rd Wednesday of the Month 8-11pm</li>
      <li><em>The Lucky Horseshoe Sunday Bluegrass Jam</em> - Every Sunday 4-7pm</li>
      <li>
        <em>The Lucky Horseshoe Showcase Bluegrass Jam</em> - 1st Sunday of the month from 8-9:30pm (currently in hiatus but hopefully back
        soon!)
      </li>
      <li><em>The Hotel Utah Saloon Weekly Bluegrass Jam</em> - Every Tuesday from 7pm 'til done</li>
      <li><em>Woody Lauer's Bluegrass Jam @ Amado's</em> - Every Wednesday from 7-10pm</li>
      <li>
        <em><a href="https://goldengatejams.com" target="new">Community Music Hangout</a></em> - Weekends from 11am-2pm in Golden Gate Park
        near Stowe Lake on JFK
      </li>
      <li>
        <em>Golden Gate Jazz Sextet w Guitar Scott</em> - I'm currently a fill in bassist when Scott needs a player. This group has been
        playing in GG park on Friday's at the Conservatory of Flowers tunnel for several years
      </li>
      <li>
        <em>DKE</em> - Daisy, Kyle, &amp; Eli. Old school jazzy folky funky fun with Daisy on guitar, Eli on drums, &amp; me on bass. We
        played together through the spring of 2023 before Daisy went back to being a world traveler
      </li>
      <li><em>Ocean Ale House Jazz Jam</em> - Weekly Jazz Jam on Wednesday Nights in Monterey Heights</li>
      <li><em>Madrone Jazz Jam</em> - Weekly Jazz Jam on Sunday nights at Madrone Art Bar in Alamo Square</li>
    </ul>

    <h4 class="text-center">My Musical Journey</h4>
    <p>
      I've been playing music now for over 30 years. I grew up as a typical band kid hiding out in the band hall with the other cool kids.
      I'm lucky and come from good stock of musical talent so playing music came pretty naturally for me. When I was 12 I joined beginner
      band at school and picked the trombone because that's what my dad played. He let me use his Bach Stradivarius he bought in high school
      after he quit playing football due to a serious game injury. I played his horn through high school and college, then it was almost
      lost in a house fire so he asked for it back to hold for safe keeping. Luckily I now have my father's horn back and I'm actively
      chopping wood in Golden Gate Park with the goal of playing my first public shows soon!
    </p>
    <p>
      I started playing bass because of people like Cliff Burton, Les Claypool, and Flea. When I was about 13 I got a cheap electric bass
      guitar (and an even cheaper garage sale acoustic guitar). I started taking lessons from my friend and band director
      <a href="http://jeffmadlock.com" target="Jeff">Jeff Madlock</a> and he started grooming me for high school jazz band. I continued with
      guitar, and still play it a lot, but after moving to upright bass in early high school I've considered myself primarily a bass player.
    </p>
    <p>
      In high school I was a 3 time All-State Jazz Band member from it's inaugural year through graduation. I also made All-State Orchestra
      on Bass without ever playing in an orchestra before and performed in both the Jazz and Orchestra bands the same weekend. I received
      both the John Philip Sousa and Louis Armstrong Jazz Award my senior year. I also attended the Jamey Aebersold Jazz Camp in 1995 which
      was where I learned how to walk bass lines from Jamey Aebersold himself (the dude played everything).
    </p>
    <p>
      I took music pretty seriously through the end of high school was set to attend the University of North Florida with a full ride for
      jazz studies but for various reasons decided to focus on tech stuff in college and ended up starting at the University of North Texas.
      I bounced around schools a bit and landing at the University of Colorado where I played in one of the CU Jazz Combos under Chip
      Stephens. Unfortunately I let music fall to the back burner after school but I got serious about it again several years ago and I'm
      now out of the woodshed and back on the stage!
    </p>
    <p>
      After an overpriced botched overhaul in 2012 of my bass I was so upset I couldn't even play it and it sadly sat in the corner for
      another 6 years. (Don't ever use or trust Upton... just saying.) After randomly meeting a Berklee Comp kid while kiteboarding at the
      beach in Boston, he invited me to play bass at a bluegrass jam in Jamaica Plain. I thought it'd be a good place to get my chops back
      so I started playing with them weekly. They're a great crew and lately they play Sundays at the Turtle Creek Brewery or at the JP pond
      in the summer.
    </p>
    <p>
      I landed in SF in the summer of 2019 and found The Lucky Horseshoe weekly bluegrass jam run by Frank Holmes my first week in town. I
      was the regular bass player for the Shoe Jam through the pandemic and into it's transition to a new leader. Now I still play the jam
      most weeks but I don't play the full 3 hour gauntlet anymore! I started focusing on jazz in the last few years and these days I'm
      playing in a few groups around SF and I host a monthly Jazz Jam at The Lucky Horseshoe in Bernal Heights every 3rd Wednesday of the
      month.
    </p>
    <p>
      I'm available for hire and looking for players to form both a regular gigging jazz group and a progressive bluegrass / Americana
      group. You can reach me directly at <a href="mailto:kyle@kylefinley.net">Kyle@KyleFinley.net</a>.
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import Gigs from "./Gigs.md";
import Gigs from "./../components/Gigs.vue";

@Component({
  components: {
    Gigs
  }
})
export default class Music extends Vue {}
</script>

<style lang="scss">
li > em {
  font-weight: bold;
}
h2 {
  padding-top: 10px;
}

table {
  min-width: 250px;
  display: inline-table;
  margin-top: 12px;
}

th:nth-child(1) {
  background: rgb(49, 119, 197);
  border-radius: 5px;
  color: white;
}

tr:nth-child(1) {
  font-style: italic;
  font-weight: bold;
}
tr:nth-last-child(1) {
  font-style: italic;
}
</style>
