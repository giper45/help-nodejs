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

const Loader = stampit().init((condition) => {
	var cond = () => {return true} 
	var data = []
	//If set condition 
	if(condition && typeof condition === 'function')
		cond = condition
		
		
	this.load = (e) => {
		data.push(e)
	}

})


console.o



module.exports = {

	



}
