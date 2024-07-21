const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://achuhari79:sachu@cluster0.pwlfnet.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log("error detected")
})