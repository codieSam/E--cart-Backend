


import { NextFunction, Request, Response } from "express";
import User from "../../../database/models/user.model";
import bcrypt from "bcrypt";
import generateJwtToken from "../../../services/generateJwtToken";

const registerUser = async (req: Request, res: Response, next: NextFunction) => {
  console.log("Register route called");

  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "Username, email, and password are required",
    });
  }

const userData = await User.findAll({
    where: {
        email,
    }

   
})

if(userData.length > 0){
    res.status(400).json({
        message: "Email already exits"
    })
    
} 
else{


  try {
    const hashedPassword = bcrypt.hashSync(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
  }
};


// now login logic


const loginUser = async(req:Request, res:Response, next: NextFunction)=>{
    const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({
            message: "Enter your credeentials"
        })
    }

// id user send the data verify it
  
    const data = await User.findAll({
        where : {
            email
        }
    })

    if(data.length == 0){
        res.status(400).json({
            message: "Invalid email address"
        })
        
    }else{
        // if email found now check for the password

        const isPasswordMatch = bcrypt.compareSync(password, data[0].password)
        if(isPasswordMatch){
           const token = generateJwtToken({id: data[0].id as string})
           console.log("The token is ", token)
         
           res.status(200).json({
            message: "Logged in successfull !",
            data: token
           })
        } else{
            res.status(400).json({
                message: "Invalid email or password"
            })
        }
    }

}



export { registerUser, loginUser };