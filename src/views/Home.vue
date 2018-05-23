<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Overview" active>
          <b-card>
            <p class="card-text">
             This application is currently focused on data received from the FS-SERVER daemon.
            </p>
            <p class="card-text">
              File: train.CSV
            </p>
            <p class="card-text">
              Timestamp: 14-May-2018 16:24:31
            </p>
            <p class="card-text">
              Format: Comma Separated
            </p>
            <p class="card-text">
              Records: 850
            </p>
            <p class="card-text">
              Columns: one two three
            </p>
            <b-button variant="primary">Next >></b-button>
          </b-card>
        </b-tab>
        <b-tab title="Dataset">
          <Passengers v-bind:passenger-array="homePassengers"></Passengers>
        </b-tab>
        <b-tab title="Survival Analysis">
          <SurvivalAnalysis v-bind:passenger-array="homePassengers"></SurvivalAnalysis>
        </b-tab>
        <b-tab title="Port Breakdown">
          <PortBreakdown v-bind:passenger-array="homePassengers"></PortBreakdown>
        </b-tab>
        <b-tab title="Import">
          <b-card>
            <div>
              <b-btn v-b-modal.modal1>Browse...</b-btn>
              <!-- Modal Component -->
              <b-modal id="modal1" title="Import Select">
                <p class="my-4">
                  Enter filename to analyse.
                </p>
              </b-modal>
            </div>
            <p class="card-text">
              File: train.CSV
            </p>
            <br />
            <b-button variant="primary">Back</b-button>
            <b-button variant="primary">Next</b-button>
          </b-card>
        </b-tab>
      </b-tabs>
    </b-card>
  </div>
</template>

<style scoped>
.home {
    display:inline-block;
    width:60%;
}
.visuals {
    display:inline-block;
    width:80%;
    height:600px;
}
</style>

<script>
// @ is an alias to /src
import Passengers from '@/components/Passengers.vue'
import SurvivalAnalysis from '@/components/SurvivalAnalysis.vue'
import PortBreakdown from '@/components/PortBreakdown.vue'

import axios from 'axios';

export default {
  name: 'home',
  components: {
    Passengers,
    SurvivalAnalysis,
    PortBreakdown
  },
  data() {
    return {
      homePassengers: []
    }
  },
  mounted() {
    var url='http://localhost:4040';
    axios.get(url)
    .then((response) => {
      const bracesWithoutComma = /(}{)/g;
      const bracesWithComma = '},{';
      var temp = "[" + response.data + "]";
      var temp1 = temp.replace(bracesWithoutComma, bracesWithComma);
      this.homePassengers = JSON.parse(temp1);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}
</script>
