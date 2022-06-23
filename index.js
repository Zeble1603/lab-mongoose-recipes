const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then((response) => {
    console.log("Database cleaned")
    //Create a new object from Recipe schema
    let bacalhau = {
      "title": "Bacalhau à Brás", 
      "level": "Easy Peasy",
      "ingredients" : [
        "1 pound dried salt cod soaked overnight and cooked",
        "7 tablespoons olive oil",
        "1 1/2 pounds russet potatoes peeled, cut into matchstick-size strips (about 6 cups)",
        "1 large onion thinly sliced",
        "1 bay leaf",
        "8 large eggs",
        "1/2 teaspoon salt",
        "1/2 teaspoon freshly ground black pepper",
        "4 tablespoons chopped flat-leaf parsley leaves",
        "black or green olives"
      ],
      "cuisine":"Portuguese",
      "dishType": "main_course",
      "duration": 75,
      "image": "https://assets.afcdn.com/recipe/20170215/2336_w1024h1024c1cx1500cy1000.webp",
      "creator" : "Blaise Do Caralho",
    }
    return Recipe.create(bacalhau)
  })
  .then((response)=>{
    console.log("New object created in DB:",response.title)
    return Recipe.insertMany(data)
  })
  .then((response)=>{
    for(elt of response){
      console.log("New object created in DB:",elt.title)
    }
    const filter = { title: 'Rigatoni alla Genovese' };
    const update = { duration: 100 };
    return Recipe.findOneAndUpdate(filter,update)
  })
  .then((response)=>{
    console.log("Modified object:",response.title)
    const filter = { title: 'Carrot Cake' };  
    return Recipe.findOneAndDelete(filter)
  })
  .then((response)=>{
    console.log("Deleted object:",response.title)
  })
  .finally(()=>{
    console.log('Closing the DB connection')
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  })
