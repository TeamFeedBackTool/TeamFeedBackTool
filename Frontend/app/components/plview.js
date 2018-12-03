app.component("plview", {
    templateUrl: "components/plview.html",
    controller: "PlviewController"
});

app.controller("PlviewController", function(){
    var ctx = document.getElementById("myChart");
    var myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
            datasets: [{
                label: 'Stress',
                data: [10,3,5,2,3,4],
                backgroundColor: [
                    'rgba(0, 153, 148, 0.1)'],
                borderColor: [
                    'rgba(0, 153, 148, 1)']
            },{
                label: 'Motivation',
                data: [2,4,5,6,7,5],
                backgroundColor: [
                    'rgba(180, 68, 0, 0.1)'],
                borderColor: [
                    'rgba(180, 68, 0, 1)']},
                {
                    label: 'Know-How benötigt',
                    data: [10,0,10,0,0,10],
                    backgroundColor: [
                        'rgba(229, 181, 27, 0.1)'],
                    borderColor: [
                        'rgba(229, 181, 27, 1)']
                },{
                    label: 'Zufrieden mit Leistungs',
                    data: [10,10,10,0,10,10],
                    backgroundColor: [
                        'rgba(93, 63, 166, 0.1)'],
                    borderColor: [
                        'rgba(93, 63, 166, 1)']}
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