app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function($http, $rootScope, UserdataService){
    let userId;
    let projectId = $rootScope.currentProject.id;
    UserdataService.getUserdata().then(x => {
       userId = x.userId;
    }).then(() => {
        let stress = '';
        let motivation = '';
        let work_performance_satisfied = '';
        let technicalSkills = '';
        let dates = '';

        let parameter = JSON.stringify({
            userId: userId,
            projectId: projectId
        });
        let url = "../../Backend/SendFeedbackForIds.php";

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

        let receivingUrl = "../../Backend/SendFeedbackForIds.php";

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
                labels: [1, 2, 3, 4, 5],
                datasets: [{
                    label: 'Stress',
                    data: [3, 5, 8, 2, 5],
                    backgroundColor: [
                        'rgba(17, 188, 218, 0.1)'],
                    borderColor: [
                        'rgba(17, 188, 218, 1)']
                }, {
                    label: 'Motivation',
                    data: [10, 3, 5, 6, 7],
                    backgroundColor: [
                        'rgba(78, 155, 43, 0.1)'],
                    borderColor: [
                        'rgba(78, 155, 43, 1)']
                },
                    {
                        label: 'Know-How nötig?',
                        data: [0, 0, 10, 0, 10],
                        backgroundColor: [
                            'rgba(244, 127, 104, 1)'],
                        showLine: false,
                        pointRadius: 8
                    },
                    {
                        label: 'Leistungszufriedenheit',
                        data: [10, 10, 0, 10, 0],
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
});