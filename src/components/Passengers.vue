<template>
  <div>
    <div class="passengers">

      <div style="width:60%;">
        <div class="row">
          <div class="col-md-12">
            <form class="row form">
              <div class="col-md-3">
                <div class="form-group">
                  <label for="passengerName">Name</label>
                  <input type="text" class="form-control" id="passengerName" v-model="passengerName" v-on:change="filterData()">
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="surviveGroup">Survived</label>
                  <span id="surviveGroup" class="form-control">
                    <label class="radio-inline"><input type="radio" value=1 v-model="survived" v-on:change="filterData()">Yes</label>
                    <label class="radio-inline"><input type="radio" value=0 v-model="survived" v-on:change="filterData()">No</label>
                    <label class="radio-inline"><input type="radio" value=-1 v-model="survived" v-on:change="filterData()">All</label>
                  </span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="genderGroup">Gender</label>
                  <span id="genderGroup" class="form-control">
                    <label class="radio-inline"><input type="radio" value=1 v-model="gender" v-on:change="filterData()">Male</label>
                    <label class="radio-inline"><input type="radio" value=0 v-model="gender" v-on:change="filterData()">Female</label>
                    <label class="radio-inline"><input type="radio" value=-1 v-model="gender" v-on:change="filterData()">All</label>
                  </span>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="ticketId">Ticket</label>
                  <input type="text" class="form-control" id="ticketId" v-model="ticketId" v-on:change="filterData()">
                </div>
              </div>
            </form>
            <p>
              Please enter search criteria and click enter or
              <button type="submit" class="btn btn-primary" @click.prevent="mySubmit">Submit</button>
            </p>
          </div>
        </div>

        <h3>Passenger List</h3>
        <div style="overflow:auto; max-height:500px">
          <b-table class="text-left" small striped hover :items="outPassengers" :fields="fields">
          </b-table>
        </div>
      </div>
  </div>
  <!-- <div style="position:relative;top:-600px;left:500px;"> -->
  <div class="saRightFixed">
    <SurvivalAnalysis v-bind:passenger-array="outPassengers"></SurvivalAnalysis>
  </div>
  <!-- <div style="position:relative;top:-600px;left:500px;"> -->
  <div class="pbRightFixed">
    <PortBreakdown v-bind:passenger-array="outPassengers"></PortBreakdown>
  </div>

  </div>
</template>

<style>
.saRightFixed {
    position:fixed;
    top: 10%;
    right: 1%;
    width: 30%;
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
    padding: 10px;
}
.pbRightFixed {
    position:fixed;
    top: 45%;
    right: 1%;
    width: 30%;
    border-style: solid;
    border-radius: 4px;
    border-width: 1px;
    padding: 10px;
}
</style>

<script>

//import axios from 'axios';
import SurvivalAnalysis from './SurvivalAnalysis.vue'
import PortBreakdown from './PortBreakdown.vue'

export default {
  name: 'Passengers',
  components: {
    SurvivalAnalysis,
    PortBreakdown
  },
  props: ['passengerArray'],
  data() {
    return {
      fields: [
        { key: 'PassengerId', label: 'Id'},
        { key: 'Survived', label: 'Surv'},
        { key: 'Pclass', label: 'Class'},
        { key: 'Name', label: 'Name'},
        { key: 'Sex', label: 'Gender'},
        { key: 'Age'},
        { key: 'Ticket'},
        { key: 'Fare'},
        { key: 'Cabin'},
        { key: 'Embarked', label:'Port'}
      ],
      survived: -1,
      gender: -1,
      passengerName: "",
      ticketId: "",
      columnNames: [],
      inPassengers: [],
      outPassengers: []
    }
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
        if (this.gender > -1) {
          if (this.gender == 0 && rev.Sex == "male") {
           return false;
          }
          if (this.gender == 1 && rev.Sex == "female") {
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
      console.log('PassengerArray updated');
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
