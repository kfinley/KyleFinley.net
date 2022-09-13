<template>
  <div>
    <h1 style="text-align: center;">Contact</h1>
    <p>
      Text me if you've got my number. Email me if you have my email address. Hit me up on
      Twitter and I may see it (I rarely log into it these days).
    </p>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    layout: 'default' // For layout to work here we have to use vue-class-component over vue-property-decorator
})
export default class Contact extends Vue { 
   
}

</script>
