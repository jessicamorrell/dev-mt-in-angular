angular.module("devMtIn")
app.service("profileService", function($http) {
	var baseUrl = "http://connections.devmounta.in/";
	this.serviceTest = function() {
		console.log('profile service is connected!')
	}
	this.saveProfile = function(profile) {
		$http({
        	method: 'POST',
        	url: baseUrl + 'api/profiles/',
        	data: profile
    	})
    	.then(function(profileResponse) {
    		localStorage.setItem('profileId', JSON.stringify({ profileId: profileResponse.data._id }));
    		//console.log(profileResponse);
    	})
    	.catch(function(err) {
    		console.error(err);
    	});
	}
	//FUNCTION BELOW SAVES PROFILE TO LOCAL STORAGE:
	// this.saveProfile = function(profile) {
 	//  	localStorage.setItem('profile', JSON.stringify(profile));
	// }

	this.deleteProfile = function() {
		var profileId = JSON.parse(localStorage.getItem('profileId')).profileId;

		return $http({
			method: 'DELETE',
			url: baseUrl + 'api/profiles/' + profileId
		}); 

	}

	//FUNCTION BELOW DELETES FROM LOCAL STORAGE:
	// this.deleteProfile = function(profile) {
	// 	localStorage.removeItem('profile');
	// }

	this.checkForProfile = function(profileId) {
		return $http({
			method: 'GET',
			url: baseUrl + 'api/profiles/' + profileId
		});
	}

	//FUNCTION BELOW CHECKS FOR PROFILE IN LOCAL STORAGE:
	// this.checkForProfile = function() {
 	//  	if (localStorage.getItem('profile')) {
 //    		return JSON.parse(localStorage.getItem('profile'));
 //  		}
 //  		return {
 //    		//friends: [{name: 'John'}, {name: 'Apache'}, {name: 'Steven'}, {name: 'Natasha'}, {name: 'Katie'}]
 //  		}
	// }
})