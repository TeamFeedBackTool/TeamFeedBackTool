app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function($http, $rootScope){
    $rootScope.$watch('currentEmployee', () => {
        if($rootScope.currentEmloyee !== undefined){
            showChart();
        }
    });

    let showChart = () => {
        let username = $rootScope.currentEmloyee;
        console.log(username);
        let userId = 3;
        let projectId = 2;

        let parameter = JSON.stringify({
            userId: userId,
            projectId: projectId
        });

        let url = "../../Backend/SendFeedbacksForIds.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                console.log(response);
                this.stress = response.data.stress;
                this.motivation = response.data.motivation;
                this.work_performance_satisfied = response.data.work_performance_satisfied;
                this.technicalSkills = response.data.technicalSkills;
                this.dates = response.data.dates;
            }, function (error) {
                console.log(error);
            }).then(() => {
            var ctx = document.getElementById("myChart");
            var myChart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: [0, 1, 2, 3, 4, 5],
                    datasets: [{
                        label: 'Stress',
                        data: [0, 1, 2, 3, 4, 5],
                        backgroundColor: [
                            'rgba(17, 188, 218, 0.1)'],
                        borderColor: [
                            'rgba(17, 188, 218, 1)']
                    }, {
                        label: 'Motivation',
                        data: [0, 1, 2, 3, 4, 5],
                        backgroundColor: [
                            'rgba(78, 155, 43, 0.1)'],
                        borderColor: [
                            'rgba(78, 155, 43, 1)']
                    },
                        {
                            label: 'Know-How nötig?',
                            data: [0, 1, 2, 3, 4, 5],
                            backgroundColor: [
                                'rgba(244, 127, 104, 1)'],
                            showLine: false,
                            pointRadius: 8
                        },
                        {
                            label: 'Leistungszufriedenheit',
                            data: [0, 1, 2, 3, 4, 5],
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