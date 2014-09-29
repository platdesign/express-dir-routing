module.exports = function(req, res, next) {
	res.scope = {
		test:'asdqwe123'
	}
	next()
}
