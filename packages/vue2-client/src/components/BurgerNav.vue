<template>
  <div>
    <i class="mobile-nav-toggle mobile-nav-show bi bi-list"></i>
    <i class="mobile-nav-toggle mobile-nav-hide d-none bi bi-x"></i>
    <nav id="navbar" class="navbar">
      <ul>
        <slot></slot>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component()
export default class BurgerNav extends Vue {
  mobileNavShow: element
  mobileNavHide: element

  mobileNavToggle() {
    document.querySelector('body').classList.toggle('mobile-nav-active')
    this.mobileNavShow.classList.toggle('d-none')
    this.mobileNavHide.classList.toggle('d-none')
  }

  mounted() {
    this.$on('nav-item-clicked', (d) => {
      this.mobileNavToggle()
    })

    const mobileNavToggle = this.mobileNavToggle

    this.mobileNavShow = document.querySelector('.mobile-nav-show')
    this.mobileNavHide = document.querySelector('.mobile-nav-hide')

    document.querySelectorAll('.mobile-nav-toggle').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()
        mobileNavToggle()
      })
    })

    /**
     * Hide mobile nav on same-page/hash links
     */
    document.querySelectorAll('#navbar a').forEach((link) => {
      if (!link.hash) {
        return
      }

      let section = document.querySelector(link.hash)
      if (!section) {
        return
      }

      link.addEventListener('click', () => {
        if (document.querySelector('.mobile-nav-active')) {
          mobileNavToggle()
        }
      })
    })
  }
}
</script>

<style lang="scss">
//TODO: cleanup...

/*
# Mobile Navigation
*/
@media (max-width: 768px) {
  .navbar {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    max-width: 125px;
    bottom: 0;
    transition: 0.3s;
    z-index: 9997;
  }

  .navbar ul {
    position: absolute;
    inset: 0;
    padding: 50px 0 10px 0;
    margin: 0;
    // background: rgba(14, 29, 52, 0.9);
    background: repeating-radial-gradient(rgb(49, 119, 197), transparent 148px);
    overflow-y: auto;
    transition: 0.3s;
    z-index: 9998;
  }

  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 20px;
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.7);
    white-space: nowrap;
    transition: 0.3s;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover > a {
    color: #fff;
  }

  .mobile-nav-show {
    color: #fff;
    font-size: 28px;
    cursor: pointer;
    line-height: 0;
    transition: 0.5s;
    z-index: 9999;
    margin-right: 10px;
  }

  .mobile-nav-hide {
    color: #fff;
    font-size: 32px;
    cursor: pointer;
    line-height: 0;
    transition: 0.5s;
    position: fixed;
    right: 20px;
    top: 20px;
    z-index: 9999;
  }

  .mobile-nav-active {
    overflow: hidden;
  }

  .mobile-nav-active .navbar {
    right: 0;
  }

  .mobile-nav-active .navbar:before {
    content: '';
    position: fixed;
    inset: 0;
    background: rgba(14, 29, 52, 0.8);
    z-index: 9996;
  }
}

/*
# Desktop Navigation
*/

@media (min-width: 768px) {
  .mobile-nav-show,
  .mobile-nav-hide {
    display: none;
  }

  .navbar {
    padding: 0;
    padding-right: 2em;
  }

  .navbar ul {
    margin: 0;
    padding: 0;
    display: flex;
    list-style: none;
    align-items: center;
  }

  .navbar li {
    position: relative;
  }

  .navbar a,
  .navbar a:focus {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0 10px 30px;
    font-family: var(--font-primary);
    font-size: 16px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.6);
    white-space: nowrap;
    transition: 0.3s;
  }

  .navbar a i,
  .navbar a:focus i {
    font-size: 12px;
    line-height: 0;
    margin-left: 5px;
  }

  .navbar a:hover,
  .navbar .active,
  .navbar .active:focus,
  .navbar li:hover > a {
    color: #fff;
  }
}
</style>
