<template>
  <vue-splash
    :show="!isLoaded"
    :logo="logo"
    title="Transcend"
    custom-text="Become the person you want to be."
    color="#00B4DB"
    :size="300"
    :fixed="true"
  />
</template>

<script>
import Logo from "../assets/meteor.png";

export default {
  name: "PageLoader",
  data() {
    return {
      isLoaded: false,
    }
  },
  mounted() {
    document.onreadystatechange = () => {
      if (document.readyState == "complete") {
        this.isLoaded = true;
      }
    }
  },
  computed: {
    logo() {
      return Logo;
    }
  }
}
</script>
