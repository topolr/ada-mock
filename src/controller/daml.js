let express = require("express");
let router = express.Router();

router.post("/islogin", (req, res) => {
    if (req.session.user) {
        res.json({code: "1"});
    } else {
        res.json({code: "0"});
    }
});

module.exports = router;