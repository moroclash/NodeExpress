const mongoose = require('mongoose')



mongoose.connection('mongodb://localhost/db_name')
    .then(() => console.log('connection works'))
    .catch(err => console.log('connection faild ', err))

const courseSchema = new mongoose.Schema({
    name: String,
    tage: [String],
    date: { type: Date, default: Date.now },
    isBoolean: { type: Boolean, required: true },
    details: { type: String, maxlength:5, minlength:5, match: /.*pattern.*/},
    category: { type: String, enum: ['web', 'mob']},
    price: {type: Number, required: function(){ return this.isBoolean} }
})

const Course = mongoose.model('Course', courseSchema)

async function saveCourse() {
    let c1 = new Course({
        name: "umar",
        tage: ['t1', 't2'],
        author: 'dasdasd'
    })

    let result  = await c1.save()
    return result
}


async function getCourse(id) {
    const courses = await Course.find({ name: 'mosh', _id: id })
        .limit(10)
        .sort({ name: 1 })  //1 indicate to ascending order and -1 for disencing or like "-name"
        .select({ name: 1, tags: 1 }) // to select specific properties 
                                      // or you can use .selecte(['name', 'tags']) or .select("name tages")


        //comparison operators
        // eq (equal)
        // ne (not equal)
        // gt (grater than)
        // gte (greate than or equal to)
        // lt (less than)
        // lte (less than or equal)
        // in
        // nin (not in)
        await Course.find({ price: {$gt: 10, $lte: 50}})
        await Course.find({ price: {$in: [10, 15, 20]}})


        //Logical Quary Operators
        // and
        // or
        await Course.find()
                    .or([{ name: "umar" }, { author: "mosh"}])
                    and([{ name: "umar" }, { author: "mosh"}]) 


        //search with pattern
        await Course.find({ author: /^Mosh/ }) //get all courses that start with Mosh
                    .find({ author: /Hamadani$/i}) // get all that ended with Hamadani, and i for case insensitve
                    .find({ author: /.*mosh.*/}) //get contain mosh
        
        await Course.find().count()

        //pagination
        let page_numper = 2
        let rows_num = 10

        await Course.find()
                    .skip((page_numper-1)*rows_num) // it will skip the first rows, to get what chunck you want
                    .limit(page_numper)


        //there are a lot of update operators, that can be used, e.g
        //$set
        //$min
        //$max
        // you can go on the mongo websit and you will get all info
        await Course.update({ _id: id}, { //it will return an object with some stats like 1 doc is abodated ..etc
            $set: {
                name: "hello",
                author: "dasd"
            }
        })

        //it will return an object with some stats like 1 doc is abodated ..etc
        let updated_one = await Course.findByIdAndUpdate(id, {
            $set: {
                name: "hello",
                author: "dasd"
            }
        }, {new: true}) 
        // without new it will return the original doc befor update,
        // but with new it returns the updated one



        // add 15$ on all Cources priceses
        await Course.update({
            $inc: {
                price: 15
            }
        })


}