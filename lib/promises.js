const Q = require('q') 


module.exports = {
	fromCallback(err, data) {
		var deferred = Q.defer() 
		if(err) 
			deferred.reject(new Error(err)) 
		else 
			deferred.resolve(data) 
	
		return deferred.promise
	}

}
