"use strict";

app.component("projectMenue", {
    templateUrl: "components/project-menue.html",
    controller: "ProjectMenueController",
    bindings: {}
});


app.controller("ProjectMenueController", function ($log, $rootScope, $http) {
    $log.debug("ProjectMenueController()");

    this.$onInit = function () {
        let url = "../../Backend/uncalledPHPData.php";

        $http({
            method: 'POST',
            url: url
        }).then(
            (response) => {
                // JSON durchgehen und mittels jQuery's .after() in das Dokument legen
            }, function (error) {
                console.log(error);
            });
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





});
