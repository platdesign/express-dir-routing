var fs = require('fs');
var path = require('path');

var inArray = function(array, search) {
	return !!~array.indexOf(search);
};

var Scan = module.exports = function(dir){

	var router = new Scan.Router();

	var controller = [];
	var viewCtrl = [];

	var Route = function(type, method, path, handler, unshift) {
		switch(type) {
			case 'c':
				(unshift) ? controller.unshift(this) : controller.push(this);
			break;
			case 'v':
				(unshift) ? viewCtrl.unshift(this) : viewCtrl.push(this);
			break;
		}

		this.register = function(router) {
			var params = [];
			if(path) { params.push(path); }
			params.push(handler);
			router[method].apply(router, params);
		};
	};

	var registerRoute = function(type, method, path, handler) {
		return new Route(type, method, path, handler);
	};




	fs.readdirSync(dir).forEach(function(item){

		var itemPath = path.join(dir, item);
		var itemStat = fs.statSync( itemPath );




		// Directory
		if( itemStat.isDirectory() ) {

			// if its a lowdash-file
			if( item.substr(0,1) === '_' ) {

				if( item === '_public' ) {
					router.use(express.static(itemPath));
				}

			} else {
				registerRoute('c', 'use', '/'+item, Scan(itemPath), true);
			}
		}



		// File
		if( itemStat.isFile() ) {
			var _item		= basename + '.' + extension;
			var extension 	= path.extname(item).substr(1).toLowerCase();
			var basename 	= path.basename(item, '.'+extension).toLowerCase();

			// If item beginns with an underscore ignore it!
			if( _item.substr(0,1) !== '_' ) {


				if( extension === 'js' ) {

					// If Item is called 'router.js' which exports a useable router
					if( basename === 'router' ) {
						registerRoute('c', 'use', null, require(itemPath));
					} else if( basename === 'index' ) {
						registerRoute('c', 'get', '/', require(itemPath));
					} else {
						registerRoute('c', 'get', '/'+basename, require(itemPath));
					}

				}


				// If item is view-file
				if( inArray(['html', 'jade'], extension) ) {

					var renderItem = function(req, res){
						var scope = res.scope || {};
						res.render(itemPath, scope);
					};

					if( basename === 'index' ) {
						registerRoute('v', 'get', '/', renderItem);
					} else {
						registerRoute('v', 'get', '/'+basename, renderItem);
					}

				}


			}

		}

	});


	controller.forEach(function(route){
		route.register(router);
	});
	viewCtrl.forEach(function(route){
		route.register(router);
	});


	return router;
};


Scan.Router = require('express').Router;
