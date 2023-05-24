<template>
  <div>
    <h1 style="text-align: center;">Contact</h1>
    <p>
      I'm open to both music and tech gigs. You can reach me via email me at <a href="mailto:Kyle@KyleFinley.net">Kyle@KyleFinley.net</a>
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
