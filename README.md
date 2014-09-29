#express-dir-routing

##Install

`npm install platdesign/express-dir-routing --save`



##Basic useage

**Application example**

- app.js
- routes
	- about
		- index.jade
	- index.jade
	- index.js
	- contact.jade
- node_modules
- package.json
- ...

**app.js**

	var express = require('express');
	var dirRouting = require('express-dir-routing');


	var app = express();
	
	...
	
	app.use(dirRoutung.scan(__dirname + '/routes'));
	
	...		



##Possible variations

Type 		| View 				| Controller 	| Route
:- 			| :- 				| :- 			| :- 
File		| index.jade		| index.js		| /
File		| *[Name]*.jade		| *[Name]*.js	| /*[Name]*
Directory	| *[Name]*			| router.js		| /*[Name]*



##Contact##

- [mail@platdesign.de](mailto:mail@platdesign.de)
- [platdesign](https://twitter.com/platdesign) on Twitter
