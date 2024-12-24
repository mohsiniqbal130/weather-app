const request = require('postman-request')

weatherCode = (longitudes={} , latitudes={}, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=68fc43c737860de3f8e4a6ba8840f510&query='+latitudes+','+longitudes
    request({url:url , json:true}, (error, response)=>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }
        else if(response.body.error){
            callback('Please enter a valid location1', undefined)
        }
        else{
            //callback(undefined, response)
            callback(undefined, {
                weather : 'It is  '+response.body.current.weather_descriptions + '. It is '+response.body.current.temperature+' degrees out with a windspeed of '+ response.body.current.wind_speed+'km/h.'
            })
        }
    })

}

module.exports = weatherCode