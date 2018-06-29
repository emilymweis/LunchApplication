<template>
  <div id="editTopFive">
    <div class="editTopFive">
    <h3>Edit Top Five</h3>
    <table>
      <tbody>
        <tr>
          <td>
            <label id="choiceLabel" for="firstChoice">First Choice</label>
          </td>
          <td>
            <select id="firstChoice" class= "form-control">
              <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label id="choiceLabel" for="secondChoice">Second Choice</label>
          </td>
          <td>
            <select id="secondChoice" class= "form-control">
              <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label id="choiceLabel" for="thirdChoice">Third Choice</label>
          </td>
          <td>
            <select id="thirdChoice" class= "form-control">
              <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label id="choiceLabel" for="fourthChoice">Fourth Choice</label>
          </td>
          <td>
            <select id="fourthChoice" class= "form-control">
              <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>
            <label id="choiceLabel" for="fifthChoice">Fifth Choice</label>
          </td>
          <td>
            <select id="fifthChoice" class= "form-control">
              <option v-for="(data, index) in restaurantData" :key="index">{{data.restaurantName}}</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
    <router-link to="/Home" tag="button" class="btn">Back</router-link>
    <button class="btn btn-primary" type="submit" v-on:click="submitUpdate()" >Submit </button>
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
        .catch(e => {
          this.errors.push(e)
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
      submitUpdate: function () {
        VueOnToast.ToastService.pop('success', 'Successful Update', 'your preferences have been saved')
      }
    }
  }
</script>
<style lang="scss">
#editTopFive{
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  table{
    align-self: center;
  }
  .form-control{
    width: 100%;
  }
  .editTopFive{
    order: 1;
    -ms-flex-align: center;
  }
}
</style>
