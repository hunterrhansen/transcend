<template>
<transition v-if="show" name="modal">
  <div class="modal-mask">
    <div class="modal-container">
      <form class="pure-form" @submit.prevent="upload">
        <legend>Create a New Goal</legend>
        <fieldset>
          <input v-model="title" placeholder="Title">
          <input v-model="type" placeholder="Type">
        </fieldset>
        <fieldset>
          <textarea v-model="description" placeholder="Description"></textarea>
        </fieldset>
        <fieldset>
          <div class="imageInput" @click="chooseImage">
            <img v-if="url" :src="url" />
            <div v-if="!url" class="image-placeholder">
              Choose an Image
            </div>
            <input class="fileInput" ref="fileInput" type="file" @input="fileChanged">
          </div>
          <p v-if="error" class="error">{{error}}</p>
        </fieldset>
        <fieldset class="buttons">
          <button type="button" @click="close" class="btn">Close</button>
          <button type="submit" class="btn">Upload</button>
        </fieldset>
      </form>
    </div>
  </div>
</transition>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Uploader',
  props: {
    show: Boolean,
  },
  data() {
    return {
      title: '',
      type: '',
      description: '',
      url: '',
      file: null,
      error: '',
    }
  },
  methods: {
    fileChanged(event) {
        this.file = event.target.files[0];
        this.url = URL.createObjectURL(this.file);
    },
    close() {
        this.$emit('close');
    },
    chooseImage() {
        this.$refs.fileInput.click()
    },
    async upload() {
        try {
            const formData = new FormData();
            formData.append('goal', this.file, this.file.name);
            formData.append('title', this.title);
            formData.append('type', this.type);
            formData.append('description', this.description);
            await axios.post("/api/goals", formData);
            this.file = null;
            this.url = "";
            this.title = "";
            this.type = "";
            this.description = "";
            this.$emit('uploadFinished');
        } catch (error) {
            this.error = "Error: " + error.response.data.message;
        }
    }
  }
}
</script>

<style scoped>
* {
	box-sizing: border-box;
}

legend {
	font-weight: bold;
  font-size: 24px;
	margin: 0;
}

.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .3);
  transition: opacity 0.5s ease;
  display: flex;
  transition: background 0.2s ease-in-out, height 1s ease-in-out;
  transition: height 0.2s ease-in-out, width 0.2s ease-in-out;
  justify-content: center;
  transition-timing-function: cubic-bezier(0.64, 0.57, 0.67, 1.53);
}

.modal-container {
  width: 50%;
  height: max-content;
  margin-top: 80px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all 0.5s ease;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

textarea {
  background-color: #eee;
  width: 100%;
  height: 100px;
}

form {
	background-color: #FFFFFF;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	padding: 0 50px;
	height: 100%;
	text-align: center;
}

input {
	background-color: #eee;
	border: none;
	padding: 12px 15px;
	margin: 8px 0;
	width: 100%;
}

.image-placeholder {
  background: #F0F0F0;
  width: 100%;
  height: 125px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 14px;
  cursor: pointer;
}

.image-placeholder:hover {
  background: #E0E0E0;
}

.fileInput {
  display: none;
}

img {
  width: 200px;
}

.btn {
	border-radius: 15px;
	border: 1px solid #0083B0;
	background-color: #0083B0;
	color: #FFFFFF;
	font-size: 12px;
	font-weight: bold;
	padding: 20px 50px;
	letter-spacing: 1px;
	text-transform: uppercase;
	transition: transform 80ms ease-in;
  margin-top: 10px;
}

.btn:active {
	transform: scale(0.95);
}

.buttons {
  display: flex;
  justify-content: space-between;
}

@media only screen and (max-width: 1170px) {
  .modal-container {
    width: 75%;
  }
}

@media only screen and (max-width: 800px) {
  .modal-container {
    width: 95%;
  }
}

@media only screen and (max-width: 600px) {
  .modal-container {
    padding: 10px;
  }
  form {
    padding: 0 20px;
  }
}
</style>
