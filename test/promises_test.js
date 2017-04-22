const test = require('tape'), 
	p= require('../lib/promises.js'),
	fs = require('fs'),
	pathExists = require('path-exists')

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
	

	assertSuccess(assert,p.fromCallback(whoCallCallback.f) )

})


test('Test promise with an exception error ', (assert) => {   
	var whoCallCallback = {  f: (callback) => {
		callback(new Error("a new error occurred", null))
		}
	}
		assertFailure(assert,p.fromCallback(whoCallCallback.f) )
	
})
		


test('Test promise with callback err', (assert) => {

   var whoCallCallback = {  f: (callback) => {
		console.log("He calls callback with err") 
		callback("Error", "some useless data") 
		}
	}
	

	assertFailure(assert,p.fromCallback(whoCallCallback.f) )
})


test('Write a file and read after with p', (assert) => {
		p.fromCallback(fs.writeFile, ['nuovo.txt', 'nuovofile'])
			.then( (data) => {
//				console.log("data:")
//				console.log(data)
				assert.equal(pathExists.sync('nuovo.txt'), true, 
				'should exists a file ') ;
				console.log("now write file")

				try{ 
				p.fromCallback(fs.readFile, ['nuovo.txt', 'utf-8'])
				.then( (data) => {
//					console.log("in data")
//					console.log(data)
					assert.equal(data, 'nuovofile', 'should read a file')
					assert.end()
				},
				(err) => {
					//console.log("in error")
					assert.fail(err)
					assert.end()
				}

				)
				}
				catch(e) {
					console.log("ERROR")
					console.log(e)
				}
	
			}, 
			(err) => {
				console.log("erro")
				console.log(err)
			}) //End first promise

})


