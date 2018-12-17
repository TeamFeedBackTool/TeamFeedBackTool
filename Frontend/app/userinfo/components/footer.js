"use strict";

app.component("footer", {
    templateUrl: "components/footer.html",
    controller: "FooterController",
    bindings: {}
});


app.controller("FooterController", function ($log, $rootScope) {
    $log.debug("FooterController()");

    $rootScope.$watch('projectMenueVisibility', () => {
        if ($rootScope.projectMenueVisibility) {
            let element = angular.element(document.querySelector('.footer-without-project-menue'));
            element.addClass('footer-with-project-menue');
            element.removeClass('footer-without-project-menue');
        } else {
            let element = angular.element(document.querySelector('.footer-with-project-menue'));
            element.addClass('footer-without-project-menue');
            element.removeClass('footer-with-project-menue');
        }
    });

});
