<template>
  <header id="header" class="header d-flex align-items-center fixed-top">
    <div
      class="container-fluid container-xl d-flex align-items-center justify-content-between"
    >
      <router-link to="/" class="logo d-flex align-items-center">
        <h1>Kyle Finley</h1>
      </router-link>

      <burger-nav>
        <burger-nav-item :route="routes.Home">Home</burger-nav-item>
        <burger-nav-item :route="routes.Music">Music</burger-nav-item>
        <burger-nav-item :route="routes.Software">Software</burger-nav-item>
        <burger-nav-item :route="routes.Articles">Writings</burger-nav-item>
        <burger-nav-item :route="routes.News">News</burger-nav-item>
        <burger-nav-item :route="routes.Contact">Contact</burger-nav-item>
      </burger-nav>
    </div>
  </header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BurgerNav from './BurgerNav.vue'
import BurgerNavItem from './BurgerNavItem.vue'
import { RouteNames } from '../router/RouteNames'

@Component({
  components: {
    BurgerNav,
    BurgerNavItem,
  },
})
export default class Header extends Vue {
  headerOffsetTop: number = 0
  header: element
  routes = RouteNames
  site = 'KyleFinley.net'

  mounted() {
    window.addEventListener('scroll', this.handleScroll)

    // Get the header
    this.header = document.getElementById('header')

    // Get the offset position of the navbar
    this.headerOffsetTop = this.header.offsetTop
  }

  // Add the stickey class to the header when you reach its scroll position.
  // Remove "sticky" when you leave the scroll position
  handleScroll(e) {
    if (window.pageYOffset > this.headerOffsetTop) {
      this.header.classList.add('stickey')
    } else {
      this.header.classList.remove('stickey')
    }
  }
}
</script>

<style lang="scss">
.header {
  transition: all 0.5s;
  z-index: 997;
  padding: 30px 0;
  left: 0;
  right: 0;
  top: 0;
  height: 32px;
  display: flex;
  align-items: center;
}

.header.stickey {
  position: fixed;
  top: 0;
  width: 100%;
  padding: 15px 0;
  box-shadow: 0px 2px 20px rgba(14, 29, 52, 0.1);
}

.header .logo img {
  max-height: 40px;
  margin-right: 6px;
}

.header .logo h1 {
  font-size: 30px;
  margin: 0;
  font-weight: 700;
  color: #fff;
  font-family: var(--font-primary);
}
</style>
