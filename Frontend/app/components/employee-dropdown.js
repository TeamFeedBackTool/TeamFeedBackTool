app.component("employeeDropdown", {
    templateUrl: "components/employee-dropdown.html",
    controller: "employeeDropdownController"
});

app.controller("employeeDropdownController", function ($http, $rootScope, $scope, $log) {

    this.$onInit = function () {
        showEmployees();
    };

    let showEmployees = () => {
        this.users = [];

        let projId = 3;
        let url = "../../Backend/SendFirstnameSurnameWithoutLeader.php";

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
            }, function (error) {
                console.log(error);
            }).then(() => {
                this.firstnames = response.data.firstname.split(";");
                this.surnames = response.data.surname.split(";");
                for (let i = 0; i < surnames.length; i++) {
                    this.users.push(firstnames[i] + " " + surnames[i]);
                }
            console.log(this.firstnames);
        });

        $scope.selectChanged = function () {
            $rootScope.currentEmloyee = $scope.users;
        };
    };
});