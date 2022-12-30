<template>
  <li>
    <router-link :to="{ name: route }" :class="activeClass" exact v-on:click.native="emitClick"
      ><slot></slot
    ></router-link>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class BurgerNavItem extends Vue {
  @Prop()
  route!: string

  emitClick() {
    this.$parent.$emit('nav-item-clicked', { route: this.route })
  }

  get activeClass() {
    return this.$route.name == this.$slots.default[0].text ? 'active' : ''
  }
}
</script>
