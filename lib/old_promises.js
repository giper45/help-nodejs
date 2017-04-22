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
	fromCallback(f, args ) {
		args =  args || []


		console.log("sono in from callback")
		var deferred = Q.defer() 
		var callback = (err, data) => {
		if(err) 
		{
			
			if(typeof err === 'error')
			{
				deferred.reject(err) 
			}
			else 
			{
				deferred.reject(new Error(err))
			}
		}
		else 
			deferred.resolve(data) 
	
	}

		//push the last on callback
		args.push(callback)
		f.apply(this, args) 

		return deferred.promise
	}
}


