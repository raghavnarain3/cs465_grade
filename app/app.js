'use strict';

// Declare app level module which depends on views, and components
var app=angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version'
]);
app.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $routeProvider.when('/', {
            templateUrl : 'index.html',
            controller: 'myFirstController'
        })

  $routeProvider.otherwise({redirectTo: '/view1'});
}]);

$(function () {			
                    $('a[data-toggle="collapse"]').on('click',function(){
				
				var objectID=$(this).attr('href');
				
				if($(objectID).hasClass('in'))
				{
                                    $(objectID).collapse('hide');
				}
				
				else{
                                    $(objectID).collapse('show');
				}
                    });
                    
                    
                    $('#expandAll').on('click',function(){
                        
                        $('a[data-toggle="collapse"]').each(function(){
                            var objectID=$(this).attr('href');
                            if($(objectID).hasClass('in')===false)
                            {
                                 $(objectID).collapse('show');
                            }
                        });
                    });
                    
                    $('#collapseAll').on('click',function(){
                        
                        $('a[data-toggle="collapse"]').each(function(){
                            var objectID=$(this).attr('href');
                            $(objectID).collapse('hide');
                        });
                    });
               
               //$(".progress-bar").addClass('');     
		
    });





app.controller('myFirstController', ['$scope','$http', '$filter' , function($scope, $http, $filter) {
    $http.get('./data/classes.json').
    success(function(data){
      $scope.classes = data;
      console.log(data) ;
      $scope.classes = $filter('filter')($scope.classes, {course_number: "!" + "MUS 181"});

      $scope.whatifclass=0;

      $scope.techE1=2;
      $scope.techE2=1;
      $scope.techE3=3;

      $scope.socE1=1;
      $scope.socE2=1;
      $scope.socE3=1;
      $scope.socE4=2;


      $scope.noFilter1= data;
      $scope.noFilter1=[];
      
      $scope.noFilter2= data;
      $scope.noFilter2=[];
      
      $scope.noFilter3= data;
      $scope.noFilter3=[];

      $scope.checked1=false;
      $scope.checked2=false;
      $scope.checked3=false;
      $scope.checked4=false;
      $scope.checked5=false;
      $scope.checked6=false;

      $scope.flag = false ;

      $scope.modalText = "";
      $scope.thisClass = null

      $scope.setModalText = function(thisList) {
        console.log(thisList);
        var randomNum=Math.floor(Math.random() * (thisList.length));
        $scope.thisClass= thisList[randomNum];
        //$scope.modalText = ();
      }

      $scope.chooseone = function () {
        $scope.add($scope.thisClass);
      };


      $scope.add = function (newClass) {
        $scope.whatifclass+=newClass.hours;
        //console.log(newClass);
        if(newClass.requirement[0]=="Required Courses" || (newClass.requirement.indexOf("Required Courses") > -1))
          {
            $scope.noFilter1.push(newClass);
            $scope.classes = $filter('filter')($scope.classes, {course_name: "!" + newClass.course_name});
          }

          else if(newClass.requirement[0]=="Technical Electives" || (newClass.requirement.indexOf("Technical Electives") > -1)) 
          {
            //console.log(newClass)
            //console.log($scope.classes)
            $scope.noFilter2.push(newClass);
            //console.log(newClass.id)
            $scope.classes = $filter('filter')($scope.classes, {course_name: "!" + newClass.course_name});
            //console.log($scope.classes) ;

            if(newClass.subrequirement[0]=="Advanced Computing Elective")
              $scope.techE1--;
            else if(newClass.subrequirement[0]=="Design Electives")
              $scope.techE2--;
            else if(newClass.subrequirement[0]=="Other Technical Electives")
              $scope.techE3--;

          }
          else if(newClass.requirement[0]=="Social Sciences and Humanities" || (newClass.requirement.indexOf("Social Sciences and Humanities") > -1)) 
          {
            //console.log($scope.noFilter3)
            $scope.noFilter3.push(newClass);
            //console.log($scope.noFilter3.length)
            $scope.classes = $filter('filter')($scope.classes, {course_name: "!" + newClass.course_name});
              
            if ( $scope.classes.length == 0 ) {
               $scope.flag = false ;
            }  


            //console.log('debug') ;
            $scope.flag = true ;


            if(newClass.subrequirement[0]=="Campus Social and Behavioral Science")
              $scope.socE1--;
            else if(newClass.subrequirement[0]=="Campus Humanaties The Arts")
            {
              $scope.socE2--;
              $scope.socE3--;
            }
            else if(newClass.subrequirement[0]=="Western/Comparative")
            {
              $scope.socE2--;
              $scope.socE3--;
            }
            else if(newClass.subrequirement[0]=="Liberal Education Electives")
            {
              $scope.socE4--;
              
            }

          }
          else{
            console.log(newClass)
          }

            console.log($scope.socE4);

            if($scope.techE1==0) $scope.checked1=true;
            if($scope.techE1>0) $scope.checked1=false;
            if($scope.techE2==0) $scope.checked2=true;
            if($scope.techE2>0) $scope.checked2=false;
            if($scope.techE3==0) $scope.checked3=true;
            if($scope.techE3>0) $scope.checked3=false;
            if($scope.socE1==0) $scope.checked4=true;
            if($scope.socE1>0) $scope.checked4=false;
            if($scope.socE2==0) $scope.checked5=true;
            if($scope.socE2>0) $scope.checked5=false;
            if($scope.socE3==0) $scope.checked6=true;
            if($scope.socE3>0) $scope.checked6=false;
            if($scope.socE4==0) $scope.checked7=true;
            if($scope.socE4>0) $scope.checked7=false;
    };

    $scope.addBack = function (newClass) {

      $scope.whatifclass-=newClass.hours;
      $scope.classes.push(newClass);
    


      if(newClass.requirement[0]=="Technical Electives" || (newClass.requirement.indexOf("Technical Electives") > -1)) 
      {
          $scope.noFilter2 = $filter('filter')($scope.noFilter2, {course_name: "!" + newClass.course_name});

            if ( $scope.noFilter2.length == 0 ) {
               $scope.flag = false ;
            }  


            if(newClass.subrequirement[0]=="Advanced Computing Elective")
              $scope.techE1++;
            else if(newClass.subrequirement[0]=="Design Electives")
              $scope.techE2++;
            else if(newClass.subrequirement[0]=="Other Technical Electives")
              $scope.techE3++;
        }

        if(newClass.requirement[0]=="Social Sciences and Humanities" || (newClass.requirement.indexOf("Social Sciences and Humanities") > -1)) 
      {
          $scope.noFilter3 = $filter('filter')($scope.noFilter3, {course_name: "!" + newClass.course_name});
           if ( $scope.noFilter3.length == 0 ) {
               $scope.flag = false ;
            }  


            if(newClass.subrequirement[0]=="Campus Social and Behavioral Science")
              $scope.socE1++;
            else if(newClass.subrequirement[0]=="Campus Humanaties The Arts")
            {
              $scope.socE2++;
              $scope.socE3++;
            }
            else if(newClass.subrequirement[0]=="Western/Comparative")
            {
              $scope.socE3++;
              $scope.socE3++;
            }
            else if(newClass.subrequirement[0]=="Liberal Education Electives")
            {
              $scope.socE4++;
            }
        }

            if($scope.techE1>0) $scope.checked1=false;
            if($scope.techE2>0) $scope.checked2=false;
            if($scope.techE3>0) $scope.checked3=false;
            if($scope.socE1>0) $scope.checked4=false;
            if($scope.socE2>0) $scope.checked5=false;
            if($scope.socE3>0) $scope.checked6=false;
            if($scope.socE4>0) $scope.checked7=false;
    
    };

    $scope.completed = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="Completed") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };

    $scope.inProgress = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="In-Progress") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };
    $scope.registered = function () {
            var count =0;

        for(var i=0; i<$scope.classes.length;i++) 
          {
            if($scope.classes[i].status=="Registered") 
          {
            count+=$scope.classes[i].hours;
          }
          }
              return count;
              };
      /*$scope.orderByMe = function(movies) {
      $scope.myOrderBy = movies;
      }*/
    }).
    error(function(err){
    });
}]);
