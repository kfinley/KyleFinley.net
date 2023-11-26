<template>
  <div class="container">
    <h1 class="text-center">Kyle Finley's Music</h1>
    <div class="text-center">
      <p>
        <i>Jazz and Americana upright bassist currently slappin' strings around the San Francisco Bay area!!! </i>
      </p>
    </div>
    <h4 class="text-center pt-4">Bands</h4>
    <ul>
      <li>
        <em><router-link to="/dirty-works">Dirty Works Jazz Band</router-link></em> - We play a wide range of classic standards including ballads, blues, bop, soul, funk, swing, latin, and more!
      </li>
      <li>
        <em><router-link to="/standards-trio">The Standards Jazz Trio</router-link></em> - Jazz Trio featuring Zack Sanders on Guitar, Eli Kemp on Drums, and me on bass.
      </li>
      <li>
        <em>Angel Island</em> - Jazz septet with sax, trumpet, flute, guitar, bass, and drums.
      </li>
      <li>
        <em><a href="http://westsidejazzclub.com" target="new">West Side Jazz Club</a></em> - Scott Silverberg on Tenor
        Sax and Vocals backed by bass, guitar, and drums.
      </li>
      <li>
        <em><a href="https://www.fakemelody.com" target="fakemelody">Fake Melody</a></em> - Jazz combo run by Simon Donovan holding down Friday nights at Ivory & Vine. I sub with this group when needed.
      </li>
      <li>
        <em>Midnite Flyte</a></em> - Small jazz combo led by Syd Williams on keys. I sub with this group when needed.
      </li>
      <li>
        <em><router-link to="/dke">The DKE Trio</router-link></em> - Pre-40's jazz, blues, and popular music trio featuring guitarist and singer Daisy Dresner backed by drums and bass.
      </li>
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em>Americana and Bluegrass four piece playing events and private shows around the Bay Area.
      </li>
      <li>
        <em><a href="https://www.gigsalad.com/mission_hill_san_francisco" target="new">Mission Hill</a></em> - Aaron & Richard playing classic Americana and Bluegrass. I sub with this group when needed.
      </li>
    </ul>
    <p class="text-center">Additional recordings can be found on my <br /><router-link to="/media">Media Page</router-link></p>
    <Gigs class="text-center" />
    <h4 class="text-center pt-4">Jams</h4>
    <ul>
      <li>
        <em>Monday Jazz Jam @ <a href="https://waystonesf.com/" target="Shoe">Waystone</a></em> - I host a jazz jam every Monday night at
        the Waystone wine bar in North Beach SF. The house band is Dan Dectis on sax, Richard Caceres on keys, and I'm on bass.
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
        - This was a great jam when Frank Holmes ran it. I enjoyed playing there every week for several years. I don't go anymore.
      </li>
    </ul>
    <div class="text-center">
      <p>Details on background and musical journey can be found on my <router-link to="/music/history">history page</router-link></p>
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
