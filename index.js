const express=require('express');
const bodyParser=require('body-parser');
const path=require('path');
const request=require('request');

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

 app.get("/",(req,res)=> {
      res.sendFile(path.join(__dirname,'/public','/signUp.html'));
});

app.post('/',(req,res)=>{
    var email=req.body.email;
    var fname=req.body.n1;
    var lname=req.body.n2;

    var data= {
        members:[
            {
              email_address:email,
              status:"subscribed",
              merge_fields:{
                FNAME:fname,
                LNAME:lname
            }
            }
        ]
    };



    var jsonData=JSON.stringify(data);

    var options={
        url:"https://us14.api.mailchimp.com/3.0/lists/173817df89",
        method:"POST",
        headers:{
            "Authorization":"auth bcabdac61d1f925f1a84ec982db3bfc7-us14"
        },
        body:jsonData
    };
    request(options,(error,response,data)=>{
          if(error) 
          res.send("There was an error");
          if(response.statusCode==200){
                res.sendFile(path.join(__dirname,'/public','/success.html'));
          }
          else{
            res.sendFile(path.join(__dirname,'/public','/failure.html')); 
          } 
    });
});
app.post('/failure',(req,res)=>{ 
    res.redirect('/'); 
});

//list id =   173817df89
//'https://us3.api.mailchimp.com/3.0/lists/c88fb2ef24' 

app.listen(process.env.PORT || 3000,()=> {  
    console.log('Server started runing at 3000');   
});   
