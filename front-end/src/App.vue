<template>
<div id="app">
  <PageLoader />
  <div class="footer">
    <div class="socials">
      <a href="https://www.instagram.com/hunterrhansen/"><i class="fab fa-instagram-square fa-3x" /></a>
      <a href="https://github.com/hunterrhansen/transcend"><i class="fab fa-github fa-3x" /></a>
      <a href="https://www.hackerrank.com/hunterhansen50"><i class="fab fa-hackerrank fa-3x" /></a>
      <a href="https://www.linkedin.com/in/hunterrhansen"><i class="fab fa-linkedin fa-3x" /></a>
      <p>50+ hours</p>
    </div>
  </div>
  <router-view />
</div>
</template>


<script>
import PageLoader from '@/components/PageLoader.vue';
export default {
  components: {
    PageLoader,
  }
}
</script>

<style>
#app {
  font-family: 'Montserrat', sans-serif;
}

body {
  padding: 0;
  margin: 0px;
}

/* Footer */
.footer {
  background: #eeeef0;
  color: #393e46;
  height: 70px;
  opacity: 0.8;
  position: fixed; left: 0; bottom: 0;
  text-align: center;
  width: 100%;
  z-index: 10;
}

.footer a {
  color: #393e46;
  display: inline-block;
  padding: 10px;
  position: relative;
  text-decoration: none;
}

.footer a:hover {
  color: #0083b0;
}

.footer p {
  float: right;
  padding: 20px;
  position: relative;
}
</style>
