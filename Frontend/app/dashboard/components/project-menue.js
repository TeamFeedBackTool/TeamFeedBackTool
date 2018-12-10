"use strict";

app.component("projectMenue", {
    templateUrl: "components/project-menue.html",
    controller: "ProjectMenueController",
    bindings: {}
});


app.controller("ProjectMenueController", function ($log, $rootScope) {
    $log.debug("ProjectMenueController()");

    this.$onInit = function () {




        /*
        this.projects = [];
        let recievingUrlProjectInformation = "../../../Backend/sendProjects.php";

        $http({
            method: 'POST',
            url: recievingUrlProjectInformation
        }).then(
            (response) => {
                this.projectTitles = response.data.projectNames;
                this.projectIds = response.data.projectIds;
            }, function (error) {
                console.log(error);
            });

        for (let i = 0; i < this.projectIds.length; i++) {
            if (this.projectTitles[i].length > 23) {
                this.projects.push({
                    'id' : this.projectIds[i],
                    'name' : this.projectTitles[i].slice(0, 23) + '...'
                });
            } else {
                this.projects.push({
                    'id' : this.projectIds[i],
                    'name' : this.projectTitles[i]
                });
            }
        }
        console.log(this.projects);

        // what project is shown in the dashboard
        $rootScope.projectName = this.projects[0];


        this.frm_userId = cookie.split(';')[3].split('=')[1];
        let sendingParameter = JSON.stringify({
            userId: this.frm_userId,
        });

        let sendingUrl = '../../JSONToPHP.php';

        $http({
            method: 'POST',
            url: sendingUrl,
            data: sendingParameter
        }).then(
            (response) => {
                console.log(response);
            }, function (error) {
                console.log(error);
            });
            */

    };

    $rootScope.$watch('projectMenueVisibility', () => {
        if ($rootScope.projectMenueVisibility) {
            let element = angular.element(document.querySelector('.project-menue-closed'));
            element.addClass('project-menue-opened');
            element.removeClass('project-menue-closed');
        } else {
            let element = angular.element(document.querySelector('.project-menue-opened'));
            element.addClass('project-menue-closed');
            element.removeClass('project-menue-opened');
        }
    });

    this.clickedOnProjectTitle = ($event) => {
        $rootScope.projectId = angular.element($event.currentTarget).attr('project-id');
    };

});