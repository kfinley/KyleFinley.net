<template>
  <div class="container text-center">
    <h2>Media Page</h2>
    <p>Recordings of gigs, jams, and a few random shows.</p>
    <p>Not professional recordings. They're made with an iPhone sitting somewhere near me using the Memo app.</p>
    <media-player :tracks="tracks"></media-player>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AudioPlayer from "../components/AudioPlayer.vue";
import MediaPlayer from "../components/MediaPlayer.vue";

@Component({
  components: {
    AudioPlayer,
    MediaPlayer
  }
})
export default class Music extends Vue {
  get tracks() {
    return [
      {
        name: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "05/26/2023",
        id: "1okP4LV1UKT10E-8liSmG-vIq-RPc2HkW"
      },
      { name: "West Side Jazz Club", location: "Ula SF - Set 2", date: "05/26/2023", id: "1Qt_6oPJ6XeMwiXawXGmqDIWpCiReF0ab" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 3", date: "05/26/2023", id: "1wtpffXwRkWwSfB5dzXTlHDDOUSIiyEWb" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 4", date: "05/26/2023", id: "119up4SgyO2OpiZQ9c_w8jCp7Td0Kt8UL" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 1", date: "05/25/2023", id: "1AOeBwaRbngL7pbrDPqb5jG1U1NkukvFH" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 2", date: "05/25/2023", id: "1wsZQNp77psnMo_8iCMtLIq19EesvHef9" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 3", date: "05/25/2023", id: "1BKpgkkGGxj-vO7K53EgLZHkZ_RR3haaq" },
      { name: "West Side Jazz Club", location: "Ula SF - Set 4", date: "05/25/2023", id: "1YvWkERAdpXE-iBQVzgp9YScwyYegtMAd" },
      { name: "The Cody Sisters", location: "Amado's SF", date: "5/24/2023", id: "18Q_gKk0o6w5qShoOBK83kCQuLzx9a5oj" },
      {
        name: "Parklet Jam (featuring Daisy)",
        location: "The Lucky Horseshoe",
        date: "5/23/2023",
        id: "12IlH5Qowx5ZD3Rblp0zyFlT6uk7YOPXu"
      },
      { name: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "5/17/2023", id: "1YSrIZaYuH0Dufo1wm84YlTIghtuurTxX" },
      { name: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "5/17/2023", id: "1JYubC-BTwk4jkYARl54D46Gez-Wd_hT3" },
      { name: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "4/19/2023", id: "1aD6PFdnn_bLE4mHT2oTJ8bnVhJkA17xH" },
      { name: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "4/19/2023", id: "1qL-CwSJW_j0lT1vlfozhlk9f8bHSXBL1" },
      { name: "Open Jazz Jam", location: "The Lucky Horseshoe", date: "3/15/2023", id: "1Ne6Qpm3hVcoquJWvT6X5S56j2wECxH7E" }
    ];
  }
}
</script>

<style lang="scss" scoped></style>
