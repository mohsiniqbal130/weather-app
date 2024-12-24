const path =  require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('postman-request')
const geoCode = require('./utils/geoCode')
const weatherCode = require('./utils/weatherCode')
const { errorMonitor } = require('stream')

const publicDirPath = path.join(__dirname,'../public')
const viewsPathDir = path.join(__dirname,'../templates/views')
const partialsPathDir = path.join(__dirname,'../templates/partials')
const app = express()

app.set('views', viewsPathDir)
app.set('view engine','hbs')
hbs.registerPartials(partialsPathDir)

app.use(express.static(publicDirPath))

app.get('',(req,res) => {
    res.render('index',{
        title : 'Weather',
        name: 'Mohsin Iqbal'
    })
})

app.get('/about',(req,res) => {
    res.render('about',{
        title : 'About',
        name: 'Mohsin Iqbal'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        title : 'Help',
        name: 'Mohsin Iqbal'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'Please enter a location!'
        })
    }
    const address = req.query.search
    geoCode(address,(error, body={})=>{
        if(error){
            res.send('error: ',error)
        } 
        else{
            weatherCode(body.longitudes,body.latitudes,(error, bodyWeather)=>{
                if(error){
                    res.send('error: ',error)
                } 
                else{
                    return res.send({
                        address: body.placeName,
                        weather: bodyWeather.weather
                    })
                }
            })
        }
    })

    // res.send({
    //     weather : 'Its a good sunny day',
    //     location : 'Kohat'
    // })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        title : '404',
        errorMessage : 'Help article not found',
        name: 'Mohsin Iqbal'
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        title : '404',
        errorMessage : 'Page not found.',
        name: 'Mohsin Iqbal'
    })
})

app.listen(3000, () =>{
    console.log('Server running is up on port 3000')
})