app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function($http, $rootScope){
    $rootScope.$watch('currentEmployee', () => {
        if($rootScope.currentEmployee !== undefined){
            showChart();
        }
    });

    let showChart = () => {
        let parameter = JSON.stringify({
            userId: $rootScope.currentEmployee,
            projectId: $rootScope.projectId
        });

        let url = "../../Backend/SendFeedbacksForIds.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                console.log(response);
                this.stress = JSON.parse(JSON.stringify(response.data.stress));
                this.motivation = JSON.parse(JSON.stringify(response.data.motivation));
                this.work_performance_satisfied = JSON.parse(JSON.stringify(response.data.work_performance_satisfied));
                this.technicalSkills = JSON.parse(JSON.stringify(response.data.technicalSkills));
                this.dates = JSON.parse(JSON.stringify(response.data.dates));
            }, function (error) {
                console.log(error);
            }).then(() => {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [this.dates],
                    datasets: [{
                        label: 'Stress',
                        data: [this.stress],
                        backgroundColor: [
                            'rgba(17, 188, 218, 0.1)'],
                        borderColor: [
                            'rgba(17, 188, 218, 1)']
                    }, {
                        label: 'Motivation',
                        data: [this.motivation],
                        backgroundColor: [
                            'rgba(78, 155, 43, 0.1)'],
                        borderColor: [
                            'rgba(78, 155, 43, 1)']
                    },
                        {
                            label: 'Know-How nötig?',
                            data: [this.technicalSkills],
                            backgroundColor: [
                                'rgba(244, 127, 104, 1)'],
                            showLine: false,
                            pointRadius: 8
                        },
                        {
                            label: 'Leistungszufriedenheit',
                            data: [this.work_performance_satisfied],
                            backgroundColor: [
                                'rgba(0, 127, 104, 1)'],
                            showLine: false,
                            pointRadius: 8
                        }
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    }
                }
            });
        });
    };
});