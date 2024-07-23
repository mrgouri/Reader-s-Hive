import User from '../model/user.model.js';
import bcryptjs from "bcryptjs";

const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  };
  
  export default isAuthenticated;
  


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
        req.session.userId = createdUser._id;
        res.status(201).json({
            message: "User created successfully",
            user: {
                _id: createdUser._id,
                fullname: createdUser.fullname,
                email: createdUser.email,
                address: createdUser.address,
                    bookmark: createdUser.bookmark
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
            req.session.userId = user._id;
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

export const logout = async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: 'Logout failed' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  };

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

  export const details = async (req, res) => {
    try {
      if (!req.session._id) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
  
      const userId = req.session._id;
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json(user); // Return user details
    } catch (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  
  