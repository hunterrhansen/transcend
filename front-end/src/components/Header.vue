<template>
<div>
<div class="content">
  <div class="header">
    <nav class="navbar navbar-expand-lg">
      <h1>Transcend</h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="fas fa-bars fa-2x"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link to="/home" class="home">Home</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="toggleUpload">New</a>
          </li>
          <li class="nav-item">
            <p v-if="user">Hi, {{user.firstName}}! <a @click="logout"><i class="fas fa-sign-out-alt"></i></a></p>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</div>
<uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
</div>
</template>

<script>
import axios from 'axios';
import Uploader from '@/components/Uploader.vue';
export default {
  name: "Header",
  components: {
    Uploader,
  },
  data() {
    return {
      show: false,
    }
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
    },
  },
}
</script>

<style scoped>
.navbar {
    background: #393e46;
    margin: 0;
}

.navbar ul {
  padding-right: 30px;
}

.fas {
  color: #fff;
  border: none;
  padding-right: 10px;
}

.navbar a {
  font-weight: bold;
  text-decoration: none;
  margin-top: -8px;
  margin-left: 15px;
  color: #fff;
}

.navbar a.router-link-exact-active {
  color: #00adb5;
}

.navbar p {
  margin-left: 15px;
  color: #fff;
  font-weight: bold;
}

.navbar h1 {
  color: white;
  text-transform: uppercase;
  padding: 10px;
  margin-top: 5px;
  margin-left: 20px;
}

@media (min-width: 48em) {
  .navbar h1 {
    padding-left: 100px;
  }
  .navbar-nav {
    margin-left: auto!important;
    margin-right: 0!important;
  }
  .photo img {
    width: 100%;
    max-height: 500px;
    object-fit: cover;
  }
}
</style>