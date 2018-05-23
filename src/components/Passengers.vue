<template>
  <div class="passengers">
    <p>
      Please enter search criteria
    </p>

    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12">
                <form class="row form">
                    <div class="col-md-4">
                        <div class="form-group">
                          <label for="passengerName">Name</label>
                          <input type="text" class="form-control" id="passengerName" v-model="passengerName" v-on:change="filterData()">
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                          <label for="surviveGroup">Survived</label>
                          <span id="surviveGroup" class="form-control">
                            <label class="radio-inline"><input type="radio" value=1 v-model="survived" v-on:change="filterData()">Yes</label>
                            <label class="radio-inline"><input type="radio" value=0 v-model="survived" v-on:change="filterData()">No</label>
                            <label class="radio-inline"><input type="radio" value=-1 v-model="survived" v-on:change="filterData()">All</label>
                          </span>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group">
                          <label for="ticketId">Ticket</label>
                          <input type="text" class="form-control" id="ticketId" v-model="ticketId" v-on:change="filterData()">
                        </div>
                    </div>
                </form>
                <button type="submit" class="btn btn-primary" @click.prevent="mySubmit">Submit</button>
            </div>
        </div>

        <h3>Passenger List</h3>
        <div>
          <b-table small striped hover :items="outPassengers">
          </b-table>
        </div>
    </div>

  </div>
</template>

<script>

//import axios from 'axios';

export default {
  name: 'Passengers',
  props: ['passengerArray'],
  data() {
    return {
      passengerId: "",
      survived: -1,
      passengerName: "",
      ticketId: "",
      columnNames: [],
      inPassengers: [],
      outPassengers: []
    }
  },
  updated() {
      //console.log("UPDATED" + JSON.stringify(this.inPassengers));
//      this.filterData()
  },
  methods: {
    mySubmit() {
      this.filterData();
    },
    filterData() {
      this.outPassengers = this.inPassengers.filter((rev) => {
        if (this.passengerName && rev.Name.toLowerCase().indexOf(this.passengerName.toLowerCase()) < 0) {
          return false;
        }
        if (this.survived > -1) {
          if (this.survived == 0 && rev.Survived == true) {
           return false;
          }
          if (this.survived == 1 && rev.Survived == false) {
            return false;
          }
        }
        if (this.ticketId && rev.Ticket.toLowerCase().indexOf(this.ticketId.toLowerCase()) < 0) {
          return false;
        }

        return true;
        }

      );
    }
  },
  watch: {
    // Triggers when Home component updates the inPassengers variable
    // and passes it into this component
    passengerArray(value) {
      console.log('OUT passengerArray updated');
      this.inPassengers = value;
      this.outPassengers = this.inPassengers;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
