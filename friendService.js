angular.module("devMtIn")
app.service("friendService", function($http, $q) {
	var baseUrl = "http://connections.devmounta.in";
	this.findFriends = function(userId, query) {
		return $http({
			method:'GET',
			url: baseUrl + '/api/friends/' + userId + '?name=' + query
		})
		// .then(function(possibleFriends) {
		// 	console.log(possibleFriends)
		// 	return possibleFriends.data;
		// })
	}
	this.addFriend = function(userId, friendId) {
		return $http({
			method: 'PUT',
			url: baseUrl + '/api/friends/' + userId,
			data: { friendId: friendId }
		})

	}
	this.removeFriend = function(userId, friendId) {
		return $http({
			method: 'PUT',
			url: baseUrl + '/api/friends/remove/' + userId, 
			data: { friendId: friendId}
		})

	}
	this.findFriendsFriends = function (profile) {
      var index = 0
      var deferred = $q.defer()
      function getNextFriend () {
        if (profile.friends[index]) {
          $http({
            method: 'GET',                     
            url: baseUrl + '/api/friends-friends/' + profile.friends[index]._id
          })
            .then(function (friends) {
              profile.friends[index].friends = friends.data
              index++
              getNextFriend()
            })
            .catch(function (err) {
              return console.error(err)
            })
        } else {
          return deferred.resolve(profile)
        }
      }
      getNextFriend()
    }

// 	this.findFriendsFriends = function(profile) {
//   		var index = 0;
//   		var deferred = $q.defer();

// 		  function getNextFriend() {
// 		    if (profile.friends[index]) {
// 		      $http({
// 		        method: 'GET'
// 		      , url: baseUrl + '/api/friends-friends/' + profile.friends[index]._id
// 		      })
// 		      .then(function(friends) {
// 		        profile.friends[index].friends = friends.data;
// 		        index++;
// 		        getNextFriend();
// 		      })
// 		      .catch(function(err) {
// 		        return console.error(err);
// 		      });
// 		    } else { // Once we have finished running through our friends array
// 		      return deferred.resolve(profile); // Resolve our promise with our updated profile
// 		    }
// 		  }
// 		  getNextFriend(); // Invoke the inner function for the first time
// }
	// this.findfriendsfriends = function(profile) {
	// 	var index = 0; // Create an index that we will use to track friends.
	// 	var deferred = $q.defer(); // Create a promise and assign it to the variable deferred
	// 	function getNextFriend() { // Declare a closure function.
	// 		if (profile.friends[index]) { // Check to see if there are friends remaining in the array
	// 			$http({ //Our API request
	// 				method: 'GET',
	// 				url: baseUrl + '/api/friends-friends/' + profile.friends[index]._id
	// 			}).then(function(friends){ //Taking in an array of friends returned from the server.
	// 				profile.friends[index].friends = friends.data; // Update our friend with the recieved data.
	// 				index++; // Increment our counter.
	// 				getNextFriend(); // Recall the function to handle the next friend.
	// 			})
	// 			.catch(function(err) {
	// 				return console.error(err);
	// 			});
	// 		} else {
	// 			deferred.resolve(profile);
	// 			return deferred.promise;
	// 		}
	// 	}
	// 	getNextFriend();
	// }
})