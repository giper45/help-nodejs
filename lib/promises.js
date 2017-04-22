const Q = require('q') 

function _cleanArray(args) {

		if(!args) 
		args = []
		else if(! Array.isArray(args)) 	
			args = [args]
		var args =  args || [];
return args

}
module.exports = {
	//Execute a sequence of functions
	sequence(funcs, firstArg) {
		 return funcs.reduce(Q.when, Q(firstArg))
	},
	manage(deferred, err, data) {
		if(err) 
			deferred.reject(new Error(err))
	
		else deferred.resolve(data) 

	},
	fromSync(f, args) {
		var args = _cleanArray(args)
		var deferred = Q.defer() 
		try { 

		  var ret = f.apply(null, args)	
		  deferred.resolve(ret)
		 return deferred.promise
		}
		catch(err) {
		   deferred.reject(err) 
		 return  deferred.promise
		}

	},
	fromAsync(f, args ) {
		var deferred = Q.defer() 
		try { 
		var args = _cleanArray(args)
		var callback = (err, data) => {
		if(err) 
		{
			if(typeof err === 'error')
			{
				deferred.reject(err) 
				//reject(err) 
			}
			else 
			{
				deferred.reject(new Error(err))
				//reject(new Error(err))
			}
		}
		else 
			deferred.resolve(data) 
	
	}

		args.push(callback)
		console.log("args:")
		console.log(args)

		f.apply(null, args) 
		return deferred.promise
		}
		catch(e) 
		{
			deferred.reject(e)
			return deferred.promise
		}
		//push the last on callback
}
}


