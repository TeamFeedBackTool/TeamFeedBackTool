app.component("employeeDropdown", {
    templateUrl: "components/employee-dropdown.html",
    controller: "employeeDropdownController"
});

app.controller("employeeDropdownController", function ($http, $rootScope) {
    let projId = 3;
    let url = "../../Backend/SendFirstnameSurnameWithoutLeader.php";

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
            let firstnames = response.data.firstname.split(";");
            let lastnames = response.data.surname.split(";");
            console.log(firstnames);
            console.log(lastnames);
         }, function (error) {
             console.log(error);
         });
});