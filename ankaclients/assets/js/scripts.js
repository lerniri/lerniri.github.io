/*!
 * fastshell
 * Fiercely quick and opinionated front-ends
 * https://HosseinKarami.github.io/fastshell
 * @author Hossein Karami
 * @version 1.0.5
 * Copyright 2017. MIT licensed.
 */
(function ($, window, document, undefined) {

  'use strict';

  var app = angular.module('AnkaApp', ['ngRoute', 'rzModule'])

  app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
  }]);

  app.config(['$routeProvider',function($routeProvider) {
  	$routeProvider
  	.when('/', {
  		templateUrl: 'views/main.html'
  	})
  	.when('/contact/:client_id', {
    	templateUrl: 'views/contact.html'
  	})
  	.when('/colouring/:colouring_id/:client_name', {
  		templateUrl: 'views/colouring.html'
  	})
  	.when('/add-client/', {
  		templateUrl: 'views/add-client.html'

  	})
  	.when('/add-colouring/:client_id', {
  		templateUrl: 'views/add-colouring.html'
  	})
  	.otherwise({
    	redirectTo: '/'
  	});
  }]);

  app.controller('ClientsListController', function(){
  		this.clients = clients;
  });

  app.controller('ClientCardController', function($scope, $route, $routeParams){
  	this.client = clients[$routeParams.client_id];
  });

  app.controller('rangeController', function($scope){
  	$scope.toneSlider = {
  		value: 10, 
  		step: 1,
  		options:  {
  			hideLimitLabels: true
  		}
  	}
  	
  	$scope.greySlider = {
  		value: 100,
  		step: 1,
  		options:  {
  			hideLimitLabels: true
  		}
  	}

  	$scope.weightSlider = {
  		value: 100,
  		step:  1,
  		options:  {
  			hideLimitLabels: true
  		}
  	}

  	$scope.percSlider = {
  		value: 100,
  		step: 1,
  		options: {
  			hideLimitLabels:true
  		}
  	}
  });

  app.controller('CategoryController', function(){
  		this.categories = categories;
  });

  app.controller("RouteController", function($scope, $routeParams) {
     $scope.param = $routeParams.param;
  });

  /* Client card tabs controller */
  app.controller("TabsController", function($scope, $route, $routeParams){
  	$scope.selected = "1";

  });

  app.controller("ColorListController", function($scope, $route,$routeParams){
  	//@todo: get colourings  by $routParams.client_id
  	this.colouring = colourings;
  	
  });

  app.controller("ColorCardController", function($scope,$route,$routeParams){
  	this.colouring = colourings[$routeParams.colouring_id];
  	this.client_name = $routeParams.client_name;




  });

  app.controller('AddColouringController', function($scope,$route,$routeParams){
  	 this.client_name = clients[$routeParams.client_id].name;

  	 $('.add-color').click(function(e){

  	 	var colorList = $(".color-info ul");
  	 	var colorBlock = $("<li class='chem-element edit-mode'><span class='top'>N</span><span class='bottom'></span></li>");
  	 	colorList.prepend(colorBlock);

  	 });

  	 $('.chem-element.edit-mode:after').click(function(e){
  	 	this.removeElement();
  	 });

  });


  /***************************************
  					FILTERS 
  ***************************************/
  app.filter('weight_g',function(){

  		return function(input) {
  			return input + "гр."
  		}
  });
  /* data model*/ 

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
  	// {
  	// 	id:0,
  	// 	name: "Друзья"
  	// },
  	// {
  	// 	id:1,
  	// 	name: "Родственники"
  	// },
  	// {
  	// 	id:2,
  	// 	name: "Знакомые"
  	// }
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


  /* clients coloring */
	var coloring = [
		{
			clientid: 1,
			id:0,
			date: "2017-01-01",
			type: "Омбре",
			price: 800,
			coloringData: {
				oxid: {	name: "Oxilan" , perc: 10, weight_gr: 20 }, 
				color: [{ name: "Wella 1", num: 8.6, weight_gr: 40 },
					{ name: "Wella 2", num: 6, weight_gr: 30 }]
			}			
		},

		{
			clientid: 1,
			id:0,
			date: "2015-05-22",
			type: "Корни",
			price: 500
		}
	];


})(jQuery, window, document);
