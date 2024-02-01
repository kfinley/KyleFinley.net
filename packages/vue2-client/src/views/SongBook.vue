<template>
  <SongBook />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SongBook from "../components/SongBook.vue";

@Component({
  components: {
    SongBook
  }
})
export default class SongBookView extends Vue {
}
</script>
