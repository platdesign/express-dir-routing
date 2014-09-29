module.exports = function(req, res, next) {
	res.scope = {
		title:'HUHU'
	}
	next();
}
