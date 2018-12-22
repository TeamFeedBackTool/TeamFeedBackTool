"use strict";

// Einziges Modul dieser App und seine Abhängigkeiten
var app = angular.module("TFT", [ "ngResource", "ngMessages", "ngLocale", "ngSanitize",
    "ngAnimate", "ngMaterial", "ui.router", "ngRoute"]);

// $routeProvider Konfiguration
app.config(
    function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'templates/index.html'
            })
            .when('/dashboard', {
                templateUrl: 'templates/dashboard.html'
            })
            .when('/userdata', {
                templateUrl: 'templates/userdata.html'
            })
            .when('/impressum', {
                templateUrl: 'templates/impressum.html'
            })
            .when('/404', {
                templateUrl: 'templates/404.html'
            })
            .otherwise({
                redirectTo: '/404'
            });
    });


// Einstellungen für Debugging
app.config(function($logProvider, $compileProvider, $mdAriaProvider, $qProvider) {
    $logProvider.debugEnabled(true);
    $compileProvider.debugInfoEnabled(true);
    $mdAriaProvider.disableWarnings();
    $qProvider.errorOnUnhandledRejections(false);
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
