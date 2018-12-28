app.component("employeeDropdown", {
    templateUrl: "components/employee-dropdown.html",
    controller: "employeeDropdownController"
});

app.controller("employeeDropdownController", function ($http, $rootScope) {
    let projId = $rootScope.currentProject.id;
    let url = "../../Backend/xxx.php";

    let employees = ["Dominik Novi", "Florian Gödel"];


    // let parameter = JSON.stringify({
    //     projectId: projId
    // });
    //
    // $http({
    //     method: 'POST',
    //     url: url,
    //     data: parameter
    // }).then(
    //     (response) => {
    //         console.log(response);
    //         employees = response.data.employees;
    //     }, function (error) {
    //         console.log(error);
    //     });

});