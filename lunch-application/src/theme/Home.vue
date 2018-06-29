<template>
  <div id="home">
    <div class="options">
      <h3>Lunch Options</h3>
      <table>
        <thead>
          <tr>
            <th>Restaurant Name</th>
            <th>Restaurant Type</th>
            <th>Food Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in restaurantData" :key="index">
            <td >{{row.restaurantName}}</td>
            <td >{{row.restaurantType}}</td>
            <td >{{row.foodType}}</td>
            <td >{{row.price}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="topFive">
      <h3>Your Top 5</h3>
      <table>
        <thead>
          <tr>
            <th>Restaurant Ranking</th>
            <th>Restaurant Name</th>
          </tr>
        </thead>
        <tbody v-for="(row, index) in topFiveData" :key="index">
          <tr>
            <td>1</td>
            <td>{{row.restaurantOne}}</td>
          </tr>
          <tr>
            <td>2</td>
            <td>{{row.restaurantTwo}}</td>
          </tr>
          <tr>
            <td>3</td>
            <td>{{row.restaurantThree}}</td>
          </tr>
           <tr>
            <td>4</td>
            <td>{{row.restaurantFour}}</td>
          </tr>
          <tr>
            <td>5</td>
            <td>{{row.restaurantFive}}</td>
          </tr>
        </tbody>
      </table>
    <router-link to="/EditTopFive" tag="button" class="btn">Edit Top 5</router-link>
    <button class="btn" type="submit" v-on:click="lunchLocationToast()" >Submit</button>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import VueOnToast from 'vue-on-toast'
  const baseUrl = axios.defaults.baseURL

  export default {
    data () {
      return {
        restaurantData: [],
        topFiveData: [],
        errors: []
      }
    },
    created () {
      axios.get(baseUrl + '/lunchdata')
        .then(response => {
          console.log(response)
          this.restaurantData = response.data
          return this.restaurantData
        })
      axios.get(baseUrl + '/topfivedata')
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
<style lang="scss">
  #home{
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: stretch;
    flex-basis: content;
    height: 300px;
    margin: 0%;

    .options{
      order: 1;
      margin-right: 10px;
    }
    .topFive{
      order: 2;
      margin-left: 30px;
      padding: 10px;
    }
    .serial td:first-child:before {
      counter-increment: serial-number;
      content: counter(serial-number);
    }
  }
</style>
