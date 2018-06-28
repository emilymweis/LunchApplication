<template>
  <div class="container">
    <div class="options">
      <h3>Lunch Options</h3>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Restaurant Name</th>
            <th scope="col">Restaurant Type</th>
            <th scope="col">Food Type</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in restaurantData" :key="index">
            <td scope="row">{{row.restaurantName}}</td>
            <td scope="row">{{row.restaurantType}}</td>
            <td scope="row">{{row.foodType}}</td>
            <td scope="row">{{row.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="topFive">
      <h3>Your Top 5</h3>
      <table class="table serial">
        <thead>
          <tr>
            <th scope="col">Restaurant Ranking</th>
            <th scope="col">Restaurant Name</th>
          </tr>
        </thead>
        <tbody v-for="(row, index) in topFiveData" :key="index">
          <tr>
            <td scope="row"></td>
            <td scope="row">{{row.restaurantOne}}</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td scope="row">{{row.restaurantTwo}}</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td scope="row">{{row.restaurantThree}}</td>
          </tr>
           <tr>
            <td scope="row"></td>
            <td scope="row">{{row.restaurantFour}}</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td scope="row">{{row.restaurantFive}}</td>
          </tr>
        </tbody>
      </table>
    <router-link to="/EditTopFive" tag="button" class="btn">Edit Top 5</router-link>
    <input class="btn btn-primary" type="submit" value="Submit" v-on:click="lunchLocationToast()" >
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import VueOnToast from 'vue-on-toast'

  export default {
    data () {
      return {
        restaurantData: [],
        topFiveData: [],
        errors: []
      }
    },
    created () {
      axios.get('http://localhost:48146/lunchdata')
        .then(response => {
          console.log(response)
          this.restaurantData = response.data
          return this.restaurantData
        })
      axios.get('http://localhost:48146/topfivedata')
        .then(response => {
          console.log(response)
          this.topFiveData = response.data
          return this.topFiveData
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      lunchLocationToast: function () {
        var random = Math.floor(Math.random() * 5)
        VueOnToast.ToastService.pop('success', 'Lunch Alert', 'lunch today is at: ' + this.restaurantData[random].restaurantName)
      }
    }
  }
</script>
<style scoped>
  .options{
    order: 1;
    margin-right: 10px;
  }
  .topFive{
    order: 2;
    margin-left: 20px;
  }
  .serial{
    counter-reset: serial-number;
  }
  .serial td:first-child:before {
  counter-increment: serial-number;
  content: counter(serial-number);
  }
  .container {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    flex-basis: 40%;
    height: 300px;
    margin: 0%;
  }
</style>
