<template>
  <div class="canvasContainer">
    <h4>Survival Analysis</h4>
    <div>
      <canvas id="idSurvivalAnalysis" width="100" height="50"></canvas>
    </div>
  </div>
</template>

<script>
// import Lodash from 'lodash';
import Chart from 'chart.js';

export default {
  name: 'SurvivalAnalysis',
  props: ['passengerArray'],
  data() {
    return {
      ageRanges: [],
      sumSurvived: [],
      sumPerished: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    loadData() {
      var idCanvas = document.getElementById('idSurvivalAnalysis');
      var ctx = idCanvas.getContext("2d");

      var ctxChart = new Chart(ctx, {
        type: 'bar',  // line bar doughnut pie etc
        data: {
          labels: this.ageRanges,
          datasets: [{
            label: 'Survived',
            data: this.sumSurvived,
            backgroundColor: 'rgba(75, 192, 192, 0.4)',
            borderColor: 'rgba(75, 192, 192,1)'
          },
          {
            label: 'Perished',
            data: this.sumPerished,
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            borderColor: 'rgba(255,99,132,1)'
            }]
          },
        options: {
          tooltips: {
            enabled: false
          },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
          }
        });
    }
  },
  watch: {
    // Triggers when Home component updates the inPassengers variable
    // and passes it into this component
    passengerArray(newPassengerArray) {
      console.log('SurvivalAnalysis WATCH triggered');

      // Initialise slots for survival analysis
      this.ageRanges = ["CHILD", "YOUTH", "ADULT", "MIDDLE", "ELDER"];
      this.sumSurvived = [0,0,0,0,0];
      this.sumPerished = [0,0,0,0,0];

      newPassengerArray.forEach(obj => {
        var i;
        // Set age range index
        if (obj.Age < 10) { i = 0 }
        else if (obj.Age < 20) { i = 1 }
        else if (obj.Age < 40) { i = 2 }
        else if (obj.Age < 60) { i = 3 }
        else  { i = 4 };
        // Accumulate into corresponding summary array
        if (obj.Survived == 1) {
          this.sumSurvived[i] += 1
        }
        else {
          this.sumPerished[i] += 1
        };
      });

      // Refresh chart
      this.loadData();

      // Abandoned using lodash in favour of manual construction of chart data arrays
      // This is because countBy only constructs entries for non-zero counts

      // var arrSurvived = newPassengerArray.filter(passenger => {
      //   return passenger.Survived == 1;
      // });
      // // Count survivors grouping by age range
      // var survivedAgeSummary = _.countBy(arrSurvived,function(obj){
      //   if (obj.Age < 10) { return 'CHILD' }
      //   else if (obj.Age < 20) { return 'YOUTH' }
      //   else if (obj.Age < 40) { return 'ADULT' }
      //   else if (obj.Age < 60) { return 'MIDDLE' }
      //   else  { return 'ELDER' }
      // });
      // console.log(JSON.stringify(survivedAgeSummary));
      //
      // // Filter perished
      // var arrPerished = newPassengerArray.filter(passenger => {
      //   return passenger.Survived == 0;
      // });
      // // Count perished grouping by age range
      // var perishedAgeSummary = _.countBy(arrPerished,function(obj){
      //   if (obj.Age < 10) { return 'CHILD' }
      //   else if (obj.Age < 20) { return 'YOUTH' }
      //   else if (obj.Age < 40) { return 'ADULT' }
      //   else if (obj.Age < 60) { return 'MIDDLE' }
      //   else  { return 'ELDER' }
      // });
      //
      // console.log(JSON.stringify(perishedAgeSummary));
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
