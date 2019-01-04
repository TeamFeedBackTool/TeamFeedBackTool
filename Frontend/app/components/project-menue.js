"use strict";

app.component("projectMenue", {
    templateUrl: "components/project-menue.html",
    controller: "ProjectMenueController",
    bindings: {}
});


app.controller("ProjectMenueController", function ($log, $rootScope, $scope, $http) {
    $log.debug("ProjectMenueController()");

    this.$onInit = function () {
        $scope.plview = false;
        $scope.giveFeedback = false;
        loadProjects();
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

        let parameter = JSON.stringify({
            projectId: $rootScope.projectId
        });

        let url = "../../Backend/SendProjects.php";

        $http({
            method: 'POST',
            url: url,
            data: parameter
        }).then(
            (response) => {
                $scope.leaderId = response.data.leaderId;
            });
        if ($scope.leaderId === "") {
            $scope.giveFeedback = false;
            $scope.plview = true;
        } else {
            $scope.giveFeedback = true;
            $scope.plview = false;
        }
    };

    let loadProjects = () => {
        let recievingUrlProjectInformation = "../../Backend/SendProjects.php";

        $http({
            method: 'POST',
            url: recievingUrlProjectInformation
        }).then(
            (response) => {
                this.projects = [];
                this.projectTitles = response.data.projectNames.split(";");
                this.projectIds = response.data.projectIds.split(";");
            }, function (error) {
                console.log(error);
            }).then(() => {
            for (let i = 0; i < this.projectIds.length; i++) {
                if (this.projectTitles[i].length > 23) {
                    this.projects.push({
                        'id': this.projectIds[i],
                        'name': this.projectTitles[i].slice(0, 23) + '...'
                    });
                } else {
                    this.projects.push({
                        'id': this.projectIds[i],
                        'name': this.projectTitles[i]
                    });
                }
            }
        }).then(() => {
            // what project is shown in the dashboard
            $rootScope.currentProject = this.projects[this.projects.length];
        });
    };
});