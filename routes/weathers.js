var express = require('express');
var router = express.Router();

let weathers = [
  {id: 1, name: "Melbourne", description: "Hot", icon: "", temp: "23~24"},
  {id: 2, name: "Sydney", description: "Clear", icon: "", temp: "13~24"},
  {id: 3, name: "Brisbane", description: "Rain", icon: "", temp: "22~25"},
  {id: 4, name: "Darwin", description: "Cloud", icon: "", temp: "16~20"}
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('req.query ===>>>', req.query);
  if(req.query){
    var keys =Object.keys(req.query);
    var filteredList = weathers.filter(weather=>{
      for(let i in keys){
        if (weather[keys[i]] != req.query[keys[i]]){
          return false;
        }
      }
      return true;
    });
    res.json(filteredList);
  }
  else{
    res.json(weathers);
  }
});

router.post('/', function(req, res, next) {
  console.log(req.body);
  var newId = weathers[weathers.length - 1].id + 1;
  var newItem = Object.assign({}, {id: newId}, req.body);
  weathers.push(newItem);
  res.json(newItem);
});

router.get('/:id', function(req, res, next){
  let found = weathers.find(x => x.id == req.params.id);
  res.json(found);
});

router.patch('/:id', function(req, res, next){
  let found = weathers.find(x => x.id == req.params.id);
  Object.assign(found, req.body);
  res.json(found);
});

router.put('/:id', function(req, res, next){
  let index = weathers.findIndex(x => x.id == req.params.id);
  let newElement = {...{id: req.params.id}, ...req.body};
  weathers[index] = newElement;
  res.json(newElement);
});

router.delete('/:id', function(req, res, next){
  let index = weathers.findIndex(x => x.id == req.params.id);
  let removed = weathers.splice(index, 1);
  res.json(removed);
});

module.exports = router;
