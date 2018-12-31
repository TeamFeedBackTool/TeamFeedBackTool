"use strict";

// Einziges Modul dieser App und seine Abhängigkeiten
var app = angular.module("TFT", [ "ngResource", "ngMessages", "ngLocale", "ngSanitize",
    "ngAnimate", "ngMaterial", "ui.router", "ngRoute"]);

// Einstellungen für Debugging
app.config(function($logProvider, $compileProvider, $mdAriaProvider, $qProvider) {
    $logProvider.debugEnabled(true);
    $compileProvider.debugInfoEnabled(true);
    $mdAriaProvider.disableWarnings();
    $qProvider.errorOnUnhandledRejections(false);
});


// $routeProvider Konfiguration
app.config(
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/startpage.html',
                controller: 'StartpageController'
            })
            .when('/dashboard', {
                templateUrl: 'templates/dashboard.html',
                controller: 'DashboardController'
            })
            .when('/userdata', {
                templateUrl: 'templates/userdata.html',
                controller: 'UserdataController'
            })
            .when('/impressum', {
                templateUrl: 'templates/impressum.html',
                controller: 'ImpressumController',
            })
            .when('/not-found', {
                templateUrl: 'templates/not-found.html',
                controller: 'NotFoundController'
            })
            .otherwise({
                redirectTo: '/not-found'
            });
    });


app.controller("StartpageController", function ($log, $http) {
    $log.debug("StartpageController()");



});

app.controller("DashboardController", function ($log, $http) {
    $log.debug("DashboardController()");

    let loggedIn;
    let recievingUrlLogInStatus = "../../Backend/isLoggedIn.php";

    $http({
        method: 'POST',
        url: recievingUrlLogInStatus
    }).then(
        (response) => {
            $log.debug(response.data.isLoggedIn);
        }, function (error) {
            console.log(error);
        });



});

app.controller("UserdataController", function ($log, $http) {
    $log.debug("UserdataController()");



});

app.controller("ImpressumController", function ($log, $http) {
    $log.debug("ImpressumController()");

    this.$onInit = function () {
        let dataFromServer = true;

        if (dataFromServer) {
            angular.element().replaceWith(document.getElementById('header'), '<header></header>');
        }
    };




});

app.controller("NotFoundController", function ($log, $http) {
    $log.debug("NotFoundController()");



});



// Thema einstellen, mögliche Paletten sind:
// red, pink, purple, deep-purple, indigo, blue, light-blue, cyan, teal, green,
// light-green, lime, yellow, amber, orange, deep-orange, brown, grey, blue-grey
app.config(function($mdThemingProvider) {
    $mdThemingProvider.theme("default")
        .primaryPalette("pink")
        .accentPalette("deep-orange");
});


// Datepicker auf AngularJS-Gebietsschema einstellen
app.config(function($localeProvider, $mdDateLocaleProvider) {
    var locale = $localeProvider.$get();

    moment.locale(locale.id);

    $mdDateLocaleProvider.months = moment.months();
    $mdDateLocaleProvider.shortMonths = moment.monthsShort();
    $mdDateLocaleProvider.days = moment.weekdays();
    $mdDateLocaleProvider.shortDays = moment.weekdaysShort();
    $mdDateLocaleProvider.firstDayOfWeek = locale.DATETIME_FORMATS.FIRSTDAYOFWEEK;

    $mdDateLocaleProvider.parseDate = function(dateString) {
        var m = moment(dateString, "L", locale.id);
        return m.isValid() ? m.toDate() : new Date(NaN);
    };

    $mdDateLocaleProvider.formatDate = function(date) {
        var m = moment(date);
        return m.isValid() ? m.format("L") : "";
    };

    $mdDateLocaleProvider.monthHeaderFormatter = function(date) {
        return `${moment.monthsShort()[date.getMonth()]}  ${date.getFullYear()}`;
    };

    $mdDateLocaleProvider.weekNumberFormatter = function(weekNumber) {
        return `Woche ${weekNumber}`;
    };

    $mdDateLocaleProvider.msgCalendar = "Kalender";
    $mdDateLocaleProvider.msgOpenCalendar = "Kalender öffnen";
});

// Workaround, um irreführende Fehlermeldungen von UI-Router zu unterdrücken
app.run(function($state, $trace, $uiRouter) {
    $trace.enable(1);

    var handler = $uiRouter.stateService.defaultErrorHandler();

    $state.defaultErrorHandler(function(error) {
        if (!error.detail || error.detail.message !== "Cannot read property 'call' of undefined") {
            handler(error);
        }
    });
});
