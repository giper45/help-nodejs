const Q = require('q') 


module.exports = {
	//Execute a sequence of functions
	sequence(funcs, arg) {
		 return funcs.reduce(Q.when, Q(arg))
	},
	manage(deferred, err, data) {
		if(err) 
			deferred.reject(new Error(err))
	
		else deferred.resolve(data) 

	},
	fromCallback(err, data) {
		var deferred = Q.defer() 
		if(err) 
		{
			if(typeof err === 'error')
				deferred.reject(err) 
			else deferred.refect(err)
		}
		else 
			deferred.resolve(data) 
	
		return deferred.promise
	}

}
