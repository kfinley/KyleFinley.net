<template>
  <div class="container text-center">
    <h2>Media Page</h2>
    <p>Recordings of gigs, jams, and a few random shows.</p>
    <p>Not professional recordings. These are made with an iPhone sitting somewhere near me using the Memo app and unedited.</p>
    <p><router-link to="/music">Gigs & Jams Calendar</router-link></p>
    <media-player :tracks="tracks"></media-player>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Music extends Vue {
  get tracks() {
    return [


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
      {
        title: "John Henry - Daisy, Kyle, Eli, & Steve",
        location: "The Lucky Horseshoe",
        date: "4/19/2023",
        id: "1j0J9bGo5vjsfe-HNYiNsouACf8-6Z6B8"
      },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "5/14/2023", id: "1l7PpTwKxERzTg7pNxrQ1Ai6zLwVLzeLF" },
      { title: "Sunday Bluegrass Jam", location: "The Lucky Horseshoe", date: "5/7/2023", id: "1BSE5cycsJhEkpu2wTBokl43mtmvSW7nd" },
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
