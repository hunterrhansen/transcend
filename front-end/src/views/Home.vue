<template>
<div class="home">
  <Header v-if="user" />
  <MyGoals v-if="user" />
  <div class="gradient" v-else>
    <div class="bg">
      <Register />
    </div>
  </div>
</div>
</template>

<script>
import MyGoals from '@/components/MyGoals.vue';
import Register from '@/components/Register.vue';
import Header from '@/components/Header.vue'
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    MyGoals,
    Register,
    Header,
  },
  async created() {
    try {
      let response = await axios.get('/api/users');
      this.$root.$data.user = response.data.user;
    } catch (error) {
      this.$root.$data.user = null;
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
}
</script>

<style scoped>
.bg {
  align-items: center;
	animation: gradient 15s ease infinite;
	background: linear-gradient(-45deg, #f4c4f3, #fc67fa, #00b4db, #0083b0);
	background-size: 400% 400%;
  bottom: -20px;
  display: flex;
  justify-content: center;
  left: -20px;
  position: fixed;
  top: -20px;
  right: -20px;
  z-index: -1;
}

@keyframes gradient {
	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
}

@keyframes move {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 100% 0;
  }
}
</style>