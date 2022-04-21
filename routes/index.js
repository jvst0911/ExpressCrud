var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", async function (req, res, next) {
  const heros = await global.db.listHeros();

  res.render("index", { heros });
});

router.get("/newHero", function (req, res) {
  res.render("heroAdd", { title: "New Hero", action: "/newHero" });
});

router.post('/newHero', async function(req, res){
  
  const code = create_UUID();
  const name = req.body.name;
  const firstspell = req.body.firstspell;
  const secondspell = req.body.secondspell;
  const thirdspell = req.body.thirdspell;
  const ultimatespell = req.body.ultimatespell;

  await global.db.insertHero({code, name, firstspell, secondspell, thirdspell, ultimatespell})
  res.redirect('/')
})

router.get('/deleteHero/:id', async function(req, res){
  const code = parseInt(req.params.id)
  await global.db.deleteHero(code)
  res.redirect('/')
})

function create_UUID(){
  var dt = new Date().getTime();
  var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (dt + Math.random()*16)%16 | 0;
      dt = Math.floor(dt/16);
      return (c=='x' ? r :(r&0x3|0x8)).toString(16);
  });
  return uuid;
}

module.exports = router; 
