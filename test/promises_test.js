const test = require('tape'), 
	promises= require('../lib/promises')

assertSuccess = (assert,p) =>{

		p.then( success = () => { 	
					assert.pass("Should success")
					assert.end()	
					},

		failure = () => { 
					assert.fail("Shouldn't be here") 
					assert.end()	
				})
}

assertFailure = (assert,p) => { 
		p.then( success = () => { 	
					assert.fail("should fail")
					assert.end()	
					},

		failure = () => { 
					
					assert.pass("Ok it's failure") 
					assert.end()	
				})
}

test('Test promise with callback success', (assert) => {

   var whoCallCallback = {  f: (callback) => {
		console.log("He calls callback with data") 
		callback(null, "data") 
		}
	}
	

 whoCallCallback.f(function(err, data) {
	assertSuccess(assert,promises.fromCallback(err, data) )


})

})


test('Test promise with an exception error ', (assert) => {   
	var whoCallCallback = {  f: (callback) => {
		callback(new Error("a new error occurred", null))
		}
	}
	whoCallCallback.f(function(err, data) {
		assertFailure(assert,promises.fromCallback(err, data) )

	})
	
})
		


test('Test promise with callback err', (assert) => {

   var whoCallCallback = {  f: (callback) => {
		console.log("He calls callback with err") 
		callback("Error", "some useless data") 
		}
	}
	

 whoCallCallback.f(function(err, data) {
	assertFailure(assert,promises.fromCallback(err, data) )
})

})



