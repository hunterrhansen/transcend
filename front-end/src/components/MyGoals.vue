<template>
<div class="my-goals">
  <div class="quote" v-show="goals.length === 0">
    <p>Purpose is what gives life meaning. Add a goal and get started today!</p>
  </div>
  <section class="goals-container">
    <div v-for="goal in goals" v-bind:key="goal._id">
      <div class="single-container">
        <div class="card">
          <div class="card-heading">
            <img :src="goal.path" class="profile-img" />
            <div class="top-info">
              <h1>{{goal.title}}</h1>
              <h2>{{goal.type}}</h2>
            </div>
          </div>
          <div class="card-content">
            <div class="progress-section">
              <h1>Progress</h1>
              <progress-bar v-if="!error" size="large" bar-color="#fc67fa" :val="goal.progress" :text="goal.progress + '%'"></progress-bar>
              <div v-else>
                <p>{{ goal.progress }}% complete</p>
              </div>
              <div class="progress-buttons">
                <button class="minus" @click="decreaseProgress(goal)"><i class="fas fa-minus"></i></button>
                <button class="plus" @click="increaseProgress(goal)"><i class="fas fa-plus"></i></button>
              </div>
            </div>
            <div class="description">
              <h1>Description</h1>
              <p>{{goal.description}}</p>
              <p class="date">{{formatDate(goal.created)}}</p>
            </div>
            <div class="card-footer">
              <a @click="deleteGoal(goal)" class="btn btn-light">Delete</a>
              <router-link :to="{ name: 'goal', params: { id: goal._id }}" class="btn btn-blue">Update</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <p v-if="error">{{error}}</p>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import ProgressBar from 'vue-simple-progress';
export default {
  name: 'MyGoals',
  components: {
    ProgressBar,
  },
  data() {
    return {
      goals: [],
      goal: null,
      title: '',
      type: '',
      description: '',
      file: '',
      progress: null,
      error: '',
    }
  },
  created() {
    this.getGoals();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  methods: {
    async getGoals() {
      try {
        this.response = await axios.get("/api/goals");
        this.goals = this.response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
    async deleteGoal(goal) {
      try {
        await axios.delete("/api/goals/" + goal.id);
        this.getGoals();
        return true;
      } catch(error) {
        console.log(error);
      }
    },
    async increaseProgress(goal) {
      goal.progress = goal.progress += 10;
      if (goal.progress >= 100) {
        //celebration
        this.deleteGoal(goal);
        this.getGoals();
        return;
      }
      try {
        await axios.put('/api/goals/' + goal._id, {
          path: goal.path,
          title: goal.title,
          type: goal.type,
          description: goal.description,
          progress: goal.progress,
        });
      } catch (error) {
          this.error = "Error: " + error.response.data.message;
      }
    },
    async decreaseProgress(goal) {
      if (goal.progress <= 0) {
        return;
      }
      goal.progress = goal.progress -= 10;
      try {
        await axios.put('/api/goals/' + goal._id, {
          path: goal.path,
          title: goal.title,
          type: goal.type,
          description: goal.description,
          progress: goal.progress,
        });
      } catch (error) {
          this.error = "Error: " + error.response.data.message;
      }
    },
  }
}
</script>

<style scoped>
.my-goals {
  margin: 0;
}

.quote {
  width: 100%;
  height: 100%;
  padding: 25%;
  opacity: 0.5;
  display: flex;
  text-align: center;
  justify-content: center;
}

/* Gallery begin */

/* Grid Layout Begin */
.goals-container {
  display: grid;
  grid-template: 600px / auto auto auto;
  margin: 10px 10px 100px;
  padding-top: 10px;
}

.single-container {
  height: 600px;
  padding: 10px;
}

/* Grid on large screens */
@media only screen and (min-width: 1250px) {
  .goals-container {
    grid-template: 600px / auto auto auto;
  }

  .btn {
    padding: 20px 50px;
  }
}

/* Grid on medium-sized screens */
@media only screen and (max-width: 1249px) and (min-width: 900px) {
  .goals-container {
    grid-template: 600px / auto auto;
  }

  .btn {
    padding: 20px 50px;
  }
}

/* Grid on small screens */
@media only screen and (max-width: 899px) {
  .goals-container {
    grid-template: 600px / auto;
  }

  .btn {
    padding: 25px 10%;
  }
}
/* Grid Layout End */

/* Card Begin */
.card {
  width: 100%;
  height: 100%;
	background-color: #fff;
  box-shadow: 0 14px 28px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.17);
	border-radius: 10px;
  border-width: 0;
  overflow: hidden;
}

/* Card Header Begin  */
.card-heading {
  overflow: hidden;
  display: flex;
  padding: 20px;
  height: 25%;
  position: relative;
  align-items: flex-end;
	background: #0083B0;
	background: -webkit-linear-gradient(to right, #00B4DB, #0083B0);
	background: linear-gradient(to right, #00B4DB, #0083B0);
}

.profile-img {
  margin-right: 5px;
  border-radius: 50%;
  width: 100px;
  height: 100px;
}

.card-heading h1 {
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  font-size: 30px;
  font-weight: bold;
  margin-left: 10px;
  color: white;
}

.card-heading h2 {
  font-size: 15px;
  opacity: 0.6;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  margin-left: 10px;
  color: white;
}
/* Card Header End */

/* Card Content Begin */
.card-content h1 {
  font-size: 20px;
  font-weight: bold;
}

.card-content {
  height: 50%;
}

.progress-section {
  padding: 15px;
  height: 50%;
}

.progress-buttons {
  justify-content: space-between;
}

.plus {
  float: right;
  padding: 10px;
  border-radius: 5px;
  background-color: #f4c4f3;
  border: 1px solid #f4c4f3;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  transition: transform 80ms ease-in;
}

.minus {
  padding: 10px;
  border-radius: 5px;
  background-color: #fc67fa;
  border: 1px solid #f4c4f3;
  color: white;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  transition: transform 80ms ease-in;
}

.description {
  padding: 15px;
  height: 50%;
}

.date {
  position: absolute;
  bottom: 25%;
  right: 10%;
}
/* Card Content End */

/* Footer Begin */
.card-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 25%;
  width: 100%;
  display: flex;
  justify-content: center;
  text-align: center;
}

.btn {
  border-radius: 15px;
  font-size: 16px;
  font-weight: bold;
  margin: auto;
  transition: transform 80ms ease-in;
  text-decoration: none;
  letter-spacing: 1px;
  text-transform: uppercase;
  text-align: center;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.3);
  color: white;
}

.btn-blue {
  border: 1px solid #0083B0;
  background-color: #0083B0;
}

.btn-light {
  border: 1px solid #00B4DB;
  background-color: #00B4DB;
}

button:active {
	transform: scale(0.95);
}

button:focus {
	outline: none;
}
/* Footer End */
/* Card End */
</style>
