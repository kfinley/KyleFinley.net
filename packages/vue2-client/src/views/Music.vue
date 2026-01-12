<template>
  <div class="container">
    <div class="text-center">
      <p>
        <i>I'm Kyle... The Bass Dude. I'm a primarily a jazz upright bassist and also play trombone, guitar, and sometimes drums. I play with a few groups, sub when needed, and run jazz jams around San Francisco. My schedule can be found below.</i>
      </p>
    </div>
    <h4 class="text-center pt-4">Active Groups</h4>
    <ul>
      <li>
        <em><router-link to="/dirty-works">Dirty Works Jazz Band</router-link></em> - This is the group I run. I use
        this group for my jams as well as gigs. We're a modern straight ahead jazz group focusing on the classic era of Jazz (40's to 60's). Bebob, Harb-Bop, & Soul
        Jazz are our roots. We swing harder than a tree in a storm.
      </li>
      <li>
        <em>Viajó de la Musica Quartet</em> - Sometimes I sit in with the group at Scope Divino on Thursdays.
      </li>
      <li>
        <em>Renner Quartet</em> - The 1st Wednesday of the month you can find me at Paris 75 in SF's historic North Beach with Renner on Tenor and
        his Quartet.
      </li>
      <li>
        <em>Kyle Tom Jazz Trio</em> - When I can, I join Kyle Tom with his trio at the Cordial Cellar and Lounge in
        Castro Valley.
      </li>
      <li>
        <em><a href="https://californiabluegrass.org" target="CBA">California Bluegrass Association</a> Volunteer
          Band</em> - Once a month
        or so I volunteer to play with some bluegrass players at the Pomeroy Rec &amp; Rehab Center in SF. Even after
        late night gigs this morning show always feels good.
      </li>

    </ul>
    <!-- <p class="text-center">Additional recordings can be found on my <br /><router-link to="/media">Media Page</router-link></p> -->
    <Gigs id="calendar" class="text-center" />
    <h4 class="text-center pt-4">Regular Gigs & Jams</h4>
    <ul>
      <li>
        <em>Dirty Works Jazz Jam @
          <a href="https://www.persona-sf.com/" target="Persona">Persona</a></em>
        - Monday night the Dirty Works hosts Jazz at Persona in downtown SF from 8 to 1:30am. Persona is a great basement cocktail bar with lots of room and a good vibe. We showcase singers at this jam and instrumentalists are welcome to join us all night long!!
      </li>
      <li>
        <em><router-link to="/shoe-jazz-jam">The Shoe Jazz Jam</router-link> @
          <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky Horseshoe</a></em>
        - Jazz Jam every 2nd, 3rd, 4th, & 5th Wednesdays of the month. If you know the Shoe then you know what the vibe is. The jam typically runs from 8 to
        to after 11PM.
      </li>
      <li>
        <em>Renner Quartet @ <a href="https://lppsf.com" target="Le Petit">Le Petit Paris 75</a></em>
        - Tom Renner leads his quartet at the classic North Beach bar Paris 75 on the 1st Wednesday of the month.
      </li>
      <li>
        <em>Dirty Works & Friends @ 
          <a href="https://lppsf.com" target="Le Petit">Le Petit Paris 75</a></em>
        - The 1st & 3rd Thursdays of the month the Diryt Works Jazz band takes over Paris 75 for an open jazz jam. We feature our regular players plus guests & sometimes dancers! Come check it out for a classic North Beach good time!!
      </li>
      <li>
        <em>Dirty Works Acoustic Jazz Jam @ Hop Oast</em>
        - Some Fridays there's a small acoustic jam at the Hop Oast brewery. This is a very casual jam and runs from 5
        to 7. Currently not every Friday... Check with me if we're going to be jamming or not.
      </li>
      <li><em>Ocean Ale House Jazz Jam</em> - Weekly Jazz Jam on Wednesday Nights in Monterey Heights</li>
      <li>
        <em><a href="http://madroneartbar.com/" target="new">Madrone</a> Jazz Jam</em> - Weekly Jazz Jam on Sunday
        nights at Madrone Art Bar in Alamo Square. This is known as "The" jam in town and you can find most the younger players here doing their thing.
      </li>
      <li>
        <em><a href="https://goldengatejams.com" target="new">Community Music Hangout</a></em> - Weekends from Noon-3pm
        in Golden Gate Park near Stowe Lake on JFK run by Dan Dectis.
      </li>
      <li>
        <em>Sunday Bluegrass Jam @ <a href="https://www.theluckyhorseshoebar.com/" target="Shoe">The Lucky
            Horseshoe</a></em>
        - This is the longest running bluegrass jam in San Francisco. The jam is run by a great crew and Mr. Frank
        Holmes is back leading the band as often as he can. This jam is back on track and kickin just about as strong as
        ever!
      </li>
    </ul>
    <h4 class="text-center pt-4">Groups I've Played with</h4>
    <ul>
      <li>
        <em><a href="https://www.thebash.com/bluegrass/nobodyfromnashville" target="new">Nobody From Nashville</a></em>
        - Americana and
        Bluegrass four piece playing events and private shows around the Bay Area.
      </li>
      <li>
        <em>Atonal Funk Trio</em> - Explorations in the avant garde music of Steve Dukes (John Cage's last student). The
        group plays acoustically and comprises of guitar, bass flute, and double bass.
      </li>
      <li>
        <em><router-link to="/standards-trio">The Standards Jazz Trio</router-link></em> - Jazz Trio featuring Zack
        Sanders on Guitar, Eli
        Kemp on Drums, and Kyle on bass.
      </li>
      <li>
        <em><router-link to="/dke">The DKE Trio</router-link></em> - Pre-40's jazz, blues, and popular music trio
        featuring guitarist and
        singer Daisy Dresner backed by drums and bass.
      </li>
      <li>
        <em>Angel Island</em> - Golden Gate Park Jazz septet with saxes, trumpet, flute, guitar, bass, and drums.
      </li>
      <li>
        <em><a href="https://www.fakemelody.com" target="fakemelody">Fake Melody</a></em> - Jazz combo run by Simon
        Donovan.
      </li>
      <li><em>Midnite Flyte</em> - Small jazz combo led by Syd Williams on keys.</li>
      <li>
        <em><a href="https://www.gigsalad.com/mission_hill_san_francisco" target="new">Mission Hill</a></em> - Aaron &
        Richard playing
        classic Americana and Bluegrass.
      </li>
      <li>
        <em><a href="http://www.trikonautband.com" target="trickonaut">Trikonaut</a></em> - Jazz, Latin, Blues, and
        More!
      </li>
      <li>
        <em><a href="http://westsidejazzclub.com" target="new">West Side Jazz Club</a></em> - Scott Silverberg on Tenor
        Sax and Vocals
        backed by bass, guitar, and drums.
      </li>
    </ul>
    <div class="text-center">
      <p>Details on background and musical journey can be found on my <router-link to="/music/history">history
          page</router-link></p>
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
export default class Music extends Vue { }
</script>

<style lang="scss">
li>em {
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
