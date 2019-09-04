var express = require('express');
var router = express.Router();
var cityRepository = require('../repositories/cities');
var weatherRepository = require('../repositories/weathers');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try{
    let result = await cityRepository.getAll(req.query);
    res.json(result);
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

router.post('/', async function(req, res, next){
  try{
    let existingCities = await cityRepository.getAll({name: req.body.name});
    if(existingCities.length > 0){
      res.status(400).json('city exists');
    }
    else{
      let result = await cityRepository.create(req.body);
      res.json(result);
    }
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

//get a weather
router.post('/:id/weathers', async function(req, res, next){
    try{
      let aCity = cityRepository.getById(req.params.id);
      if(!aCity){
          res.sendStatus(404);
      }
      let newWeather = await weatherRepository.create(req.body);
      await cityRepository.addWeather(req.params.id, newWeather.id);
      res.json(newWeather);
    }
    catch(error){
      res.status(500).send(error.message);
    }
});

//delete a weather
router.delete('/:id/weatherId', async function(req, res, next){
    try{
        let aCity = cityRepository.getById(req.params.id);
        if(!aCity){
            res.sendStatus(404).json('City not found');
        }
        let deletedWeather = await weatherRepository.deleteById(req.params.weatherId)
        if(!deletedWeather){
            res.sendStatus(404).json('Weather not found');
        }
        await cityRepository.removeWeather(req.params.id, req.params.weatherId);
        res.json(deletedWeather);
    }
    catch(error){
        res.status(500).send(error.message);
    }
});

router.get('/:id', async function(req, res, next){
  try{
    let result = await cityRepository.getById(req.params.id);
    if(!result){
      res.sendStatus(404);
    }
    else{
      res.json(result);
    }
  }
  catch(error){
    res.status(500).send(error.message);
  }
});

//get weathers of a city
router.get('/:id/weathers', async function(req, res, next){
    try{
      let aCity = await cityRepository.getById(req.params.id);
      if(!aCity){
        res.sendStatus(404);
      }
      else{
        res.json(aCity.weathers);
      }
    }
    catch(error){
      res.status(500).send(error.message);
    }
});

router.patch('/:id', async function (req, res, next) {
  try {
    let result = await cityRepository.patch(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).json(error.message)
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    let result = await cityRepository.put(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

router.delete('/:id', async function(req, res, next){
  try{
    let result = await cityRepository.deleteById(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).send(error.message)
  }
});

module.exports = router;
