<template>
  <div>
    <h3>Port Breakdown</h3>
    <div class="canvasContainer">
      <canvas id="idPortBreakdown"></canvas>
    </div>
  </div>
</template>

<style scoped>
.canvasContainer {
  width:60%;
  margin: auto;
}
</style>


<script>
import Chart from 'chart.js';

export default {
  name: 'PortBreakdown',
  props: ['passengerArray'],
  data() {
    return {
      portNames: [],
      sumMalesByPort: [],
      sumFemalesByPort: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      var idCanvas = document.getElementById('idPortBreakdown');
      var ctx = idCanvas.getContext("2d");

      var ctxChart = new Chart(ctx, {
          type: 'doughnut',
          data: {
              labels: this.portNames,
              datasets: [
              {
                  label: 'Male',
                  data: this.sumMalesByPort,
      						backgroundColor:      ['rgba(30, 94, 232, 0.4)',
                                         'rgba(33, 4, 96, 0.4)',
                                         'rgba(4, 89, 96, 0.4)'],
      						hoverBackgroundColor: ['rgba(30, 94, 232, 1)',
                                         'rgba(33, 4, 96, 1)',
                                         'rgba(4, 89, 96, 1)'],
      						hoverBorderWidth: 1
              },
              {
                  label: 'Female',
                  data: this.sumFemalesByPort,
      						backgroundColor:      ['rgba(241, 81, 124, 0.4)',
                                         'rgba(221, 88, 197, 0.4)',
                                         'rgba(242, 151, 109, 0.4)'],
      						hoverBackgroundColor: ['rgba(241, 81, 124, 1)',
                                         'rgba(221, 88, 197, 1)',
                                         'rgba(242, 151, 109, 1)'],
      						hoverBorderWidth: 1
              }
              ]
          },
          options: {
              legend: {
                  text: "Port Breakdown",
                  display: true
              }
          }
         }
      );

    }
  },
  watch: {
    // Triggers when Home component updates the inPassengers variable
    // and passes it into this component
    passengerArray(newPassengerArray) {
      console.log('PortBreakdown WATCH triggered')

      // Initialise slots for survival analysis
      this.portNames = ["SOUTHAMPTON", "CHERBOURG", "QUEENSTOWN"];
      this.sumMalesByPort = [0,0,0];
      this.sumFemalesByPort = [0,0,0];

      // Summarise passengers by port of embarkation
      newPassengerArray.forEach(obj => {
        var i;
        // Set port index
        if (obj.Embarked == "S") { i = 0 }
        else if (obj.Embarked == "C") { i = 1 }
        else if (obj.Embarked == "Q") { i = 2 }
        else  { i = 3 }; // Unexpected port

        // Accumulate into corresponding summary array
        if (i < 3) {
          if (obj.Sex == "male") {
            this.sumMalesByPort[i] += 1
          }
          else if (obj.Sex == "female") {
            this.sumFemalesByPort[i] += 1
          }
          else {
            // Unexpected gender
          };
        }
      });

      // Refresh chart
      this.loadData();
    }
  }
}
</script>

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
