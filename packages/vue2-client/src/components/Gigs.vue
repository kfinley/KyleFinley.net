<template>
  <div>
    <h3>Gigs &amp; Jams</h3>
    <component :is="thisMonth" />
    <component :is="nextMonth" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { defineAsyncComponent } from "vue";

@Component
export default class Gigs extends Vue {
  month: string;
  year: number;
  followingMonth: string;
  followingYear: number;

  created() {
    const date = new Date();
    this.month = date.toLocaleString("en-US", { month: "2-digit" });
    this.year = date.getUTCFullYear();

    const nextMonthDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
    this.followingMonth = nextMonthDate.toLocaleString("en-US", { month: "2-digit" });
    this.followingYear = nextMonthDate.getUTCFullYear();
  }

  get thisMonth() {
    return defineAsyncComponent(() => import(`../gigs/${this.year}.${this.month}.md`));
  }

  get nextMonth() {
    return defineAsyncComponent(() => import(`../gigs/${this.followingYear}.${this.followingMonth}.md`));
  }
}
</script>
