<template>
  <div class="container text-center">
    <h2>Media Page</h2>
    <p>Recordings of gigs, jams, and a few random shows.</p>
    <p>Not professional recordings. They're made with an iPhone sitting somewhere near me using the Memo app.</p>
    <p><router-link to="/music">Gigs & Shows Calendar</router-link></p>
    <media-player :tracks="tracks"></media-player>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
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
        title: "Monday Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 1",
        date: "11/20/2023",
        id: "1OIsfanxKMcrdLngi1i0Xom9LHK5JtGPg"
      },
      {
        title: "Monday Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 2",
        date: "11/20/2023",
        id: "1HhMBZBW7p9H6nitZ2CWa-V3gSpYHvDbg"
      },
            {
        title: "Monday Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 3",
        date: "11/20/2023",
        id: "1Wp5VkdTMe2iiwaq3aTJiDNi8VBKoURyy"
      },
                  {
        title: "Monday Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 4",
        date: "11/20/2023",
        id: "1nwB_ACicLzqeD-bXYRh9Hrbd9Er4uKhD"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 1 ",
        date: "11/15/2023",
        id: "17kN9rNXWzTiPI4uJtxuD3FGVPi0hzfE2"
      },
      {
        title: "Shoe Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 2 ",
        date: "11/15/2023",
        id: "1yZlmM4TpmANuMksyYGZypMOXKuc-gzfV"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone SF - Set 1 ",
        date: "11/13/2023",
        id: "1ImnGsPQnFrSpi_0_Ono-qhCuR1Me2gQN"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone SF - Set 2",
        date: "11/13/2023",
        id: "1nwq0Mjq5pMjCKyJ4-00Me5hGsYvFBcX9"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone SF - Set 1",
        date: "11/6/2023",
        id: "1uQ7cqch4nwfdTHuwwffpT3DeYKOOHN7J"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone SF - Set 2",
        date: "11/6/2023",
        id: "1YQAHS_ZJ_FflcIH5YteQoJJsuACS4oRQ"
      },
      {
        title: "Monday Jazz Jam",
        location: "Waystone SF - Set 3",
        date: "11/6/2023",
        id: "1YYROim7F_p6VqDLz2Rj6HQ69bmgFedKn"
      },
      {
        title: "Nobody From Nashville",
        location: "Helmann Ranch",
        date: "11/4/2023",
        id: "1KkINQZ0BawNwzeTmeLF1oRyIs8vHsQ-7"
      },
      {
        title: "Fake Melody Trio",
        location: "Ivory & Vine SF - Set 1",
        date: "10/27/2023",
        id: "1aYzatGfhjB43e7t7pOHfZGjX7jbvwJAF"
      },
      {
        title: "Fake Melody Trio",
        location: "Ivory & Vine SF - Set 2",
        date: "10/27/2023",
        id: "1fSXoGfCnCVQrIJRNqUGm2jocr90oS6fK"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 1",
        date: "9/20/2023",
        id: "1WtrgM1AGpNquvnkzCr1LQm1rcyTu3IbO"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 2",
        date: "9/20/2023",
        id: "11yqPLaw0q_hxRDkJAqEs9JivzOrY7CMQ"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 1",
        date: "8/16/2023",
        id: "1xbVh1oAb1vkB9aBJBhinxd3bkKX5PwZt"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 2",
        date: "8/16/2023",
        id: "1ao0nJJdz3n2KcfNGnRt7G2laVmJTPuW6"
      },
      {
        title: "Overtime Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 1",
        date: "7/9/2023",
        id: "1MRZatxHFzORqq2OErVsmVl35XnS90S4g"
      },
      {
        title: "Overtime Jazz Jam",
        location: "The Lucky Horseshoe SF - Set 2",
        date: "7/9/2023",
        id: "1LneWfZku7cGuFXsGSB4JSVThwgfA4DD3"
      },
      {
        title: "Zack & Kyle",
        location: "Waystone SF - Set 1",
        date: "7/1/2023",
        id: "1Ckuzpowl2RlvEDUsoyXmrP9_dfgiflwk"
      },
      {
        title: "Zack & Kyle",
        location: "Waystone SF - Set 2",
        date: "7/1/2023",
        id: "1I72tGe3DjT24W2zeikKZu_msC42vMPP7"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 1",
        date: "6/21/2023",
        id: "1X34fVUm6WNwMFvsJaEfXJmdRAOrEH7Gm"
      },
      {
        title: "Shoe Jam",
        location: "The Lucky Horseshoe SF - Set 2",
        date: "6/21/2023",
        id: "1-6xPClYO2JRSAQ6_zg5BphGiWorhO8J5"
      },
      {
        title: "June MusicLuck - Bangers",
        location: "The Mission SF",
        date: "6/14/2023",
        id: "11f0VXqVZO9osBK39hqr8C9CWJ8kTy50l"
      },
      {
        title: "June MusicLuck - Ballads",
        location: "The Mission SF",
        date: "6/14/2023",
        id: "162XA7oEBatYdUMfC6yjmTTcHohM8SMjE"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "6/9/2023",
        id: "12NU6WDzq9MbcBWvamAGD_Aj3CIFTJc9S"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 2",
        date: "06/09/2023",
        id: "1QdGDHn-Z-NYn-eAy_JAly2iVwbvshZ5c"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 3",
        date: "6/9/2023",
        id: "1u7txq6LIDRxur_w9jf4Mjl8KE1wKLsKm"
      },
      {
        title: "Nobody From Nashville",
        location: "Morgan Hill Birthday - Set 1",
        date: "6/3/2023",
        id: "1t58ThL5TqsxDLwxZv1KXG0ph8LaYFyhz"
      },
      {
        title: "Nobody From Nashville",
        location: "Morgan Hill Birthday - Set 2",
        date: "6/3/2023",
        id: "1zPlx3ooaluX90hYm4V282XfVeA4Qtjm1"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "6/2/2023",
        id: "1IBiKf_IhJEDO8Lp-1boseWEg7XJsH1s4"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 2",
        date: "6/2/2023",
        id: "1JM_BKd2s2Cr-ULQCdHJonZXrtRJ_qpOo"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 3",
        date: "6/2/2023",
        id: "1OV01BPNcqfVnMbmNZarAT2y3Vocr1hQS"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 4",
        date: "6/2/2023",
        id: "1_uEOZUDf8FdmN3bYRtnSO8YkL1MYf4x-"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "6/1/2023",
        id: "1hSf9NWxZ2VsoJwh1zu-GDestvLevQYR1"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 2",
        date: "6/1/2023",
        id: "177tMViSyOtiN1WAPKGZoJrDzBdM4l-1K"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 3",
        date: "6/1/2023",
        id: "15-ZrEU4sqGqofUC1QIHf2tsUPoa0Xx-U"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 4",
        date: "6/1/2023",
        id: "10vaABQN0EePFVyvBhUiQyIPMf7y8k2JW"
      },
      {
        title: "West Side Jazz Club",
        location: "Ula SF - Set 1",
        date: "5/26/2023",
        id: "1okP4LV1UKT10E-8liSmG-vIq-RPc2HkW"
      },
      { title: "West Side Jazz Club", location: "Ula SF - Set 2", date: "5/26/2023", id: "1Qt_6oPJ6XeMwiXawXGmqDIWpCiReF0ab" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 3", date: "5/26/2023", id: "1wtpffXwRkWwSfB5dzXTlHDDOUSIiyEWb" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 4", date: "5/26/2023", id: "119up4SgyO2OpiZQ9c_w8jCp7Td0Kt8UL" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 1", date: "5/25/2023", id: "1AOeBwaRbngL7pbrDPqb5jG1U1NkukvFH" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 2", date: "5/25/2023", id: "1wsZQNp77psnMo_8iCMtLIq19EesvHef9" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 3", date: "5/25/2023", id: "1BKpgkkGGxj-vO7K53EgLZHkZ_RR3haaq" },
      { title: "West Side Jazz Club", location: "Ula SF - Set 4", date: "5/25/2023", id: "1YvWkERAdpXE-iBQVzgp9YScwyYegtMAd" },
      { title: "The Cody Sisters", location: "Amado's SF", date: "5/24/2023", id: "18Q_gKk0o6w5qShoOBK83kCQuLzx9a5oj" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "5/21/2023", id: "1K1zMjTtyyYtygLkR-Rw6jP3IP_5FF-NP" },
      {
        title: "Parklet Jam (featuring Daisy) - Full Set",
        location: "The Lucky Horseshoe",
        date: "5/23/2023",
        id: "12IlH5Qowx5ZD3Rblp0zyFlT6uk7YOPXu"
      },
      {
        title: "Daisy & Friends - They're Red Hot",
        location: "The Lucky Horseshoe Parklet",
        date: "5/23/2023",
        id: "1lxUYS0FjQDNzOsxRZX9N8sTTfl9V-coS"
      },
      {
        title: "Daisy & Friends - San Francisco Bay Blues",
        location: "The Lucky Horseshoe Parklet",
        date: "5/23/2023",
        id: "1FGfj1PeRhzOanu-EY2cZ7JtJ46OIe0tU"
      },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "5/17/2023", id: "1YSrIZaYuH0Dufo1wm84YlTIghtuurTxX" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "5/17/2023", id: "1JYubC-BTwk4jkYARl54D46Gez-Wd_hT3" },
      {
        title: "John Henry - Daisy, Kyle, Eli, & Steve",
        location: "The Lucky Horseshoe",
        date: "4/19/2023",
        id: "1j0J9bGo5vjsfe-HNYiNsouACf8-6Z6B8"
      },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "5/14/2023", id: "1l7PpTwKxERzTg7pNxrQ1Ai6zLwVLzeLF" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "5/7/2023", id: "1BSE5cycsJhEkpu2wTBokl43mtmvSW7nd" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 1", date: "4/19/2023", id: "1aD6PFdnn_bLE4mHT2oTJ8bnVhJkA17xH" },
      { title: "Open Jazz Jam", location: "The Lucky Horseshoe - Set 2", date: "4/19/2023", id: "1qL-CwSJW_j0lT1vlfozhlk9f8bHSXBL1" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "4/9/2023", id: "1hUGLWyNNH4H0L4ThmSXfmjqtN21Ft0gF" },
      {
        title: "DKE - Bill Bailey",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "132G2xcyEln3pbNJ0G_-fdOLpcY5m6Na-"
      },
      {
        title: "DKE - Coffee Stains (Daisy Original)",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1qXgu2LLOKWxv4RMcKRPc0sJ-rddR_oCN"
      },
      {
        title: "DKE - How'm I Doin'",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1HiEQNwhJ7gCC0_ObID6_8fPtTDx6RscW"
      },
      {
        title: "DKE - She Lived Down By The Firehouse",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1A-8ruiLp4OVULfWVZDarD9FiK-rZz2AA"
      },
      {
        title: "DKE - Railroad Bill",
        location: "Golden Gate Park",
        date: "4/1/2023",
        id: "1VrotkPOOWl9d_lcuUuiJQlH3OoN2A72E"
      },
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
