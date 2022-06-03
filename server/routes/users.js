const router = require('express').Router()
const bcrypt = require('bcrypt')
const client = require('../connection')
const {json} = require('express')
var jwt = require("jsonwebtoken");
// var jwt = require('jsonwebtoken');

//CREATE USER

router.post('/register', async(req, res)=>{
    const user = req.body

    const {username, email, password} = req.body

    // const {username, email, password} = req.body
   


    if(!email && !username && !password){
        res.status(400).json({msg: "All fields are required"})
        return
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const permToken = jwt.sign({ user: user.id, email: user.email }, process.env.TOKEN_KEY, {
      
        // expiresIn: "2h",
      });
      console.log(permToken)

        //NEW USER
      
        // const user = req.body
        let insertQuery = `insert into users(username, email, password, token)
                      values('${username}', '${email}', '${hashedPassword}' , '${permToken}') RETURNING *`

            
        
        client.query(insertQuery, (err, result)=>{
            console.log("we thank GOD")
            console.log(result)
         if(!err){
            //  res.send(result)
             res.status(200).json(result.rows[0])
         }else{
             console.log(err.message)
         }
       
        })
        client.end
        //SAVE USER

        // const permToken = jwt.sign({ user: user.id, email: user.email }, process.env.TOKEN_KEY, {
      
        //     expiresIn: "2h",
        //   });
        //   console.log(permToken)


    })

router.post('/login', async(req,res)=>{
    // try{
    
        console.log(req.body)
        const {email,password} = req.body
        console.log(email, password)

    if(!email && !password){
        res.status(400).json({msg:"All fields are required"})
        return
    }

               
    // const hashedPassword = await bcrypt.hash(password, 10)

    // const user_password = hashedPassword

    const submittedPassword = req.body.password

    

        const query = {
            text: 'SELECT * FROM users WHERE email = $1', // and password = $2',
            values: [email],
            // [email, password]
            // rowMode: 'array',
            
          }
        
        client.query ( query, async (err, result)=>{
              console.log(result)
    
            if(!err){
                if(result.rows.length == 1){

                    const user_password = result.rows[0].password
                    console.log(user_password)
                    const user_email = result.rows[0].email

                    const user = result.rows[0]
                    console.log('user password', submittedPassword)
                    console.log('database password', user_password)
                    const doPasswordMatch = await bcrypt.compare(submittedPassword, user_password)
                       
                    if(doPasswordMatch === true){
                        
                        const permToken = jwt.sign({ user: user.id, email: user_email }, process.env.TOKEN_KEY, {
      
                            expiresIn: "2h",
                          });
                          
                          console.log(permToken)

                    
                        client.query("update users set token='${permToken}' where email='${user_email}' RETURNING * ", (err, result)=>{
                            if(err){
                                res.status(400).json({
                                   status: 0,
                                   message: err.message 
                                })
                                console.log(err)
                                return
                            }
                             
                        } )

                        res.status(200).json(result.rows)
                        return

    
                    }else{
                         res.status(401).json("password is wrong")
                         return
                    }
            
                
    
                    // res.status(200).json(result.rows)
                    // return
                }

                // const permToken = jwt.sign({ user: user.id, email: user.email }, process.env.TOKEN_KEY, {
      
                //     expiresIn: "2h",
                //   });
                //   console.log(permToken)
                
                res.status(401).json({
                    "status":0,
                    "message":"Wrong Email or password entered"
                })
            }else{
                console.log('err', err)
                res.status(401).json({
                    "status":0,
                    "message": err.message
                })
            }
        } )

    // }
})

module.exports = router