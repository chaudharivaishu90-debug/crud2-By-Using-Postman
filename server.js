var cl=console.log;
const app= require("./app");
const PORT=3000;




app.listen(PORT,()=>{
    cl(`server is running on port ${PORT}`)
});