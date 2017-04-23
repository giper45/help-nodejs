const stampit = require('stampit'),
	_ = require('underscore')

// Some privileged methods with some private data.
const Availability = stampit().init(function() {
  var isOpen = false; // private

  this.open = function open() {
    isOpen = true;
    return this;
  };
  this.close = function close() {
    isOpen = false;
    return this;
  };
  this.isOpen = function isOpenMethod() {
    return isOpen;
  }
});

//Array of uniq object instance
const Objects = stampit().init( function(condition)  {
	var cond = () => {return true} 
	var data = [];
	//If set condition 
	if(condition && typeof condition === 'function' ) 
		cond = condition()
		
	this.addAll = (arr, options) => {
		_.each(arr, (e) => { 
			this.add(e,options) 
			})

	}	
	this.add = (e, options) =>  {

		options = _.extend({}, options, { exception:{add:false, uniq:false}})

		if(cond(e))
		{
			//If already exists
			if(this.get(e, options.id))
			{
				console.log("esiste gia")
				//Is silent?
				if(options.exception.uniq)
					throw new Error("No uniq") 
				else return 
			}
				
			data.push(e)
		}
		else 
			if(options.exception.add)
				return 
			else 
				throw new Error("Condition not satisfied")
	}

	this.get = (e) => {
		var ret = []
			//If id it's defined
			if(ret.length === 0 && e.id) 
			{  	
				ret = _.where(data, {id : e.id})
			}
			//Find by name if no id
			else if(ret.length === 0 && e.name) 
			{
				ret = _.where(data, {name : e.name})
			}

			else {
				_.each(_.keys(e), (arg) => { 
					ret = _.where(data, {[arg] : e[arg]})	
					if(ret)	
						return  ret
				})

			}

			if(ret.length === 1)
				return ret[0]
			else if (ret.length === 0)
				return null
			else return ret

	}
	this.all = () => { return data } 

})

module.exports = { 
			Objects : (c) => { return Objects(c)}

}
