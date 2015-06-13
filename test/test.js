var _ = require(__dirname+'/../index.js')
var assert = require('assert')

describe('Array', function() {
	describe('_.range', function(){
		it('should start from 0 by default', function() {
			assert.equal(0, _.range(3)[0]);
		})
	})
})