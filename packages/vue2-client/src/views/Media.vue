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
// import AudioPlayer from "../components/AudioPlayer.vue";
import MediaPlayer from "../components/MediaPlayer.vue";

@Component({
  components: {
    MediaPlayer
  }
})
export default class Music extends Vue {
  get tracks() {
    return [
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "05/26/2023",
        id: "1okP4LV1UKT10E-8liSmG-vIq-RPc2HkW"
      },
      { title: "West Side Jazz Club", location: "Ula SF - Set 2", date: "05/26/2023", id: "1Qt_6oPJ6XeMwiXawXGmqDIWpCiReF0ab" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 3", date: "05/26/2023", id: "1wtpffXwRkWwSfB5dzXTlHDDOUSIiyEWb" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 4", date: "05/26/2023", id: "119up4SgyO2OpiZQ9c_w8jCp7Td0Kt8UL" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 1", date: "05/25/2023", id: "1AOeBwaRbngL7pbrDPqb5jG1U1NkukvFH" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 2", date: "05/25/2023", id: "1wsZQNp77psnMo_8iCMtLIq19EesvHef9" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 3", date: "05/25/2023", id: "1BKpgkkGGxj-vO7K53EgLZHkZ_RR3haaq" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 4", date: "05/25/2023", id: "1YvWkERAdpXE-iBQVzgp9YScwyYegtMAd" },
      { title: "The Cody Sisters", location: "Amado's SF", date: "5/24/2023", id: "18Q_gKk0o6w5qShoOBK83kCQuLzx9a5oj" },
      {
        title: "Parklet Jam (featuring Daisy)",
        location: "The Lucky Horseshoe",
        date: "5/23/2023",
        id: "12IlH5Qowx5ZD3Rblp0zyFlT6uk7YOPXu"
      },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "5/17/2023", id: "1YSrIZaYuH0Dufo1wm84YlTIghtuurTxX" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "5/17/2023", id: "1JYubC-BTwk4jkYARl54D46Gez-Wd_hT3" },
      {
        title: "John Henry - Daisy, Kyle, Eli, & Steve",
        location: "The Lucky Horseshoe",
        date: "4/19/20",
        id: "1j0J9bGo5vjsfe-HNYiNsouACf8-6Z6B8"
      },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "4/19/2023", id: "1aD6PFdnn_bLE4mHT2oTJ8bnVhJkA17xH" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "4/19/2023", id: "1qL-CwSJW_j0lT1vlfozhlk9f8bHSXBL1" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "3/26/2023", id: "1O43chqAngKhfsXxk8V7dt9X0ZBpA6OGz" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "3/19/2023", id: "1gqb4IGXiRPx7X8nFM_X_L4R_W4XY4E0G" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe", date: "3/15/2023", id: "1Ne6Qpm3hVcoquJWvT6X5S56j2wECxH7E" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "3/12/2023", id: "1idpNKZvPhTmyWxaDnLqTpCqLb_Uhe1JV" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "3/5/2023", id: "1eZSKWkTAUHweG3tchVo3JKIF1CT3IrhE" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "2/26/2023", id: "1Dcx0nJOImF4jAriFAXKtYUYKs-Ovf86H" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "2/19/2023", id: "1BJq4zrWahMNyjiQ_WWcN1toiJywR2fhc" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "2/05/2023", id: "1nYwUF5KEm9pyyJRTAN5JPxu3XCsYIkOc" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "1/8/2023", id: "1x20WPBpZLi_rMN-sgvVeMeDFODon5DAh" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "1/1/2023", id: "1yPVbON48L9afRoMOeZnsAIcpQ-kGNnX_" },
      { title: "Guitar Scott Jazz Septet", location: "Golden Gate Park", date: "10/25/2022", id: "14JEl4fSsKS_WDLflxUPc3uWPX-_XqhBQ" }
    ];
  }
}
</script>

<style lang="scss" scoped></style>
