<template>
  <div class="container">
    <div class="text-center">
      <p>
        <i
          >I'm a Jazz and Americana upright bassist currently slappin' strings around the San Francisco Bay area. I'm in a few bands and run
          a couple of jazz jams. My gig schedule can be found below.</i
        >
      </p>
    </div>
    <h4 class="text-center pt-4">Active Bands</h4>
    <ul>
      <li>
        <em><router-link to="/dirty-works">Dirty Works Jazz Band</router-link></em> - This is the group I run. I use this group for jams as well as 
        gigs. We play a wide range of classic standards including bop, blues, ballads, soul, funk, swing, latin, and more!
      </li>
      <li>
        <em><router-link to="/standards-trio">The Standards Jazz Trio</router-link></em> - Jazz Trio featuring Zack Sanders on Guitar, Eli
        Kemp on Drums, and me on bass.
      </li>
      <li>
        <em><router-link to="/dke">The DKE Trio</router-link></em> - Pre-40's jazz, blues, and popular music trio featuring guitarist and
        singer Daisy Dresner backed by drums and bass.
      </li>
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em> - Americana and
        Bluegrass four piece playing events and private shows around the Bay Area.
      </li>
      <li>
        <em><a href="https://californiabluegrass.org" target="CBA">California Bluegrass Association</a> Volunteer Band</em> - Once a month
        or so I play with fellow bluegrass players at the Pomeroy Rec &amp; Rehab Center in SF.
      </li>
    </ul>
    <!-- <p class="text-center">Additional recordings can be found on my <br /><router-link to="/media">Media Page</router-link></p> -->
    <Gigs id="calendar" class="text-center" />
    <h4 class="text-center pt-4">Regular Gigs & Jams</h4>
    <ul>
      <li>
        <em
          ><router-link to="/waystone-jazz-jam">Dirty Works Jazz Jam</router-link> @
          <a href="https://waystonesf.com/" target="Shoe">Waystone</a></em
        >
        - I host a jazz jam every Monday night at the Waystone wine bar in North Beach SF. The house band is Dan Dectis on sax, Richard
        Caceres on keys, and I'm on bass.
      </li>
      <li>
        <em
          ><router-link to="/waystone-jazz-jam">Dirty Works Trio & Friends</router-link> @
          <a href="https://waystonesf.com/" target="Shoe">Waystone</a></em
        >
        - Once a month or so we play at Waystone on a Tuesday night as the Dirty Works Jazz Trio featuring various lead players from our Monday night jam.
      </li>
      <li>
        <em
          ><router-link to="/shoe-jazz-jam">Shoe Jazz Jam</router-link> @
          <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em
        >
        - I run this jam ever 3rd & 4th Wednesday of the month. We try to make this the chillest jam in town. We play classic standards from every
        era. The Dirty Works trio is the core house band and we always have great players come through this jam.
      </li>
      <li>
        <em
          >Dirty Works Jazz Jam @
          <a href="https://www.persona-sf.com/" target="Persona">Persona</a></em
        >
        - Every Thursday night the Dirty Works Quartet plays at Persona in downtown SF from 8 to 11pm. After this we scale down to the Dirty Works Trio 
        bringing in Zack Sanders on guitar and open up the set as a jam session from 11:30 to 1:30am.
      </li>
      <li>
        <em><a href="https://goldengatejams.com" target="new">Community Music Hangout</a></em> - Weekends from 11am-3pm in Golden Gate Park
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
      <li>
        <em>Sunday Bluegrass Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em>
        - This was a great jam when Frank Holmes ran it. I enjoyed playing there every week for several years. I don't go anymore.
      </li>
    </ul>
     <h4 class="text-center pt-4">Groups I've Played with</h4>
    <ul>
      <li>
        <em>Angel Island - Golden Gate Park Jazz septet with saxes, trumpet, flute, guitar, bass, and drums.</em
      </li>
      <li>
        <em><a href="https://www.fakemelody.com" target="fakemelody">Fake Melody</a></em> - Jazz combo run by Simon Donovan.
      </li>
      <li><em>Midnite Flyte</em> - Small jazz combo led by Syd Williams on keys.</li>
      <li>
        <em><a href="https://www.gigsalad.com/mission_hill_san_francisco" target="new">Mission Hill</a></em> - Aaron & Richard playing
        classic Americana and Bluegrass.
      </li>
      <li>
        <em><a href="http://www.trikonautband.com" target="trickonaut">Trikonaut</a></em> - Jazz, Latin, Blues, and More!
      </li>
      <li>
        <em><a href="http://westsidejazzclub.com" target="new">West Side Jazz Club</a></em> - Scott Silverberg on Tenor Sax and Vocals
        backed by bass, guitar, and drums.
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
