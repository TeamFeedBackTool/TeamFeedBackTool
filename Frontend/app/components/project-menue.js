"use strict";

app.component("projectMenue", {
    templateUrl: "components/project-menue.html",
    controller: "ProjectMenueController",
    bindings: {}
});


app.controller("ProjectMenueController", function ($log, $rootScope, $http) {
    $log.debug("ProjectMenueController()");

    this.$onInit = function () {
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
    };

    let loadProjects = () => {
        this.projects = [];
        let recievingUrlProjectInformation = "../../Backend/SendProjects.php";

        $http({
            method: 'POST',
            url: recievingUrlProjectInformation
        }).then(
            (response) => {
                this.projectTitles = response.data.projectNames.split(";");
                this.projectIds = response.data.projectIds.split(";");
            }, function (error) {
                console.log(error);
            }).then(() => {
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
        }).then(() => {
            // what project is shown in the dashboard
            $rootScope.currentProject = this.projects[this.projects.length];
        });
    };

});