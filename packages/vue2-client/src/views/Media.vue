<template>
  <div class="container text-center">
    <h2>Media Page</h2>
    <p>Recordings of gigs, jams, and a few random shows.</p>
    <p>Not professional recordings. They're made with an iPhone sitting somewhere near me using the Memo app.</p>
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 1" date="05/26/2023" g-id="1okP4LV1UKT10E-8liSmG-vIq-RPc2HkW" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 2" date="05/26/2023" g-id="1Qt_6oPJ6XeMwiXawXGmqDIWpCiReF0ab" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 3" date="05/26/2023" g-id="1wtpffXwRkWwSfB5dzXTlHDDOUSIiyEWb" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 4" date="05/26/2023" g-id="119up4SgyO2OpiZQ9c_w8jCp7Td0Kt8UL" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 1" date="05/25/2023" g-id="1AOeBwaRbngL7pbrDPqb5jG1U1NkukvFH" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 2" date="05/25/2023" g-id="1wsZQNp77psnMo_8iCMtLIq19EesvHef9" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 3" date="05/25/2023" g-id="1BKpgkkGGxj-vO7K53EgLZHkZ_RR3haaq" />
    <audio-player name="West Side Jazz Club" location="Ula SF - Set 4" date="05/25/2023" g-id="1YvWkERAdpXE-iBQVzgp9YScwyYegtMAd" />
    <audio-player name="The Cody Sisters" location="Amado's SF" date="5/24/2023" g-id="18Q_gKk0o6w5qShoOBK83kCQuLzx9a5oj" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AudioPlayer from "../components/AudioPlayer.vue";

@Component({
  components: {
    AudioPlayer
  }
})
export default class Music extends Vue {}
</script>

<style lang="scss" scoped></style>
