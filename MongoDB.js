
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser'); 
const db = require('mongoose'); 
const app = express();

db.connect("mongodb://localhost:27017/School").then(()=>{
    console.log("db connected")
})

const student_Schematype = new db.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age:{type : Number,required:true}
});
const teacher_Schematype = new db.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    age:{type : Number,required:true}
});

const student_list = new db.model("StudentCollection",student_Schematype)
const teachers_list = new db.model("TeacherCollection",teacher_Schematype)

app.use(cors()); 
app.use(bodyParser.json());

app.post('/register', async(req, res) => {
    const { name, email, password,age} = req.body;
    
    console.log('User Registered:', { name, email, password,age});
    await student_list.create({
        Fullname    :name,  
        Email       :email,
        Password    :password,
        Age         :age
   })
   await teachers_list.create({
        Name        : name,
        Email       : email,
        Password    : password,
        Age         : age
   })
})

// app.post('/update', async(req, res) => {
//     console.log();
    
//     const{valname,valage}=req.body
//     console.log("update value got...",valname.upname,valage.upage);
//     await contact.updateOne({name:valname.upname},{age:valage.upage},{ new: true, returnDocument: "after" });
//     console.log("age updated successfully");
//     res.send("updated successfully");
// })


// app.post('/showval', async(req, res) => { 
//     const data= await contact.find();
//     console.log(data);
//     res.end();
// })


// app.post('/del', async(req, res) => {
//     const{name}=req.body
//     console.log("update value got...",name);
//     let user=await contact.findOne({name})
//     if(user){
//         let id= user._id;
//         try 
//         {
//             const result = await contact.findByIdAndDelete(id);
//             console.log("Deleted course: ", result);
//         } 
//         catch(err) 
//         {
//             console.log(err) 
//         }
//     }
//     res.send("updated successfully")
// })

app.listen(8000, () => {
    console.log('Server is running on http://localhost:8000');
});







// const express = require('express');
// const db = require('mongoose');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// const port = 8000;

// db.connect("mongodb://localhost:27017/Shibu").then(()=>{
//     console.log("Database connected");
// });

//     const student_Schematype = new db.Schema({
//         FullName :  {type : String , required : true},
//         Email :     {type : String , required : true},
//         Password :  {type : String , required : true},
//         Age :       {type : Number , required : true}
//     });
//     const teacher_Schematype = new db.Schema({
//         FullName :  {type : String , required : true},
//         Email :     {type : String , required : true},
//         Password :  {type : String , required : true},
//         Age :       {type : Number , required : true}
//     });

// const studentdetails = new db.model("Student_Collection",student_Schematype);
// const teacherdetails = new db.model("Teacher_Collection",teacher_Schematype);

// app.post("/register",async(req,res)=>{
//     const {name,email,pwd,age} = req.body;

//     await studentdetails.create(
//         {
//             FullName : name,
//             Email : email,
//             Password : pwd,
//             Age : age
//         }
//     )    
//     await teacherdetails.create(
//         {
//             FullName : name,
//             Email : email,
//             Password : pwd,
//             Age : age
//         }
//     )
// })

// app.listen(port,()=>{
//     console.log(`Server is listening on port ${port}`)
// });