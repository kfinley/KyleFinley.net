<template>
  <div>
    <form id="upload" @submit.prevent="submit">
      <div class="upload" v-if="!hasData">
        <p>
          <label for="file">Upload CS Archive JSON file</label>
          <input type="file" id="file" accept=".json" />
        </p>
        <button>Upload</button>
      </div>
    </form>
    <div v-if="hasData">
      <p>{{ csData.user_data.profile.about_me }}</p>
      <div v-for="(message, key, index) in csData.messages.messages">
        <p>{{ new Date(message.created_at).toLocaleDateString("en-US") }}</p>
        <p v-for="(m, k, i) in message.messages">{{ m.body }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class CouchSurfingArchiveViewer extends Vue {
  csData!: any;
  hasData = false;
  submit() {
    const file = document.querySelector("#file") as any;
    if (!file.value.length) return;

    let reader = new FileReader();
    reader.onload = this.logFile;
    reader.readAsText(file.files[0]);
  }

  logFile(event: any) {
    let str = event.target.result;
    let json = JSON.parse(str);
    this.csData = json;

    // console.log("string", str);
    console.log("json", json);
    console.log("csData", this.csData);
    this.hasData = true;
  }
}

/*
{ "user_ids_concatenated": "347246,648853",
"created_at": "2008-05-08 12:11:48 UTC", "updated_at": "2008-05-08 12:11:48 UTC",
"messages": [
  { "id": 21197106, "system_message": {},
  "message_thread_id": 21197106,
  "author_id": 347246,
  "body": "SUBJECT: Welcome to the Couchsurfing project!\n\nHey Adam !\nI saw that you are a new member, so being an ambassador\nI would like to welcome you to the world of\ncouchsurfing.\n\nThere are different ways to personalize your profile.\nIf you want, you can add a picture of yourself.\nBesides that, you can add as much information about\nyourself and your couch as you�re comfortable with.\nThe information is very valuable to other members,\nbecause it gives them an impression of you if you�ve\nasked them to host you.\n\nI wish you a lot of fun using couchsurfing !\n:)\n\nWho knows, maybe I�ll see you one day as you crash my\ncouch!\n\nCheers,\n\nMassimo",
  "deleted_at": null,
  "created_at": "2008-05-08 12:11:48 UTC", "updated_at": "2010-05-13 02:13:47 UTC" } ] }
*/
</script>
<style>
.upload {
}
</style>
