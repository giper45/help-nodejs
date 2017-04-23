const test = require('tape'),
	data = require('../lib/data.js')








test('Test simple with data', (assert) => {

  var toTest =  [{ name: 'jack' }, { name: 'nico' } ]
	
	  var objArr = data.Objects()
	var obj1 = {name:'jack'} , obj2 = {name:'nico'}
	objArr.add(obj1)
	objArr.add(obj2)
	
		
  assert.same(objArr.all(), toTest, "Shoul return same objects")
  assert.same(objArr.get({name:'jack'}), {name:'jack'})
  
  assert.end();
});


test("Test with id", (assert) =>{
	var ele = [{id:1, name:"jack"}, {id:2, name:"jack"}],
	objects = data.Objects()
	objects.addAll(ele, { exception : {uniq : true} })


	assert.same(objects.get({id:1}), ele[0], "should get first")
	assert.same(objects.get({id:2}), ele[1], "should get second")
	assert.end()
})


test("Test search with special attribute", (assert) => {

	var ele = [
			{id:1, name:"pippo" , color:"blue" } ,
			{id:2, name:"jack" ,color:"red" } 
		]

	objects = data.Objects() 
	objects.addAll(ele) 
	
	assert.equal(ele[0], objects.get({color:"blue"}),"should give blue")
	assert.equal(ele[1], objects.get({color:"red"}), "should give red")
	assert.end()	
})
test("Test find with multples options", (assert) => {
	var ele = [
			{id:1, name:"jack" ,color:"red" } ,
			{id:2, name:"jack" ,color:"blue" } ,  
			{id:3, name:"jack" ,color:"red" } ,  
		]

	objects = data.Objects()
	objects.addAll(ele)
	assert.same(objects.get({color:'red'}), 
			[
			{id:1, name:"jack" ,color:"red" } ,
			{id:3, name:"jack" ,color:"red" } 
			]
	)	
	assert.end()	

})
