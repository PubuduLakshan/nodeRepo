const express = require ('express');
const Joi = require ('joi');
const app = express();
app.use(express.json());

const courses = [
    {id:1,title:'Maths'},
    {id:2,title:'Science'},
    {id:3,title:'English'},
    {id:4,title:'Sinhala'},
];

function validateBody(course){
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(course,schema);
}

app.put('/api/course/:id',(req,res)=>{
    const course = courses.find(c=>{c.id===parseInt(req.params.id)});
    if(!course){res.status(404).send('Page Not Found')}
    const {error} = validateBody(req.body);
    if(error){res.status(400).send(error.details[0].message); return;}

    course.name = req.body.name;
    res.send(course);

})

app.post('/api/courses',(req,res)=>{
    /*if(!req.body.name || req.body.name.length<3){
        res.status(400).send("name doesn't exist or too short");
        return;
    }*/
    /*const schema = {
        name: Joi.string().min(3).required()
    }

    const result = Joi.validate(req.body,schema);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;     
    }*/
    const {error} = validateBody(req.body);
    if(error){res.status(400).send(error.details[0].message); return;}

    const course = {
        id : courses.length + 1,
        name : req.body.name
    } ;
    courses.push(course);
    res.send(course);

})

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.get('/api/course/:id',(req,res)=>{
    const course = courses.find(c=>c.id === parseInt(req.params.id));

    if(!course) res.status(404).send('Course not found');
    res.send(course);
    
})


app.listen(process.env.PORT || 3001,()=>{
    console.log(`listning to port ${process.env.PORT || 3001 }`);
})