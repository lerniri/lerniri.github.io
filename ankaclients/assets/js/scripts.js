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

  var app = angular.module('AnkaApp', ['ngRoute'])

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

  /* data model*/ 

  /* clients */
  var clients = [
  	{ 
  		id:0, 
  		name: "Иван Иванов", 
  		img: "https://placeimg.com/50/50/people",
  		natural_tone: 7,
  		grey_perc: 5,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "VIP",
  		sex: "M",
  		address: "Bat Yam",
  		fb_page: "http://facebook.com",
  		other: "Лысый. Стричь нечего"
  	},
  	{ 
  		id:1, 
  		name: "Анна Аннова", 
  		img: "https://placeimg.com/50/50/people",
  		natural_tone: 5,
  		grey_perc: 15,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "",
  		sex: "F",
  		address: "Tel Aviv",
  		fb_page: "http://facebook.com",
  		other: "Интересный собеседник"
  	
  	},
  	{ 
  		id:2, 
  		name: "Ирина Иринова", 
  		img: "https://placeimg.com/50/50/people",
  		natural_tone: 8,
  		grey_perc: 25,
  		phone: "+9 999 999 99 99",
  		email: "example@example.com",
  		category: "",
  		sex: "F",
  		address: "Moscow",
  		fb_page: "http://facebook.com",
  		other: "Если стрижка не понравилась, бьет больно"
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
  			date: "2017-01-01",
  			type: "Омбре",
  			colouring_data: {
  				oxid_perc: 10, 
  				oxid_weight_g: 20,
  				colors: [
  					{name: "Wella 1", color_num: 8.6, color_weight_g: 20},
  					{name: "Wella 1", color_num: 8.6, color_weight_g: 20}
  				]
  			}
  		}, 

  		{
  			id: 1,
  			client_id: 1,
  			date: "2015-05-22",
			type: "Корни",
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
			type: "Корни"
		}
	];


})(jQuery, window, document);
