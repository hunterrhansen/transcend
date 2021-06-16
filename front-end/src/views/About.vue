<template>
<div class="about">
  <div class="bg">
    <div class="card">
      <div class="card-heading" />
      <div class="card-content">
        <h1 class="slogan">The Future Of Possible</h1>
        <p>Transcend allows you to set and track goals. <br> Become the person you have always wanted to be.</p>
      </div>
      <div class="card-footer">
        <router-link to="/home" class="button">Get Started</router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
    name: 'About'
}
</script>

<style scoped>
/* Background Start */
.bg {
  background-size: cover;
  position: fixed;
  top: -20px;
  left: -20px;
  right: -20px;
  bottom: -20px;
  background: linear-gradient(-45deg, #f4c4f3, #fc67fa, #00B4DB, #0083B0);
  background-size: 400% 400%;
  animation: gradient 15s ease infinite;
  z-index: -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 80px;
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
/* Background End */

/* Card Start */
.card {
	background-color: #fff;
	border-radius: 10px;
  border-width: 0;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
	position: relative;
	overflow: hidden;
	width: 768px;
	max-width: 100%;
	min-height: 480px;
}

@media only screen and (max-width: 768px) {
  .card {
      width: 90%;
  }
  
}

.card-heading {
  overflow: hidden;
  display: flex;
  padding: 20px;
  height: 120px;
  position: relative;
  align-items: flex-end;
  background: url("../assets/mountain.jpeg") no-repeat center/cover;
  position: relative;
  z-index: 1;
}

.card-content {
  text-align: center;
}

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

h1 {
  font-weight: bold;
  font-size: 24px;
  margin: 0;
  text-align: center;
  margin-top: 40px;
}

p {
	font-size: 14px;
	font-weight: 100;
	line-height: 20px;
	letter-spacing: 0.5px;
  text-align: center;
	margin: 40px 10px;
}

.button {
  margin: auto;
  max-width: 220px;
	border-radius: 20px;
	border: 1px solid #0083B0;
	background-color: #0083B0;
	color: #FFFFFF;
	font-size: 14px;
  text-align: center;
	font-weight: bold;
	padding: 12px 45px;
	letter-spacing: 1px;
	text-transform: uppercase;
  text-decoration: none;
	transition: transform 80ms ease-in;
}

.button:active {
	transform: scale(0.95);
}
/* Card End */
</style>