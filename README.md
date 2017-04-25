# help-node js
A simple module that provides utility for implements sequence of operation via promises, managment errors, debugging, testing purposes



## Installation

```
npm install --save help-nodejs
```



## Motivation

The goal of this library is to simplify some tasks, for example the serial execution of hybrid functions (async, sync , promises)  , the managment of errors. I wrote to simplify these tasks in my project  :

### Sequence of operation   

Often you'll need to do sequences of operations. The classical way to do this is by async.waterfall : 
```javascript
async.waterfall([ 
      doSomething(args, cb) ,
      doOtherThings(res, cb) ,
       .... 
       ], 
       function end(err, res) {
        if(err)
            //Manage error 
        else 
            //Manage data 
        }
         )
   ```
Well, this is a great approach to avoid the "hell of waterfall if then else" : 
```javascript
 doSomething(args, function(err, data) {
    if(!err) 
        doOtherThings(res, function(err, data) {
          continue to annidate functions
          ..... 
          }
       })
 ```
Anyway, it's a little annoying to set callback to the end of each func. 
An amazing approach is to use promises (https://www.npmjs.com/package/q) . 
Great, of course, but how to manage different types of functions (async, sync)? help-nodejs converts all types of functions in promise functions : 
```javascript
p = require('help-nodejs').promises
p.sequence([
                        //Convert from async
                        p.fromAsync(fs.writeFile, ["inSeq.txt", "sonoinseq"]),
                        //Read file
                        () => { return p.fromAsync(fs.readFile, ["inSeq.txt", "utf8"])} ,
                ])

                .then(
                        (data) => {
                                assert.equal(data, "sonoinseq","should read the written file")
                                assert.end()
                        },
                        (err) => {
                                assert.fail()
                                assert.end()
                                }
                )

})
        
        or
        
   p.sequence([
                () => {return p.fromSync(fSync, [2, 3])},
                (data) => {return p.fromAsync(fs.writeFile, ["operations.txt", data])},
                () => {  return p.fromSync(fs.readFileSync, ["operations.txt", "utf8"]) }
                ])
                .then(
                (data) => {
                                assert.equal(data, '5', "should give 5")
                                assert.end()
                        },

                (err) =>{
                                assert.fail("failure")
                                assert.end()
                      })

```

p.sequence accept and execute a list of promises that you can convert from sync and async functions with p.fromSync, p.fromAsync. These functions accept an array of arguments. 
Boring because too much code? Well, use the seqMaker func: 
```javascript
    var makerSeq = p.seqMaker()
        makerSeq
                .addSync(function(d1,d2) { return d1+d2}, [4, 5])
                .addSync(fs.writeFileSync, ['toSave.txt'], true)
                .addAsync(fs.readFile, ['toSave.txt', 'utf8'])
                .start()
                        .then( (data) => {
                                assert.equal(data, '9', "should do the sync ops")
                                assert.end()

                        },

                        (err) => {
                                assert.fail("failure")
                                assert.end()
                        })
```                        

Now your code is more compact and simpler, like a sequential code. 

### Data 
Many times you need to load an array with arguments of same type, and you've to search them by an identificator (id or name, for example). data.js offers a special type of array : Objects. 
You can set a **condition** function that must returns true if the object you're trying to insert in the array is of correct type. 
For example, suppose that you want an array of objects with name and color properties: 
```javascript
   var objects = data.Objects(function(e){ if (e.name && e.color) return true; else return false })
        objects.setOptions({exception : {add:true, uniq:true}})


        objects.add({name:'prova', color:'green'})
        assert.throws(() => objects.add({name:'prova', color:'red'}), "Should throw error")
        assert.throws(() => objects.add({name:'p'}), "No color should throw error")
        assert.throws(() => objects.add({color:'p'}), "No name should throw error")
        //objects.add({color:'p'})
        assert.end()
```
The setOptions function sets some options for the array. If you set exception.add to true, when you're trying to add an object that doesn't match the schema defined in the condition function Objects will throw an exception, else simply returns. The same for the "uniq": Objects doesn't accept two equal objects, if you try to add an object already loaded it won't allow you (and it will throw an exception if you set exception.uniq to true) 
Use the get function to find the loaded objects : 
```javscript
        var ele = [
                        {id:1, name:"pippo" , color:"blue" } ,
                        {id:2, name:"jack" ,color:"red" }
                ]

        var objects = data.Objects()
        objects.addAll(ele)

        assert.equal(ele[0], objects.get({color:"blue"}),"should give blue")
        assert.equal(ele[1], objects.get({color:"red"}), "should give red")
```

###  print_dbg
If you're writing an async function  you'll need to test the return, sometimes with the following way: 
```javascript
function (err, data) {
        if(err) 
        {   
                console.log("Some error:")    
                console.log(err) 
        }   

        else  {
                console.log("Success:") 
                console.log(data)
              }   
}
```
well, print_dbg implement this simple if then else, so you'll do this : 



```javascript
const pd = require('help-nodejs').print_dbg
fs.readFile('fileToRead', pd) 

```

### Strings

Some simple utility function to manage strings: 

* How much occurrences of a substring in a string?  

  ```javascript
     occurrences(string, subString, allowOverlapping)  
    ```  
    
* substring inside two words / character 

  ```javascript
     substring(str, first, second)
    ```
    
 * Add a string after the first ( of all) occurrences 
 ```javascript 
 add(str, toAdd, after, global)
 ```
  * Remove a substring from a string : 
  ```javascript 
  remove(str, toRemove, global)
  ```
  
  
  


### Error managment



## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests

Describe and show how to run the tests with code examples.

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable.

## License

A short snippet describing the license (MIT, Apache, etc.)
