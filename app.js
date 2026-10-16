var cl=console.log;
const PORT=3000;
let express= require(`express`);
let post=[{id:1,name:"vaishali",age:29,city:"pune"},
    {id:2,name:"priya",age:25,city:"mumbai"}
];
const app=express();
app.use(express.json());


// get
app.get(`/api/post`,(req,res)=>{
    try{
        res.status(200).json({
            success:true,
        data:post

        })
        
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        })

    }
})

//craete
app.post(`/api/post`,(req,res)=>{
    try{
        let{name,age,city} = req.body;
        if(!name||!age||!city){
            return res.status(400).json({
                success:false,
                message:"please provide name,age and city"
            })
        }
    let newpost={...req.body,
        id:String(Date.now())
    }
    post.push(newpost);
    res.status(201).json({
        success:true,
        data:post
    })
}catch (err){
        res.status(500).json({
            success:false,
            message:"server error"
        })

    }
})

// update
app.patch(`/api/post/:id`,(req,res)=>{
    try{
        let postId=parseInt(req.params.id)
        let index= post.findIndex(t=>t.id===postId)
        if(index=== -1){
            return res.status(404).json({
                success:false,
                message:`post not found with id ${postId}`
            })
        }
        let uppost={
            ...post[index],
            ...req.body
        };
        post[index]=uppost
        res.status(200).json({
            success:true,
            data:uppost
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            err:err.message

        })

    }
})


// delte
app.delete(`/api/post/:id`,(req,res)=>{
    try{
        let Remove_id=parseInt(req.params.id);
        let index=post.findIndex(t=>t.id===Remove_id)
        if(index=== -1){
            return res.status(404).json({
                success:false,
                message:`post not found with id ${Remove_id}`
            });
        }
        post.splice(index,1)
        res.status(200).json({
            success:true,
                message:`post sucsesfully deleted with id ${Remove_id}`
           
        });

    }catch(err){
        res.status(500).json({
            success:false,
            message:"server error",
            err:err.message

        })


    }
})


app.listen(PORT,()=>{
    cl(`server is running on port ${PORT}`)
});