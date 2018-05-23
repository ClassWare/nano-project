<template>
  <div>
    <b-card no-body>
      <b-tabs card>
        <b-tab title="Dataset" active>
          <Passengers v-bind:passenger-array="homePassengers"></Passengers>
        </b-tab>
        <b-tab title="Notes">
          <b-card>
            <p class="card-text">
              This application processes data sent from a NodeJs server named <strong>fs-server-csvtojson</strong>.
            </p>
            <p class="card-text">
              The details currently shown on this tab are currently fixed in nature, serving as a placeholder.
            </p>
            <p class="card-text">
              This tab should ideally refresh if the inbound file is changed (not implemented).
            </p>
            <p class="card-text">
              File: train.CSV
            </p>
            <p class="card-text">
              Timestamp: 19-May-2018 16:24:31
            </p>
            <p class="card-text">
              Format: Comma Separated
            </p>
            <p class="card-text">
              Records: 891 (Headers: 1, Data: 890)
            </p>
            <p class="card-text">
              Columns: one two three
            </p>
          </b-card>
          <b-card border-variant="danger" bg-variant="warning">
            <p class="card-header">
              <strong>Known Problems</strong>
            </p>
            <p class="card-text">
              Inline positioning of the chartjs components proving to be somewhat problemmatic.
              Used -ve positioning values to get them where they are, but this is interfering somehow with screen interaction.
            </p>
            <p class="card-text">
              Because of an error in CSVTOJSON, the node server <strong>fs-server-csvtojson</strong> must be stopped and re-started.
            </p>
          </b-card>
        </b-tab>
        <b-tab title="Import">
          <b-card>
            <div>
              <p>
                Just a placeholder for an idea ....
              </p>
              <b-btn v-b-modal.modal1>Browse...</b-btn>
              <!-- Modal Component -->
              <b-modal id="modal1" title="Import Select">
                <p class="my-4">
                  Just an idea ....
                </p>
                <br />
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
