app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function($http){
    let userId=1;
    let projectId=1;

    let stress = '';
    let motivation = '';
    let work_performance_satisfied = '';
    let technicalSkills = '';
    let dates = '';

    let parameter = JSON.stringify({
        userId: userId,
        projectId: projectId
    });
    let url = "../../../Backend/SendFeedbackForIds.php";

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

    let receivingUrl = "../../../Backend/SendFeedbackForIds.php";

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
                    'rgba(0, 153, 148, 0.1)'],
                borderColor: [
                    'rgba(0, 153, 148, 1)']
            },{
                label: 'Motivation',
                data: [10, 3, 5, 6, 7],
                backgroundColor: [
                    'rgba(180, 68, 0, 0.1)'],
                borderColor: [
                    'rgba(180, 68, 0, 1)']}
            ]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
});