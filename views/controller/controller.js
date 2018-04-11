app.controller('testController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

  $scope.skillList = [];
  $scope.showAdd = false;
  $scope.addSkills = {
    "id": "",
    "name": "",
    "status": null
  }

  $scope.searchSkills = {
    "name" :""
  }
  // if using mongo replace the api with apiMongo in the path provided
  // Get skill
  $http
    .get('/apiMongo/skills')
    .then(function (data) {
      // checking length of returned array if 0 then send empty array.
      if (data.data.length > 0) {
        $scope.skillList = data.data;
      } else {
        $scope.skillList = [];
      }
    });

  $scope.addSkill = function () {

    // Add skill
    $scope.addSkills.name = $scope.addSkills.name;
    $scope.addSkills.id = $scope.skillList.length + 1;
    $scope.addSkills.status = null;
    // if using mongo replace the api with apiMongo in the path provided
    $http
      .post('/apiMongo/skills', $scope.addSkills)
      .then(function (data) {
        // check for the length of returned array, if 0 then ask the user to add a skill else send it to backend
        if (data.data.length > 0) {
          
          $scope.addSkills = {};
          alert('Skill added successfully!');
          // Reload the window after the http call returns with response
          $window.location.href = '/';
        } else {
  
          alert('Add a skill');
        }
      });
  }

  $scope.searchSkill = function () {
    
    $http
      .get('/apiMongo/skills',$scope.searchSkills)
      .then(function (data) {
        // check for the length of returned array, if 0 then ask the user to add a skill else send it to backend
        if (data.data.length > 0) {
          var s_list = []
          //alert($scope.searchSkills.name);
          for (var i = data.data.length - 1; i >= 0; i--) {
            //alert(data.data[i].name); 
            if(data.data[i].name == $scope.searchSkills.name){
              
              s_list.push(data.data[i]);
            
            }
          }
          $scope.searchSkills.name = "";
          //alert(s_list);
          $scope.skillList = s_list;
          //alert('Search successfully!');
          // Reload the window after the http call returns with response
          //$window.location.href = '/';
        } else {
          alert('No skill found');
        }
      });
  }


  $scope.changeSkill = function (obj) {

    // Update skills
    // if using mongo replace the api with apiMongo in the path provided
    $http
      .put('/apiMongo/skills/' + obj.id + '/update', obj)
      .then(function (data) {
        $scope.openEdit = false;
        alert('Skill updated Successfully');
        // Reload the window after the http call returns with response
        $window.location.href = '/';
      });

  }

  $scope.changeStatus = function (obj) {
    // Handling unwanted clicks by the user
    if (obj === 'approved') {
      alert('Add a skill');
    } else {

      // Approve status
      // if using mongo replace the api with apiMongo in the path provided
      $http
        .put('/apiMongo/skills/' + obj.id + '/approve', obj)
        .then(function (res) {
          alert('This skill is ' + (res.config.data.status === true ? 'Approved' : 'Rejected'));
          // Reload the window after the http call returns with response
          $window.location.href = '/';
        });
    }
  }
}]);

