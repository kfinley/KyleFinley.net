<template>
  <vue2-date-picker
    v-model="model"
    value-type="format"
    type="date"
    format="MMM DD, YYYY"
    :placeholder="placeholder"
    :disabled-date="disabledBeforeToday"
  ></vue2-date-picker>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";
import  Vue2DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";

@Component({
  components: { Vue2DatePicker },
})
export default class DatePicker extends Vue {

  @VModel()
  model: any;

  @Prop({ default: "Select a date" })
  placeholder!: string;

  disabledBeforeToday(date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return date < today ;
  }

    // after a week || date > new Date(today.getTime() + 7 * 24 * 3600 * 1000)
}
</script>
