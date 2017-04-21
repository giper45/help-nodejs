module.exports = {  
	//substring between two characters
	substring(str, first, second) {

		//Without regex
		if(str.indexOf(first) === -1) 
			return ""
		else { 
			var fI = str.indexOf(first)  +  first.length 
			str = str.substring(fI, str.length)
			if(second) 
			{
				fS = str.lastIndexOf(second)
				console.log("FS:")
				console.log(fS)
				//If don't find second character returns empty string
				if(fS === -1) 
				str = ''
				else str = str.substring(0, fS)	
			}


			return str

		}


	},


	//Remove a string
	remove(str, toRemove, global) {

		var re = new RegExp(toRemove, 'g')
		return (global)? str.replace(re,  ""): str.replace(toRemove, '')		

	}


}
