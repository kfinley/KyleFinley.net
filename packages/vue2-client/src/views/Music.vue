<template>
  <div class="container">
    <div class="text-center">
      <p>
        <i
          >I'm Kyle... The Bass Dude. I'm a Jazz upright bassist. I play with a few groups, fill in with groups when needed, and I run
          a half a dozen jazz jams around San Francisco. My schedule can be found below.</i
        >
      </p>
    </div>
    <h4 class="text-center pt-4">Active Groups</h4>
    <ul>
      <li>
        <em><router-link to="/dirty-works">Dirty Works Jazz Band</router-link></em> - This is the group I run. I use this group for jams as well as 
        gigs. We're a straight ahead jazz group focusing on the classic era of Jazz (1950-65). Swing, Harb-Bop, & Soul Jazz are our focus.
      </li>
      <li>
        <em>The Monk & Atonal Funk Trio</em> - A collaboration between Kyle Finley & Steve Dukes exploring the works of Theloneous Monk and Steve's own compositions. The group plays acoustically and comprises guitar, bass flute, and double bass. 
      </li>
      <li>
        <em>Viajó de la Musica Quartet</em> - When needed I join Tom Renner with his group playing gigs around SF.
      </li>
      <li>
        <em>Kyle Tom Jazz Trio</em> - When I can I join Kyle Tom with his trio at the Cordial Cellar and Lounge in Castro Valley.
      </li>
      <li>
        <em><a href="https://californiabluegrass.org" target="CBA">California Bluegrass Association</a> Volunteer Band</em> - Once a month
        or so I volunteer to play with some bluegrass players at the Pomeroy Rec &amp; Rehab Center in SF. Even after late night gigs this morning show always feels good.
      </li>
    </ul>
    <!-- <p class="text-center">Additional recordings can be found on my <br /><router-link to="/media">Media Page</router-link></p> -->
    <Gigs id="calendar" class="text-center" />
    <h4 class="text-center pt-4">Regular Gigs & Jams</h4>
    <ul>
      <li>
        <em
          >Dirty Works Jazz Jam @
          <a href="https://www.persona-sf.com/" target="Persona">Persona</a></em
        >
        - Every Monday night the Dirty Works hosts Jazz at Persona in downtown SF from 8 to 1:30am. This was formally a Thursday gig but we've moved to Monday nights as of July 2025. Jammers are welcome to join us all night long!
      </li>
      <li>
        <em>Dirty Works & Friends @ 
          <a href="https://1920bar.square.site" target="1920">1920 Bar</a></em
        >
        - Tuesday nights Dirty Works hosts the only jazz night in San Francisco's Richmond District at 1920 Bar on Clement. Often Steve Dukes joins Kyle and plays tunes from their trio Monk & Atonal Funk. We always jam out starting around 7:30.
      </li>
      <li>
        <em
          ><router-link to="/shoe-jazz-jam">Shoe Jazz Jam</router-link> @
          <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em
        >
        - Jazz Jam every 3rd, 4th, & 5th Wednesday of the month  We play classic jazz standards. June & July we will also be there on the 2nd Wednesdays.
      </li>

      <li>
        <em
          >Dirty Works & Friends @ <a href="https://vinorosso-sf.com/" target="vinorosso">Vinorosso></a></em
        >
        - The first Saturday of the month Dirty Works Jazz Band plays at the Vinorosso wine bar in Bernal Heights from 5-7pm. Players are invited to join the band.
      </li>
      <li>
        <em
          >Dirty Works Jazz Jam @ Progressive Grounds</em
        >
        - Jazz jam every 1st & 3rd Sunday from 2-5pm. 
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
        <em>Open Mic Sundays @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em> - After the bluegrass jam on Sundays the stage is open for musicians and other performers to jump up and share. All styles welcome.
      </li>
      <li><em>The Hotel Utah Saloon Weekly Bluegrass Jam</em> - Every Tuesday from 7pm 'til done</li>
      <li>
        <em>Sunday Bluegrass Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em>
        - This is the longest running bluegrass jam in San Francisco. This jam is run by a great crew and Mr. Frank Holmes is back leading the band as often as he can. This jam is back on track and kickin just about as strong as ever! 
      </li>
      <li>
        <em>Thursday Bluegrass Jam @ <a href="https://www.theliberties.com" target="Liberties">The Liberties</a></em>
        - Thursday nights you can find a small group of pickers in the parklet or some other area of the bar followed by a showcase group of local bluegrass and folk players. 
      </li>
    </ul>
     <h4 class="text-center pt-4">Groups I've Played with</h4>
    <ul>
      <li>
        <em><router-link to="/standards-trio">The Standards Jazz Trio</router-link></em> - Jazz Trio featuring Zack Sanders on Guitar, Eli
        Kemp on Drums, and Kyle on bass.
      </li>
      <li>
        <em><router-link to="/dke">The DKE Trio</router-link></em> - Pre-40's jazz, blues, and popular music trio featuring guitarist and
        singer Daisy Dresner backed by drums and bass.
      </li>
      <li>
        <em>Angel Island</em> - Golden Gate Park Jazz septet with saxes, trumpet, flute, guitar, bass, and drums.
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
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em> - Americana and
        Bluegrass four piece playing events and private shows around the Bay Area.
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
