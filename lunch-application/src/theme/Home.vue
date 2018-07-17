<template>
  <div id="home">
    <div class=card>
      <div class="options">
        <div class="card-header">Lunch Options</div>
        <div class="card-main">
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
      <router-link to="/EditTopFive" tag="button" class="button">Edit Top 5</router-link>
      <button class="button" type="submit" v-on:click="lunchLocationToast()" >Submit</button>

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
        var random = Math.floor(Math.random() * this.restaurantData.length)
        VueOnToast.ToastService.pop('success', 'Lunch Alert', 'lunch today is at: ' + this.restaurantData[random].restaurantName)
      }
    }
  }
</script>
<style lang="scss">
  #home{
    display: flex;
    align-items: flex-start;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 50px;

    .options{
      order: 1;
      margin: 20px;
      padding: 20px;
    }
    .topFive{
      order: 2;
      margin: 20px;
      padding: 20px;
    }
    .card {
      flex:1;
      overflow: hidden;
      margin: 10px;
      flex-basis: content;
      align-items: stretch;
      flex-wrap: wrap;
      border: none;
      border-radius: 5px;
      background-color: white;
    }
    .card-header {
      text-align: left;
      font-size: 30px;
      box-shadow: none;
    }
    .card-main {
      display: flex;
      flex-direction: column;
      justify-content: stretch;
      align-items: center;

      padding: 15px 0;
    }
    table{
      width: 100%;
      border-collapse: collapse;
      font-size: 15px;
      margin: 10px;
    }
    th, td {
      padding: 7px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    tr:hover {background-color: #f5f5f5;}
    .button{
      background-color: #008CBA;
      border-radius: 4px;
      border: none;
      padding: 10px;
      color: white;
      text-transform: uppercase;
    }
    .button:hover{
      background-color: rgb(1, 110, 146);
    }
  }
</style>
