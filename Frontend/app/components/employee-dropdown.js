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
            let surnames = response.data.surname.split(";");
             for (let i = 0; i < surnames.length; i++) {
                 employees.push(firstnames[i] + " " + surnames[i]);
             }
            console.log(employees);
         }, function (error) {
             console.log(error);
         });

    $scope.selectChanged = function(){
        $rootScope.currentEmloyee = $scope.employee;
    };
});