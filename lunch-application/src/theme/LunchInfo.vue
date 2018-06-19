<template>
  <div class="container">
    <div class="options">
      <h3>Lunch Options</h3>
      {{posts}}
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
          <tr>
            <td scope="row">Chipotle</td>
            <td>fast</td>
            <td>mexican</td>
            <td>cheap</td>
          </tr>
          <tr>
            <td scope="row">sam's</td>
            <td>sit-down</td>
            <td>Breakfast</td>
            <td>cheap</td>
          </tr>
          <tr>
            <td scope="row">Maggiano's</td>
            <td>sit-down</td>
            <td>american</td>
            <td>expensive</td>
          </tr>
          <tr>
            <td scope="row">Milkbox</td>
            <td>dessert</td>
            <td>ice cream</td>
            <td>cheap</td>
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
          <tr>
            <td scope="row"></td>
            <td>Chipotle</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td>sam's</td>
          </tr>
          <tr>
            <td  scope="row"></td>
            <td>Maggiano's</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td>Milkbox</td>
          </tr>
          <tr>
            <td scope="row"></td>
            <td>Machete</td>
          </tr>
        </tbody>
      </table>
    </div>
    <button type="button" class="btn">Edit Top 5</button>
    <input class="btn btn-primary" type="submit" value="Submit">
  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        posts: [],
        errors: []
      }
    },

    // Fetches posts when the component is created.
    created () {
      axios.get('http://localhost:48146/lunchdata')
        .then(response => {
          // JSON responses are automatically parsed.
          console.log(response)
          this.posts = response.data
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
</script>

<style scoped>
  .options{
    width: 40%;
    height:100%;
  }
  .topFive{
    width: 40%;
    height:100%;
  }
  .serial{
    counter-reset: serial-number;
  }
  .serial td:first-child:before {
  counter-increment: serial-number;
  content: counter(serial-number);
}
</style>

