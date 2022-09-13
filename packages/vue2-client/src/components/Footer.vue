<template>
  <div>© 2022 kylefinley.net</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({})
export default class Footer extends Vue {}
</script>

<style lang="scss">
.footer {
  font-size: 14px;
  background-color: var(--color-secondary);
  padding: 50px 0;
  color: white;
}

.footer .footer-info .logo {
  line-height: 0;
  margin-bottom: 25px;
}

.footer .footer-info .logo img {
  max-height: 40px;
  margin-right: 6px;
}

.footer .footer-info .logo span {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: 1px;
  color: #fff;
  font-family: var(--font-primary);
}

.footer .footer-info p {
  font-size: 14px;
  font-family: var(--font-primary);
}

.footer .social-links a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  margin-right: 10px;
  transition: 0.3s;
}

.footer .social-links a:hover {
  color: #fff;
  border-color: #fff;
}

.footer h4 {
  font-size: 16px;
  font-weight: bold;
  position: relative;
  padding-bottom: 12px;
}

.footer .footer-links {
  margin-bottom: 30px;
}

.footer .footer-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer .footer-links ul i {
  padding-right: 2px;
  color: rgba(13, 66, 255, 0.8);
  font-size: 12px;
  line-height: 0;
}

.footer .footer-links ul li {
  padding: 10px 0;
  display: flex;
  align-items: center;
}

.footer .footer-links ul li:first-child {
  padding-top: 0;
}

.footer .footer-links ul a {
  color: rgba(255, 255, 255, 0.6);
  transition: 0.3s;
  display: inline-block;
  line-height: 1;
}

.footer .footer-links ul a:hover {
  color: #fff;
}

.footer .footer-contact p {
  line-height: 26px;
}

.footer .copyright {
  text-align: center;
}

.footer .credits {
  padding-top: 4px;
  text-align: center;
  font-size: 13px;
}

.footer .credits a {
  color: #fff;
}
</style>
