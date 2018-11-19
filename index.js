const express = require ('express');
const app = express();

const courses = [
    {id:1,title:'Maths'},
    {id:2,title:'Science'},
    {id:3,title:'English'},
    {id:4,title:'Sinhala'},
];
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