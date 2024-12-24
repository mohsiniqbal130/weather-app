const request = require('postman-request')

geoCode= (address={}, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+address+'&access_token=pk.eyJ1IjoiaW1vaHNpbjEzMCIsImEiOiJjbTJ4Mjd4YnIwMGQyMmxzMWQwZXZtejl1In0.o0e0o8YXE5F2VUUldPmpDQ&limit=1'
    request({url:url, json:true}, (error, response={})=>{
        if(error){
            callback('Unable to connect to geolocation services', undefined)
        }
        else if(response.body.feature === null){
            debugger
            callback('Please enter a valid address', undefined)
        }
        else{
            callback(undefined, {longitudes:response.body.features[0].geometry.coordinates[0],
                      latitudes: response.body.features[0].geometry.coordinates[1],
                        placeName: response.body.features[0].properties.full_address})
        }
    })

}

module.exports = geoCode