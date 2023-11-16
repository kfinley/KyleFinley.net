<template>
  <div class="container">
    <h1 class="text-center">My Music</h1>
    <div class="text-center">
      <p>
        <i>Jazz, Bluegrass, and Americana upright bassist currently slappin' strings around the San Francisco Bay area! </i>
      </p>
      <p>Recordings can be found on my <br /><router-link to="/media">Media Page</router-link></p>
    </div>
    <Gigs class="text-center" />
    <h4 class="text-center pt-4">Bands</h4>
    <ul>
      <li>
        <em>Dirty Works Jazz Band</em> - This is a group I run that's rooted around the Lucky Horseshoe jazz jam core players. We're
        anything from a trio to a quintet featuring me on bass, Eli on drums, Jonathan on piano,
        <a href="https://goldengatejams.com" target="new">Dan Dectis</a> on alto sax, and Peter on trumpet. We play ar range of classic
        standards including ballads, bop, soul, funk, swing, latin, and more!
      </li>
      <li>
        <em>The Standards Jazz Trio</em> - Jazz Trio featuring Zack Sandars on Guitar, Eli Kemp on Drums, and me on bass. You can check out
        <a href="https://zacksanders.bandcamp.com/album/standards-trio-live-in-sf" target="live"
          >our live album recorded at Le Petit Paris 75</a
        >
        for a sample of our sound.
      </li>
      <li>
        <em>Angel Island</em> - We play jazz standards for the community and tourists in the park at the Conservatory of Flowers Tunnel.
        This group has been playing in GG park for several years. We also play other gigs when we can get them.
      </li>
      <li>
        <em><a href="http://westsidejazzclub.com" target="new">West Side Jazz Club</a></em> - This group is run by Scott Silverberg on Tenor
        Sax and Vocals. We gig around the Bay Area.
      </li>
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em> - Band for hire!
        Four piece featuring Joan Wilson Rueter on fiddle, Ian Epstein on guitar, and Steve Owen on dobro.
      </li>
      <li>
        <em><a href="https://www.fakemelody.com" target="fakemelody">Fake Melody</a></em> - Now and then I'll fill in with this SF based
        jazz group run by Simon Donovan. You can catch this group at Ivory & Vine on Friday nights.
      </li>
      <li>
        <em><a href="https://www.gigsalad.com/mission_hill_san_francisco" target="new">Mission Hill</a></em> - Once in a blue moon I'm
        privileged to fill in on bass with Aaron & Richard playing originals and classic Americana/Bluegrass.
      </li>
      <li>
        <em>DKE</em> - Daisy, Kyle, &amp; Eli. Old school jazzy folky funky fun with Daisy on guitar, Eli on drums, &amp; me on bass. We
        played together through the spring of 2023 before Daisy went back to being a world traveler.
      </li>
    </ul>
    <h4 class="text-center pt-4">Jams</h4>
    <ul>
      <li>
        <em>Monday Jazz Jam @ <a href="https://waystonesf.com/" target="Shoe">Waystone</a></em> - I host a jazz jam every Monday night at
        the Waystone wine bar in North Beach SF. The house band is myself on bass, Dan Dectis on sax, Richard Caceres on keys. Currently our
        drummer a hi-hat that I stomp on... we've named him H.H. Yardman.
      </li>
      <li>
        <em>Open Jazz Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em> - I run this jam at
        the Shoe ever 3rd Wednesday of the month. We try to make this the chillest jam in town. We play classic standards from every era.
        The Dirty Works trio is the core house band and we always have great group of players come through.
      </li>
      <li>
        <em><a href="https://goldengatejams.com" target="new">Community Music Hangout</a></em> - Weekends from 11am-2pm in Golden Gate Park
        near Stowe Lake on JFK run by Dan Dectis.
      </li>
      <li><em>Ocean Ale House Jazz Jam</em> - Weekly Jazz Jam on Wednesday Nights in Monterey Heights</li>
      <li>
        <em><a href="http://madroneartbar.com/" target="new">Madrone</a> Jazz Jam</em> - Weekly Jazz Jam on Sunday nights at Madrone Art Bar
        in Alamo Square. I don't go to this one very often and prefer having overtime jazz at the Shoe on Sundays if possible.
      </li>
      <li>
        <em>Showcase Bluegrass Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em> - This used
        to be every 1st Sunday of the month from 8-9:30pm but it hasn't been running for a while now.
      </li>
      <li><em>The Hotel Utah Saloon Weekly Bluegrass Jam</em> - Every Tuesday from 7pm 'til done</li>
      <li><em>Woody Lauer's Bluegrass Jam @ Amado's</em> - Every Wednesday from 7-10pm</li>
      <li>
        <em>Sunday Bluegrass Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em>
        - This was a great jam when Frank Holmes ran it and I enjoyed playing there every week for several years. I don't go anymore.
      </li>
    </ul>
    <div class="text-center">
      <p>More info on my journey as a musician can be found on my <br /><router-link to="/music/history">history page</router-link></p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
