app.component("employeeDropdown", {
    templateUrl: "components/employee-dropdown.html",
    controller: "employeeDropdownController"
});

app.controller("employeeDropdownController", function ($http) {
    let projId = 1;
    let url = "../../../Backend/xxx.php";

    let employees = [];

    let parameter = JSON.stringify({
        projectId: projId
    });

    $http({
        method: 'POST',
        url: url,
        data: parameter
    }).then(
        (response) => {
            console.log(response);
            employees = response.data.employees;
        }, function (error) {
            console.log(error);
        });
});