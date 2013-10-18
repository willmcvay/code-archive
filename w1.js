main()

var main = function (){
  doSomething()
}

var doSomething = function(){
  console.log("hello world")
}

// main will be undefined

var a = "global";

var foo = 2+2;

// IFFE immediately invoked function expression

(function(){
  a = "local";
  console.log(a)
})

var i = 0;
while(i++ < 10){
  setTimeout(function(){
    console.log(i)
  },0);
}

// Defining variable "once", as per underscore.js

var once = function(fn){
  var run 
  var runner = function(){
    if(run) return
      fn();
    run = true;
  }
  return runner;
}

var actualLunch = function(){
  console.log("booom!")
}

var aSafeLaunch = once(actualLunch);
aSafeLaunch()
aSafeLaunch()
aSafeLaunch()

// Writing a forEach function

var list = [1,2,3,4,5,6,7,8]

function myOwnForEach(list, fn){
    for(i = 0; i < list.length; i++){
      fn(i)
    }
}

myOwnForEach(list,function(element, index){
  console.log(element);
})


list.forEach(function(element, index){
  console.log(element);
})

// Some object orientated stuff

function makeGreeter(){
  var greeter = {};
  greeter.greet = function(){
    console.log(this.constructor)
    console.log(this.verb)
  }
  greeter.verb = "hello"
  return greeter;
}

var greeter = makeGreeter()
var greeterA = makeGreeter()

// Prototype alternative

var greeterPrototype = {
  greet: function(){
    console.log(this.verb)
  },
  verb: "hello"
};

function makeGreeter(){
  return Object.create(greeterPrototype);
}

var greeterA = makeGreeter()
greeterA.greet()
var greeterB = makeGreeter()
greeterB.greet()

// or

var greeterPrototype = {
  greet: function(){
    console.log(this.verb)
  },
  verb: "hello"
};

function greeter(verb){
  this.verb = verb
}

greeter.prototype = greeterPrototype;

function newOperator(constructor, verb){
  var args = [].slice(arguments, 1);
  var instance = Object.create(constructor.prototype);
  constructor.apply(instance, args);
  return instance
}

var greeterA = newOperator(greeter, "hi")
greeterA.greet()
var greeterB = new greeter("bye")
greeterB.greet()

// call and apply - both statements return the same

Math.max.apply(Math, [1,2,3,4])
Math.max.call(Math, 1,2,3,4)

// prototyping HTML rows

function ListWidget(rows){
  this.rows = rows
}

ListWidget.prototype = {
  render: function(){
  return this.rows.join(",");
  }
}

var viaNewOp = new ListWidget([1,2,3])

console.log(viaNewOp.render());

