app.component("employeeDropdown", {
    templateUrl: "components/employee-dropdown.html",
    controller: "employeeDropdownController"
});

app.controller("employeeDropdownController", function ($http, $rootScope, $scope) {

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
                this.firstnames = response.data.firstnames.split(";");
                this.surnames = response.data.surnames.split(";");
                this.userIds = response.data.userIds.split(";");
            }, function (error) {
                console.log(error);
            }).then(() => {
                for (let i = 0; i < this.surnames.length; i++) {
                    this.users.push((this.firstnames[i] + " " + this.surnames[i]));
                }
        });
        $scope.selectChanged = function () {
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
                    this.firstnames = response.data.firstnames.split(";");
                    this.surnames = response.data.surnames.split(";");
                    this.userIds = response.data.userIds.split(";");
                }, function (error) {
                    console.log(error);
                }).then(() => {
                for (let i = 0; i < this.surnames.length; i++) {
                    if ($scope.selectedUser === (this.firstnames[i] + " " + this.surnames[i])){
                        $rootScope.currentEmployee = this.userIds[i];
                    }
                }
            });
        };
    };
});