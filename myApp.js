require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: { type: [ String ], default: undefined }
});

const Person = mongoose.model('Person', personSchema);

const arrayOfPeople = [
  {name: "Wallace", age: 45, favoriteFoods: ["Cheese", "Crackers"]},
  {name: "Grommit", age: 7, favoriteFoods: ["Cheese", "Crackers"]},
  {name: "Preston", age: 8, favoriteFoods: ["Sheep-flavored dog food"]}
];

const createAndSavePerson = (done) => {
  const bilboBaggins = new Person({name: "Bilbo Baggins", age: 144, favoriteFoods: ["bread", "cheese", "bacon", "mushrooms", "mince-pies", "cakes", "blackberries", "good deep mugs of beer"]})
  bilboBaggins.save((err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, (err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, (err, data) => {
    if (err) return console.error(err);
    done(null , data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return console.error(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return console.error(err);

    person.favoriteFoods.push(foodToAdd);
    person.save((err, updatedPerson) => {

      if(err) return console.error(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, { age: ageToSet}, { new: true }, (err, person) => {
    if (err) console.error(err);
    done(null, person);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, person) => {
    if (err) console.error(err);
    done(null, person);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, (err, result) => {
    if (err) console.error(err);
    done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({ favoriteFoods: foodToSearch })
    .sort( { name: 1 })
    .limit(2)
    .select({ name: 1, age: 0, favoriteFoods: 1 })
    .exec((err, data) => {
      if (err) console.error(err);
      done(null, data);
    });
};

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
