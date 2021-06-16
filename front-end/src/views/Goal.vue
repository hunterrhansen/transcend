<template>
<div class="goal-page">
  <Header />
  <div class="menu">
    <editor :show="show" @close="close" @editFinished="editFinished" />
  </div>
  <div class="heading-bg" />
  <router-link to="/home" class="top-button back-button"><i class="fas fa-arrow-circle-left"></i> Back</router-link>
  <a @click="toggleEditor" class="top-button edit-button"><i class="fas fa-edit"></i> Edit</a>
  <div class="heading" v-if="goal != null">
    <img class="goal-image" :src="goal.path" />
    <div class="goal-info">
      <h1 class="goal-title">{{ goal.title }}</h1>
      <h2 class="goal-type">{{ goal.type }}</h2>
      <p class="goal-description">{{ goal.description }}</p>
    </div>
  </div>
  <div class="updates-section">
    <div class="updates-container" v-if="$root.$data.user != null">
      <div class="container-heading">
        <h1>Goal Updates</h1>
        <h2>Leave yourself an update of your progress.</h2>
      </div>
      <div class="container-content" v-show="updateArray.length === 0">
        <div class="single-container">
          <p>Add an update below!</p>
        </div>
      </div>
      <div class="container-content" v-for="update in updateArray" v-bind:key="update._id">
        <div class="single-container">
          <div class="update-content">
            <p class="update-description">{{update.updateData}}</p>
            <div>
              <p class="update-date">{{formatDate(update.created)}}</p>
              <i class="fas fa-trash" @click="deleteUpdate(update)"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer">
        <textarea v-model="updateData" placeholder="Your Update..." ></textarea>
        <button class="btn btn-light" @click="createUpdate"><i class="fas fa-paper-plane"></i> Send</button>
      </div>
    </div>
    <div class="updates-container" v-else>
      <div class="container-heading">
        <h1 class="updates-title" >Goal Updates</h1>
      </div>
      <div class="container-content">
        <div class="single-container">
          <p>Updates are not available. You must log in first</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import Header from '@/components/Header.vue';
import Editor from '@/components/Editor.vue';
export default {
  name: 'Goal',
  components: {
    Header,
    Editor,
  },
  data() {
    return {
      show: false,
      goal: null,
      goalUser: null,
      updateData: "",
      updateArray: [],
    }
  },
  created() {
    this.getGoal();
    this.getUpdates();
  },
  methods: {
    async getGoal() {
      try {
        let response = await axios.get("/api/goals/" + this.$route.params.id);
        this.goal = response.data;
        this.getGoalUser();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getGoalUser() {
      try {
        let response = await axios.get("/api/users/");
        this.goalUser = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async createUpdate() {
        if (this.updateData === '') {
          return;
        }
        await axios.post('/api/updates', {
          goal: this.$route.params.id,
          updateData: this.updateData,
        });
        this.updateData = "";
        this.getUpdates();
    },
    async getUpdates() {
      try {
        let response = await axios.get('/api/updates/' + this.$route.params.id);
        this.updateArray = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUpdate(update) {
      try {
        await axios.delete("/api/updates/" + update._id);
        this.getUpdates();
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    close() {
      this.show = false;
    },
    toggleEditor() {
      this.show = true;
    },
    async editFinished() {
      this.show = false;
      this.getGoal();
    },
  }
}
</script>

<style scoped>
.goal-page {
  align-items: center;
  padding-bottom: 30px;
  width: 100%;
}

.menu {
  display: flex;
  justify-content: center;
  text-align: center;
}

h1 {
  color: #393e46;
  font-size: 30px;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
}

h2 {
  color: #393e46;
  font-size: 15px;
  opacity: 0.6;
}

/* Top Section */
.heading {
  align-items: flex-end;
  display: flex;
  margin: -125px 30px auto;
}

.heading-bg {
	background: #fc67fa;
	background: -webkit-linear-gradient(to right, #f4c4f3, #fc67fa);
	background: linear-gradient(to right, #f4c4f3, #fc67fa);
  height: 250px;
  overflow: hidden;
  margin-top: -40px;
  z-index: -1;
}

.top-button {
  transition: transform 80ms ease-in;
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 10px;
  font-weight: bold;
  padding: 10px;
  background-color: #393e46;
  color: white;
}

.back-button {
  position: absolute;
  top: 0;
  left: 0;
  margin: 110px 20px;
}

.edit-button {
  position: absolute;
  top: 0;
  right: 0;
  margin: 110px 20px;
}

.goal-info {
  margin-top: 30px;
  margin-left: 30px;
}

.goal-title {
  font-weight: bold;
}

.goal-type {
  font-size: 20px;
}

.goal-description {
  font-weight: normal;
  font-size: 20px;
}

.goal-image {
  border-radius: 50%;
  height: 300px;
  width: 300px;
}

.image {
  display: inline-block;
  width: 100%;
}

/* Updates Section */
.updates-section {
  margin: 30px 15px 100px;
}

.updates-container {
  width: 100%;
  height: 100%;
	background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.17);
	border-radius: 10px;
  border-width: 0;
  overflow: hidden;
}

@media only screen and (min-width: 991px) {
  .updates-section {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .updates-container {
    width: 75%;
  }
}

.container-heading {
  overflow: hidden;
  border-radius: 10px 10px 0 0;
  padding: 20px;
  height: 25%;
  position: relative;
	background: #0083B0;
	background: -webkit-linear-gradient(to right, #00B4DB, #0083B0);
	background: linear-gradient(to right, #00B4DB, #0083B0);
}

.container-heading h1 {
  margin-left: 10px;
  color: white;
}

.container-heading h2 {
  margin-left: 10px;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  color: white;
}

.container-content {
  height: 50%;
}

/* Single Comment Section */
.single-container {
  margin: 10px;
  padding: 10px;
  background-color: #eeeef0;
  opacity: 0.8;
}

.update-content {
  display: flex;
  justify-content: space-between;
}

.update-content i {
  float: right;
}

.update-date {
  font-style: italic;
  font-size: 14px;
}

.update-description {
  font-size: 16px;
}


/* Footer Section */
.btn {
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  margin: auto;
  height: 50px;
  float: right;
  transition: transform 80ms ease-in;
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  color: white;
}

.btn-light {
  border: 1px solid #fc67fa;
  background-color: #fc67fa;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}

textarea {
  height: 50px;
  width: 300px;
  border-radius: 0 0 0 10px;
  border: 1px solid #eee;
  padding: 10px;
}


/* Responsive Design */
@media only screen and (max-width: 720px) {
  .goal-page {
    text-align: center;
  }
  .heading {
    display: block;
    margin: -125px auto 10px;
  }
  .goal-info {
    margin: auto;
  }
  .goal-image {
    margin-bottom: 15px;
  }
  .card {
    width: 100%;
  }
  text-area {
    width: 60%;
  }
}
</style>
