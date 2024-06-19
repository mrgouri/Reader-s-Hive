import User from '../model/user.model.js';
import bcryptjs from "bcryptjs";
export const signup = async(req,res) =>{
    try{
        const {fullname,email,password}=req.body;
        const user= await User.findOne({email});
        if(user){
            return res.status(400).json({ message: "User already exists"});
        }
        const hashPassword= await bcryptjs.hash(password,10);
        const createdUser = new User({
            fullname: fullname,
            email: email,
            password: hashPassword,
            address: "",
            bookmark: []
        });
        await createdUser.save();
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                address: user.address,
                    bookmark: user.bookmark
                // Add any other user information you want to include
            }
        });
    } catch(error){
        console.log("Error "+error.message);
        res.status(500).json({ message: "Internal server error"});
    }
}

export const login = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!user || !isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        } else {
            res.status(200).json({
                message: "Login successful",
                user: {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    address: user.address,
                    bookmark: user.bookmark
                },
            });
        }
    } catch (error) {
        console.log("Error: " + error.message);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const addr = async (req, res) => {
    try {
        const address = req.body.address;
        const userId = req.body.userId;
  
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { address: address },
            { new: true }
        );
  
        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error buying book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const bookmark = async (req, res) => {
    try {
        const bookid = req.body.bookId;
        const userId = req.body.userId;
    
        const user = await User.findById(userId);
        if(user)
        user.bookmark.push(bookid); 
        await user.save();
        res.status(200).json(user);
    } catch (error) {
        console.error('Error buying book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }

  export const bookmarkremove = async (req, res) => {
    try {
        const bookid = req.body.bookId;
        const userId = req.body.userId;
    
        const user = await User.findById(userId);
        if(user){
            const index = user.bookmark.indexOf(bookid);
            user.bookmark.splice(index, 1); 
                await user.save();
        }
       
        res.status(200).json(user);
    } catch (error) {
        console.error('Error buying book:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
  }