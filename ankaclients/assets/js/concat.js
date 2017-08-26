/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
'use strict';

  var app = angular.module('clientApp', ['ngRoute', 'rzModule'])

  app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
  }]);

    app.config(['$routeProvider',function($routeProvider) {
    $routeProvider
    .when('/', {templateUrl: 'views/main.html', controller: clientListController})
    .when('/client/:client_id', {templateUrl: 'views/client.html',controller: clientViewController})
    .when('/colouring/:colouring_id/:client_name', {templateUrl: 'views/colouring.html',controller: colouringViewController})
    .when('/add-client/', {templateUrl: 'views/add-client.html', controller: clientEditController})
    .when('/add-colouring/:client_id', {templateUrl: 'views/add-colouring.html', controller: colouringEditController})
    .otherwise({redirectTo: '/'});
  }]);

app.controller("RouteController", function($scope, $routeParams) {
     $scope.param = $routeParams.param;
});
/* filters */
 app.filter('weight_g',function(){

      return function(input) {
        return input + "гр."
      }
  });


/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
'use strict';

function clientListController($scope) {
	$scope.clients = clients;
	$scope.categories = categories;
}


function clientViewController($scope, $route, $routeParams) {
	$scope.client = clients[$routeParams.client_id];
	//@TODO: get colourings by client id
	$scope.colourings = colourings;
	$scope.tabSelected = 1;
}

function colouringViewController($scope, $route, $routeParams) {
	$scope.colouring = colourings[$routeParams.colouring_id]; 
  $scope.client_name = $routeParams.client_name;
}

function clientEditController($scope, $route, $routeParams) {

  $scope.client = [];

  $scope.toneSlider = {
    value: 10,
    step: 1
  }

  $scope.greySlider = {
    value: 100,
    step: 1
  }

  $scope.saveContact = function() {
    clients.push(this.client);
  }

}

function colouringEditController($scope, $route, $routeParams) {
    $scope.client_name = clients[$routeParams.client_id].name;
    $scope.colModalOpened = false;
    $scope.oxidModalOpened = false;
    $scope.colors = [];
    $scope.oxids = [];
    

    /* color*/
    // $scope.colorInput = {
    //   name: 'wella1',
    //   num: '',
    //   weight: {value:100, step: 1},       
    // }

    $scope.colorName = 'wella1';
    $scope.colorNum = '';
    $scope.colorWeight = {
      value: 100,
      step: 1};

    /* oxid */
    $scope.oxidWeight = {
      value: 100,
      step: 1
    }

    $scope.oxidPerc = {
      value:100,
      step: 5
    }

    $scope.validation = {
      err: false,
      err_text: ""
    }

    /* functions */
    $scope.addColor = function() {


      this.colModalOpened =  true;
      this.validation.err = false;
      this.validation.err_text = "";

    }

    $scope.addOxidant = function() {
      this.oxidModalOpened =  true;
      this.validation.err = false;
      this.validation.err_text = "";
      
    }

    $scope.saveColor = function() {
      //form validation 
      if ( isNaN(this.colorNum) ) {
        this.validation.err = true;
        this.validation.err_text = "Номер краски не заполнен";
        return;
      }

      this.colModalOpened = false;
      var color = {name: this.colorName, num: this.colorNum, weight: this.colorWeight.value};
      this.colors.push(color);
    }

    $scope.saveOxid = function() {
      this.oxidModalOpened = false;
      var oxid = {weight : this.oxidWeight.value, perc : this.oxidPerc.value}
      this.oxids.push(oxid);
    }

    $scope.closeModal = function() {
      this.colModalOpened = false;
      this.oxidModalOpened = false;
    }
}

/* filters */
/* DATA */
/* clients */
  var clients = [
  	{ 
  		id:0, 
  		name: "Марина Веселова", 
  		img: "https://placeimg.com/40/40/people",
  		natural_tone: 7,
  		grey_perc: 5,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "",
  		sex: "F",
  		address: "",
  		fb_page: "http://facebook.com",
  		other: ""
  	},
  	{ 
  		id:1, 
  		name: "Мария Загацкая", 
  		img: "https://placeimg.com/40/40/people",
  		natural_tone: 5,
  		grey_perc: 15,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "",
  		sex: "F",
  		address: "Tel Aviv",
  		fb_page: "http://facebook.com",
  		other: ""
  	
  	},
  	{ 
  		id:2, 
  		name: "Елена Охотникова", 
  		img: "https://placeimg.com/40/40/people",
  		natural_tone: 8,
  		grey_perc: 25,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "",
  		sex: "F",
  		address: "Бат Ям",
  		fb_page: "http://facebook.com",
  		other: ""
  	}  
  ];



  /* clients category */
  var categories = [

  ];

  /* colouring */
  var colourings = [
  		
  		{
  			id: 0,
  			client_id: 1,
  			date: "2017-08-20",
  			type: "Мелирование",
  			price: 800,
  			colouring_data: {
  				oxid_perc: 10, 
  				oxid_weight_g: 20,
  				colors: [
  					{name: "wella blondor", color_num: 8.6, color_weight_g: 20},
  					{name: "Wella 1", color_num: 8.6, color_weight_g: 20}
  				]
  			}
  		}, 

  		{
  			id: 1,
  			client_id: 1,
  			date: "2015-05-22",
			type: "Корни",
			price: 300,
			colouring_data: {}
  		}

  ];












































/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
'use strict';

function newColorBlock($compile) {

	return {

		restrict: 'E',
		replace: true,
		scope: {},
		template: 
			'<li class="chem-element add-color" ng-click="addColor()"></li>' 	
	}


}
/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */

/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
