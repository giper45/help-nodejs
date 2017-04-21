const test = require('tape'), 
	promises= require('../lib/promises')






test('Test promise with callback success', (assert) => {

   var whoCallCallback = {  f: (callback) => {
		console.log("He calls callback with data") 
		callback(null, "data") 
		}
	}
	

 whoCallCallback.f(function(err, data) {
	promises.fromCallback(err, data) 
		.then( success = () => { 	
					assert.pass("Should success")
					assert.end()	
					},

		failure = () => { 
					assert.fail("Shouldn't be here") 
					assert.end()	
				})
		})	


})



test('Test promise with callback err', (assert) => {

   var whoCallCallback = {  f: (callback) => {
		console.log("He calls callback with err") 
		callback("Error", "some useless data") 
		}
	}
	

 whoCallCallback.f(function(err, data) {
	promises.fromCallback(err, data) 
		.then( success = () => { 	
					assert.fail("should fail")
					assert.end()	
					},

		failure = () => { 
					assert.pass("Ok it's failure") 
					assert.end()	
				})
		})	


})



