const mongoose  = require('mongoose')
const Campground = require('../models/campground')
const cities = require('./cities2.js')
const {places, descriptors} = require('./seedHelpers')
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
const db = mongoose.connection
db.on("error", console.error.bind(console,"connection error:"))
db.once("open",()=>{
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random()*array.length)]


const seedDB = async()=>{
    await Campground.deleteMany({})
    for(let i=0;i<500;i++){
        const random1000 =Math.floor(Math.random()*100)
        const price = Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author:'659d3add2f02c167e3d41f83',
            location: `${cities[random1000].city}, ${cities[random1000].country}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                  url: 'https://res.cloudinary.com/dzocqg5rp/image/upload/v1704547781/YelpCamp/d2utgerpisp8cyypmd3e.png',
                  filename: 'YelpCamp/d2utgerpisp8cyypmd3e',
                }
              ],
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.',
            price,
            geometry:{
                type:'Point',
                coordinates:[
                    cities[random1000].lng,
                    cities[random1000].lat
                ]
            }
        })
        await camp.save()
    }
}
seedDB()