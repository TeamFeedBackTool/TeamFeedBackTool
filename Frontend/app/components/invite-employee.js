app.component("inviteEmployee", {
    templateUrl: "components/invite-employee.html",
    controller: "InviteEmployeeController"
});


app.controller("InviteEmployeeController", function ($http, $rootScope) {
    let projId = $rootScope.currentProject.id;
    let url = "../../Backend/InviteEmployee.php";

    this.submitEmployee = () => {
        let parameter = JSON.stringify({
            email: this.frm_employee_email,
            projectId: projId
        });

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                console.log(response);
                this.info = response.data.infotext;
            }, function (error) {
                console.log(error);
            });
    }
});