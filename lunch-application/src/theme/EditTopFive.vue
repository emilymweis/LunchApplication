<template>
  <div id="editTopFive">
    <div class="card">
      <div class="editTopFive">
        <div class="card-header">Edit Top Five</div>
        <div class="card-main">
          <table v-if="this.topFiveData.length">
            <tbody>
              <tr>
                <td>
                  <label id="choiceLabel" for="firstChoice">First Choice</label>
                </td>
                <td>
                  <select id="firstChoice" name="firstChoice">
                    <option value="" hidden>{{this.topFiveData[0].restaurantOne}}</option>
                    <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="choiceLabel" for="secondChoice">Second Choice</label>
                </td>
                <td>
                  <select id="secondChoice" name="secondChoice">
                    <option value="" hidden>{{this.topFiveData[0].restaurantTwo}}</option>
                    <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="choiceLabel" for="thirdChoice">Third Choice</label>
                </td>
                <td>
                  <select id="thirdChoice" name="thirdChoice">
                    <option value="" hidden>{{this.topFiveData[0].restaurantThree}}</option>
                    <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="choiceLabel" for="fourthChoice">Fourth Choice</label>
                </td>
                <td>
                  <select id="fourthChoice" name="fourthChoice">
                   <option value="" hidden>{{this.topFiveData[0].restaurantFour}}</option>
                    <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <label id="choiceLabel" for="fifthChoice">Fifth Choice</label>
                </td>
                <td>
                  <select id="fifthChoice" name="fifthChoice">
                    <option value="" hidden>{{this.topFiveData[0].restaurantFive}}</option>
                    <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
                  </select>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      <router-link to="/Home" tag="button" class="button">Back</router-link>
      <button class="button" type="submit" v-on:click="submitUpdate()" >Save </button>
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
          this.restaurantData = response.data
          return this.restaurantData
        })
        .catch(e => {
          this.errors.push(e)
        })
      axios.get(baseUrl + '/topfivedata')
        .then(response => {
          this.topFiveData = response.data
          return this.topFiveData
        })
        .catch(e => {
          this.errors.push(e)
        })
    },
    methods: {
      submitUpdate: function () {
        this.topFiveData[0].restaurantOne = document.getElementById('firstChoice').value
        this.topFiveData[0].restaurantTwo = document.getElementById('secondChoice').value
        this.topFiveData[0].restaurantThree = document.getElementById('thirdChoice').value
        this.topFiveData[0].restaurantFour = document.getElementById('fourthChoice').value
        this.topFiveData[0].restaurantFive = document.getElementById('fifthChoice').value

        axios.post(baseUrl + '/topfivedata/topfive',
          {
            userId: 1,
            restaurantOne: this.topFiveData[0].restaurantOne,
            restaurantTwo: this.topFiveData[0].restaurantTwo,
            restaurantThree: this.topFiveData[0].restaurantThree,
            restaurantFour: this.topFiveData[0].restaurantFour,
            restaurantFive: this.topFiveData[0].restaurantFive
          })
          .then(function (response) {
            VueOnToast.ToastService.pop('success', 'Successful Update', 'your preferences have been saved')
          })
          .catch(function (error) {
            console.log(error)
            VueOnToast.ToastService.pop('fail', 'Unsuccessful Update', 'your preferences have not been saved ' + error)
          })
      }
    }
  }
</script>
<style lang="scss">
#editTopFive{
  display: flex;
  justify-content: center;
  margin-top: 50px;

  table{
    align-self: center;
  }
  .editTopFive{
    margin: 20px;
    padding: 20px;
  }
  .card {
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
    justify-content: center;
    align-items: center;
    padding: 15px;
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
