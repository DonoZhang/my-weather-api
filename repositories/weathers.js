var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const weatherSchema = require('../models/weathers');

class WeatherRepository{
    constructor(WeatherModel){
        this.WeatherModel = WeatherModel;
    }

    getAll(query){
        return this.WeatherModel.find(query);
    }

    getById(id){
        return this.WeatherModel.findOne({_id: ObjectId(id)});
    }

    create(body){
        return this.WeatherModel.create(body);
    }

    put(id, body){
        return this.WeatherModel.findOneAndReplace({_id: ObjectId(id)}, body, {new: true});
    }

    patch(id, body){
        return this.WeatherModel.findOneAndUpdate({_id: ObjectId(id)}, body, {new: true});
    }

    deleteById(id){
           return this.WeatherModel.findOneAndDelete({_id: ObjectId(id)});
    }
}

let weatherRepository = new WeatherRepository(weatherSchema);
module.exports = weatherRepository;