<template>
  <div id="home">
    <div class=card>
      <div class="options">
        <div class="card-header">Lunch Options</div>
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
    </div>
    <div class=card>
      <div class="topFive">
        <div class="card-header">Your Top 5</div>
        <div class="card-main">
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
        </div>
      <router-link to="/EditTopFive" tag="button" class="btn">Edit Top 5</router-link>
      <button class="btn" type="submit" v-on:click="lunchLocationToast()" >Submit</button>

      </div>
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
    margin-left: 50px;
    .options{
      order: 1;
      margin-right: 10px;
      padding: 10px;
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
    .card {
      overflow: hidden;
      margin: 10px;
      flex-basis: content;
      align-items: stretch;
      flex-wrap: wrap;
      border: none;
    }
    .card-header {
      text-align: center;
      font-size: 30px;
    }
    .card-main {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 15px 0;
    }
  }
</style>
