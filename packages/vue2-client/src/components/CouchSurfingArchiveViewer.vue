<template>
  <div>
    <form id="upload" @submit.prevent="submit">
      <div class="upload" v-if="!hasData">
        <p>
          <label for="file">Upload CS Archive JSON file </label><br />
          <input type="file" id="file" accept=".json" />
        </p>
        <button>Upload</button>
      </div>
    </form>
    <div v-if="hasData">
      <p>{{ csData.user_data.profile.about_me }}</p>
      <p class="text-center fs-3">Messages</p>
      <div v-for="(message, key, index) in csData.messages.messages" :key="index">
        <p class="date">{{ new Date(message.created_at.replace(" UTC", "").split(" ")[0]).toLocaleDateString("en-US") }}</p>
        <p v-for="(m, k, i) in message.messages" :key="i">{{ clean(m.body) }}</p>
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
    // console.log("json", json);
    // console.log("csData", this.csData);
    this.hasData = true;
  }

  clean(text: string) {
    return text?.replaceAll('_____________________________________________________', '')
      .replaceAll('__________________________________________________________________________________________________', '')
      .replaceAll('�', '')
      .replaceAll('_____________________________________________', '')
  }
}

</script>
<style>
.date {
  font-weight: bold;
}
</style>
