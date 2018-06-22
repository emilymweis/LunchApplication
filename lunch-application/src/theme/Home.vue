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
          <tr v-for="row in restaurantData" >
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
        <tbody>
          <tr v-for="row in restaurantData">
            <td scope="row"></td>
            <td scope="row">{{row.restaurantName}}</td>
          </tr>
        </tbody>
      </table>
    <button type="button" class="btn" >Edit Top 5</button>
    <input class="btn btn-primary" type="submit" value="Submit" v-on:click="lunchAlert()" >
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
        errors: []
      }
    },

    // Fetches posts when the component is created.
    created () {
      axios.get('http://localhost:48146/lunchdata')
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          this.restaurantData = response.data
          return this.restaurantData
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    methods: {
      lunchAlert: function () {
        var random = Math.floor(Math.random() * 5)
        VueOnToast.ToastService.pop('success', 'test', 'lunch today is at: ' + this.restaurantData[random].restaurantName)
      }

    }
  }
</script>
<style scoped>
  .options{
    order: 1;
    flex-basis: 40%;
    height: 300px;
    margin-right: 10px;
  }
  .topFive{
    order: 2;
    flex-basis: 40%;
    height: 300px;
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
}
</style>
