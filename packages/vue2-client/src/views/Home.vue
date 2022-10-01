<template>
  <span>
    <section>
      <div class="container">
        <div class="row">
          <div class="col-md-4">
            <h2 class="text-center section-header">Software & Systems</h2>
            <p>
              I've been a Software Developer and Systems Infrastructure professional for
              many years. I've worked in several distinct industries in both large and
              small companies. I started my career in high school pulling cable and
              polishing fiber then moving into the installing and managing large multi
              site Windows Active Directory domains before moving full time into software
              and systems development in college. These days I build cloud based software
              systems and enjoy the software product creation process the most.
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Work & Startup Life</h2>
            <p>
              I spent 5 years as a consultant for a major business/tech firm then moved
              into working for startups. For many years I was hired by small startups to
              help implement Agile and Lean processes. I've trained teams and execs on
              Agile as well as lead teams using a DevOps driven software delivery process.
              I've worked with successful teams as well as teams that have failed
              miserably. My advice on Agile is simple, do what works for you and avoid
              waterfall / gated processes at all costs (Also... don't use Jira).
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Current Projects</h2>
            <p>
              I often get asked what I'm working on. I'm always working on several
              different things and I have many unfinished projects and more ideas than I
              have time to even attempt to complete. These days I've been reworking lots
              of my cloud system architecture and Lean Software Product Development
              System. Active work includes a simple GitHub sourced markdown based
              article/blog/marketing engine, various activity trackers, a sports/activity
              coaching platform, and a live streaming/recording platform.
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Music</h2>
            <p>
              I started playing music in early jr. with the trombone then picked up guitar
              before settling in on the upright bass. I didn't play actively while living
              in New England but got back to the bass just before moving west. I've been
              playing out publicly almost weekly for the last several years. You can catch
              me at the Lucky Horseshoe on Sunday afternoons for the Bluegrass Jam or with
              Nobody From Nashville in and around the Bay Area.
            </p>
          </div>

          <div class="col-md-4">
            <h2 class="text-center section-header">Photography</h2>
            <p>
              I photograph for fun mostly but I've been known to take a gig here or there.
              These days I'm into outdoor and cityscape photos mostly. I also enjoy
              portraits and product shots. I spent several years focusing on cocktail
              photos in and around the many great bars in Boston and learned a lot about
              shooting in low light high action environments. I find water photos
              fascinating as well as sunrises. I hope to get my photo catalog online soon.
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Camping & Outdoors</h2>
            <p>
              I enjoy spending as much time as I can camping. Lately I've been enjoying
              driving around the West and Southwestern part of the country overlanding in
              my off-road beast wagon. Ideally I'd get out off the gird at least a long
              weekend a month but I don't get out that often atm. Although during the last
              6 months of 2020 I spent 50 nights in a tent! Next adventure is the Pacific
              Northwest.
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Kiteboarding</h2>
            <p>
              Kitesurfing is my current alternative sport of choice. I grew up
              skateboarding and then snowboarding and found kiteboarding when I moved to
              New England. I've been kiting for many years and I enjoy getting out on the
              water as often as I can. I've traveled around the US kiteboarding a lot and
              have kiteboarded almost all the coastal states. I hope to finish all 18
              states in the next few years. I also teach private kiteboard lessons for
              beginners or intermediate riders.
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Skateboarding</h2>
            <p>
              I've been an active skater for the majority of my life. I grew up BMX bike
              racing and discovered ramp skating in the mid 80s. I moved into street
              skating in the 90s then didn't skate much in the 2000s until 2009 when I got
              a longboard. These days I try to longboard every day getting at least 5
              miles. And no I don't ride an electric board. 😃
            </p>
          </div>
          <div class="col-md-4">
            <h2 class="text-center section-header">Save a Car / Save the Environment</h2>
            <p>
              I'm happy to say that I've rescued two older cars from the junk yard and
              have done repairs and maintenance myself. One is my 20 year old Boxer 6cyl
              Beast Wagon Subie and the other is a 20 year old sedan version of the same
              car (both bought on CL for a combined $2,600). I've driven the wagon halfway
              across the country 5 times and about to roll over a quarter of a million
              miles (on my way to 1 million!).
            </p>
          </div>
        </div>
      </div>
    </section>
  </span>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Hero } from '../components/'
@Component({
  components: {
    Hero,
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
.section-header {
  font-size: 20px;
  font-weight: bold;
  margin: 15px 0 5px 0;
  border-bottom: solid;
  border-bottom-width: thin;
  padding-bottom: 5px;
  border-color: gray;
}
</style>
