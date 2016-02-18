var express = require('express'),
	router = express.Router();

router.get('/api/report/:reportName',function (req,res) {
	console.log("yellow report")
	res.send("{'name':'sandeep'}")
});





//detail item for a atlas map


module.exports = router;