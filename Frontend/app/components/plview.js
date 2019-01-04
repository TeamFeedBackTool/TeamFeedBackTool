app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function($http, $rootScope){

    this.$onInit = function () {
        showChart();
    };


    $rootScope.$watch('currentEmployee', function() {
        showChart();
    });

    let showChart = () => {
        let userId = 3;
        let projectId = 2;

        let stress = '';
        let motivation = '';
        let work_performance_satisfied = '';
        let technicalSkills = '';
        let dates = '';

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
            }, function (error) {
                console.log(error);
            });

        let receivingUrl = "../../Backend/SendFeedbacksForIds.php";

        $http({
            method: 'POST',
            url: receivingUrl
        }).then(
            (response) => {
                console.log(response);
                stress = response.data.stress;
                motivation = response.data.motivation;
                work_performance_satisfied = response.data.work_performance_satisfied;
                technicalSkills = response.data.technicalSkills;
                dates = response.data.dates;
            }, function (error) {
                console.log(error);
            });


        var ctx = document.getElementById("myChart");
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Stress',
                    data: stress,
                    backgroundColor: [
                        'rgba(17, 188, 218, 0.1)'],
                    borderColor: [
                        'rgba(17, 188, 218, 1)']
                }, {
                    label: 'Motivation',
                    data: motivation,
                    backgroundColor: [
                        'rgba(78, 155, 43, 0.1)'],
                    borderColor: [
                        'rgba(78, 155, 43, 1)']
                },
                    {
                        label: 'Know-How nötig?',
                        data: technicalSkills,
                        backgroundColor: [
                            'rgba(244, 127, 104, 1)'],
                        showLine: false,
                        pointRadius: 8
                    },
                    {
                        label: 'Leistungszufriedenheit',
                        data: work_performance_satisfied,
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
    };
});