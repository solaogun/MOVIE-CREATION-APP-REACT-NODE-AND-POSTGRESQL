const router = require("express").Router();
var jwt = require("jsonwebtoken");
const client = require("../connection");

router.post("/", async(req, res)=>{
    const {name, message} = req.body


    if(!name && !message){
        res.status(400).json("All fields are required")
        return
    }

    const token = req.headers['x-api-key']
    console.log("God is good", req.body)
    console.log("token", token)

    jwt.verify(token, process.env.Token_key, function(err, decoded){
        console.log("decoded", decoded)
        console.log("error: ", err)

        if(!err){
            console.log(decoded.email, 'error')
            const email = decoded.email
            client.query(`Select * from users where email='${email}'`,
                (err, result)=>{
                    console.log(result, 'REACT')
                    if(result?.rows.length == 1){
                        
                        console.log(result, 'SLEEPING BABY')
                        let insertQuery = `insert into comments(name, message)
                                    values('${name}', '${message}') RETURNING *`
                        
                        client.query(insertQuery,(err, result)=>{
                            if (!err){
                                res.status(200).json({
                                    status: 1,
                                    message: "Comment successfully saved"
                                }) 
                            }else{
                                res.status(500).json({
                                    status:0,
                                    message: "Unable to add comments pls try again later"
                                })
                            }
                        } )
                        // client.end
                    }else{
                        res.status(401).json({
                            status:0,
                            message: "User unauthorised"})
                    }
                }   
            )
            client.end
        }else{
            res.status(401).json({
                status:0,
                message: "User unauthorised"})
        }
    }) 
})
module.exports = router