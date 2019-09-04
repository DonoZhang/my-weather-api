var ObjectId = require('mongodb').ObjectID;

const citySchema = require('../models/city');
const weatherSchema = require('../models/weathers');

class CityRepository{
    constructor(CityModel, WeatherModel){
        this.CityModel = CityModel;
        this.WeatherModel = WeatherModel;
    }

    getAll(query){
        return this.CityModel.find(query);
    }

    getById(id){
        return this.CityModel.findOne({_id: ObjectId(id)}).populate('weathers');
    }

    create(body){
        return this.CityModel.create(body);
    }

    async addWeather(cityId, weatherId){
        let aCity = await this.CityModel.findOne({_id: ObjectId(cityId)});
        if(!aCity){
            throw new Error('City not found');
        }
        aCity.weathers.push(weatherId);
        await aCity.save();
    }

    async removeWeather(cityId, weatherId){
        let aCity = await this.CityModel.findOne({_id: ObjectId(cityId)});
        if(!aCity){
            throw new Error('City not found');
        }
        const index = aCity.weathers.indexOf(weatherId);
        if(index > -1)
            aCity.weathers.splice(index, 1);
        await aCity.save();
    }

    put(id, body){
        return this.CityModel.findOneAndReplace({_id: ObjectId(id)}, body, {new: true});
    }

    patch(id, body){
        return this.CityModel.findOneAndUpdate({_id: ObjectId(id)}, body, {new: true});
    }

    deleteById(id){
           return this.CityModel.findOneAndDelete({_id: ObjectId(id)});
    }
}

let cityRepository = new CityRepository(citySchema, weatherSchema);
module.exports = cityRepository;