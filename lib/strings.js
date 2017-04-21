module.exports = {  
	//substring between two characters
	substring(str, first, second) {

		console.log("in substring")
		//Without regex
		var fI = str.indexOf(first)  +  first.length 
		str = str.substring(fI, str.length)
		console.log("String:")
		console.log(str)
		if(second) 
		{
			console.log("second:"+second)
			fS = str.lastIndexOf(second)
			str = str.substring(0, fS)	
		}


		return str


	},


	//Remove a string
	remove(str, toRemove, global) {

		var re = new RegExp(toRemove, 'g')
		return (global)? str.replace(re,  ""): str.replace(toRemove, '')		

	}


}
