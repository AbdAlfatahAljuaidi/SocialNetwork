const { Opinion, OpinionValidation } = require("../models/Opinion");
const { SignUp, SignUpValidation } = require("../models/SignUp");
const { Profile, ProfileValidation } = require("../models/Profile.js");
const { Interaction, InteractionValidation } = require("../models/Profile.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");
const Post = require("../models/Posts");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const sendEmail = require("../utils/sendEmail");
const sendPass = require("../utils/sendPass");

const { Suggest, SuggestValidation } = require("../models/Suggestion");





/**
 * @description Show Users
 * @route Index/Users
 * @Method Get
 * @Access Public
 */

const getUser = async (req, res) => {
  try {
    const users = await SignUp.find();

    res.status(200).json({ error: "false", users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Interval Server Error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params; // استخراج الـ ID من الـ params في الرابط

    // حذف المستخدم بناءً على الـ ID
    const deletedUser = await SignUp.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // إرسال استجابة بنجاح الحذف
    res
      .status(200)
      .json({
        success: true,
        message: "User deleted successfully",
        deletedUser,
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

/**
 * @description User opinion
 * @route User/Home
 * @Method POST
 * @Access Public
 */

const UserOpinion = async (req, res) => {
  try {
    const { error } = OpinionValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { Name, Email, Phone, Age, Comment } = req.body;

    const NewOpinion = await Opinion.create({
      Name,
      Email,
      Phone,
      Age,
      Comment,
    });
    console.log(NewOpinion);

    res
      .status(200)
      .json({ error: false, message: "User data uploaded", NewOpinion });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        error: true,
        message: "There are something wrong the server can not upload the data",
      });
  }
};

/**
 *
 * @description User opinions
 * @route User/Home
 * @Method Get
 * @Access Public
 */
const ShowOpinions = async (req, res) => {
  try {
    const Opinions = await Opinion.find();
    console.log(Opinions);

    res
      .status(200)
      .json({ error: false, message: "Display All Opinion", Opinions });
  } catch (error) {
    console.log(error.response);
    return res
      .status(500)
      .json({ error: true, message: "Something went wrong" });
  }
};

/**
 * @description SignUp
 * @route User/SignUp
 * @Method Post
 * @Access Public
 */

const SignUpUser = async (req, res) => {
  try {
    console.log("start");

    const { error } = SignUpValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { Name, Email, Password ,profileImage} = req.body;
    console.log(Name);
    console.log(Email);
    console.log(Password);

    const IfExist = await SignUp.findOne({ Email });

    if (IfExist) {
      return res
        .status(401)
        .json({ error: true, message: "User Already Exist" });
    }

    const IfExistName = await SignUp.findOne({ Name });

    if (IfExistName) {
      return res
        .status(401)
        .json({ error: true, message: "Name Already Exist" });
    }


    console.log(IfExist);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);

    console.log(hashedPassword);

    const newUser = await SignUp.create({
      Name,
      Email,
      Password: hashedPassword,
      profileImage
    });

    console.log("after create");
    const token = jwt.sign({ id: newUser._id }, "dsadsadh");




await sendEmail(
  Email,
  SignUp.Name,
  token,
  "Active Acoount",
  "activeAccount",


)











    res
      .status(200)
      .json({
        error: false,
        message: "new user created now you should go to your email to activate it",
        user: { ...newUser._doc, token },
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};

/**
 * @description Login
 * @route User/Home
 * @Method Post
 * @Access Public
 */

const Login = async (req, res) => {
  const { Email, Password } = req.body;

  const user = await SignUp.findOne({ Email });

  if (!user) {
    return res
      .status(404)
      .json({ error: true, message: "Email doesnot exist " });
  }

  console.log(user);
  console.log(user._doc);


if(user.active==0){
  return res.status(403).json({message:"you did not active your account"})
}



  const PasswordMatch = await bcrypt.compare(Password, user.Password);
  if (!PasswordMatch) {
    return res.status(401).json({ error: true, message: "password not match" });
  }

  const token = jwt.sign({ id: user._id }, "dsadsadh");

  res
    .status(200)
    .json({
      error: false,
      message: "login success",
      user: { ...user._doc, token },
    });
};

/**
 * @description ProfileInfo
 * @route Index/Profile/Update
 * @Method Post
 * @Access Private
 */

const ProfileInfo = async (req, res) => {
  try {
    // التحقق من البيانات النصية
    const { userID, Age, Address, Phone, Gender,major ,username, year } = req.body;
    if (!userID || !Age || !Address || !Phone || !Gender || !major || !username || !year) {
      return res
        .status(400)
        .json({ error: true, message: "All Fields Required" });
    }

    if (isNaN(Phone)) {
      return res.status(400).json({
        error: true,
        message: "Phone must be a number",
      });
    }

    if (isNaN(year)) {
      return res.status(400).json({
        error: true,
        message: "First year must be a number",
      });
    }
    

    // التحقق من وجود الملف
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded    " });
    }


    // رفع الصورة إلى Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
console.log("done");

    // حفظ البيانات في قاعدة البيانات
    const newInfo = await Profile.create({
      userID,
      Age,
      Address,
      Phone,
      Gender,
      imageUrl: result.secure_url,
      major,
      username,
      year,
    });



    const updatedUser = await SignUp.findOneAndUpdate(
      { _id: userID }, // البحث عن المستخدم عن طريق `userID`
      { profileImage: result.secure_url }, // تحديث الصورة في `SignUp`
      { new: true } // إرجاع البيانات بعد التحديث
    );

    const user = await SignUp.findById(userID)

    if (!updatedUser) {
      return res.status(404).json({ error: true, message: "User Not Found" });
    }

    res.status(200).json({ error: false, message: "تم تحميل البيانات بنجاح", user , profileImage:result.secure_url });
  } catch (err) {
    console.error("Error occurred:", err.message);
    return res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

const setProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const data = jwt.verify(token, "dsadsadh");

    console.log(data);

    const getProfile = await Profile.find({ userID: data.id });
    console.log(Profile);

    res.status(200).json({ error: false, getProfile });
  } catch (err) {
    console.log(err);
  }
};

const getinfo = async (req, res) => {
  try {
    console.log("test");

    const data = req.headers.authorization.split(" ")[1];
    console.log(data);

    const user = jwt.verify(data, "dsadsadh");

    console.log(user);
    console.log("after user");
    if (!user) {
      return res.status(401).json({ message: "user not authenticated" });
    }

    console.log(user.id);
    console.log(req.params.id);

    const personalInfo = await Profile.findOne({
      userID: user.id,
      _id: req.params.id,
    });

    res.status(200).json({ personalInfo });
  } catch (error) {
    res.json({ error: true });
    console.log(error);
  }
};

const editProfile = async (req, res) => {
  try {
    console.log("Received FormData:", req.body);

    // التحقق من صحة البيانات
   

    // استخراج بيانات المستخدم من التوكن
    const data = req.headers.authorization?.split(" ")[1];
    if (!data) {
      return res.status(401).json({ error: "true", message: "Missing token" });
    }

    const user = jwt.verify(data, "dsadsadh");
    if (!user) {
      return res.status(401).json({ error: "true", message: "Invalid token" });
    }

    console.log("Decoded User:", user);

    // البحث عن الملف الشخصي
    const profile = await Profile.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    // التحقق من ملكية الحساب
    if (profile.userID.toString() !== user.id) {
      return res.status(403).json({ message: "You are not authorized" });
    }


    


    let imageUrl = profile.imageUrl; // احتفظ بالصورة القديمة
    let result = null;
    
    // إذا تم رفع ملف، ارفعه إلى Cloudinary
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    }




    // تحديث الملف الشخصي
    const updateProfile = await Profile.findByIdAndUpdate(
      profile._id,
      {
        userID: user.id, // هذا مُعين تلقائيًا من التوكن
        Age: req.body.Age,
        Address: req.body.Address,
        Phone: req.body.Phone,
        Gender: req.body.Gender,
        major: req.body.major,
        imageUrl: imageUrl,
        year:req.body.year,
      },
      { new: true }
    );


    let updatedUser = null;
    if (result) {
      updatedUser = await SignUp.findOneAndUpdate(
        { _id: profile.userID },
        { profileImage: imageUrl },
        { new: true }
      );
    
      const getUser = await SignUp.findById(user.id);
      await Post.updateMany(
        { username: getUser.Name },
        { $set: { ProfileImage: imageUrl } }
      );
    }







    res
      .status(200)
      .json({
        error: "false",
        message: "Update Data Successfully",
        updateProfile,
        updatedUser,
      });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "true", message: "Internal Server Error" });
  }
};

const ResetPassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, confirmPass } = req.body;

    if (!oldPassword || !newPassword || !confirmPass) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }
    console.log("1");

    // استخراج بيانات المستخدم من التوكن
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ error: true, message: "Unauthorized access" });
    }
    console.log("2");
    const decoded = jwt.verify(token, "dsadsadh");
    const user = await SignUp.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    console.log("3");

    // التحقق من أن كلمة المرور القديمة صحيحة
    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ error: true, message: "Wrong old password, please try again" });
    }
    console.log("4");
    // التحقق من تطابق كلمتي المرور الجديدتين
    if (newPassword !== confirmPass) {
      return res
        .status(400)
        .json({ error: true, message: "Passwords do not match" });
    }
    console.log("5");
    // تشفير كلمة المرور الجديدة
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // تحديث كلمة المرور في قاعدة البيانات
    await SignUp.findByIdAndUpdate(user._id, { Password: hashedPassword });
    console.log("6");
    res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: true, message: "Server error, please try again later" });
  }
};

const showUser = async (req, res) => {
  try {
    const userID = req.params.id; // جلب userID من الرابط
    const user = await SignUp.findById(userID);

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json({ error: false, user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: true, message: "Internal Server Error" });
  }
};



const editUser = async (req, res) => {
  try {
    const { id } = req.params; 
  
    const { Name, Email,admin } = req.body;
  
    if(!Name || !Email){
      return res.status(400).json({error:true, message:"All fields are required"})
    }
  
    const updateUser = await SignUp.findByIdAndUpdate(id,
      {
        Name ,
        Email,
        admin
      },
      {new:true}
    )
  
    if (!updateUser){
      return res.status(404).json({error:true, message :"User not found"})
    }
  
    res.status(200).json({error:false, message:"Updated user successfully"})
  }

  catch(error){
    res.status(500).json({error:true, message:"Internal server error"})
  }
 
};



const deleteOpinion = async (req,res) => {
  try{
    const {id} = req.params;

    const deletedOpinion = await Opinion.findByIdAndDelete(id);
  
      if (!deletedOpinion) {
        return res.status(404).json({ message: "Opinion not found" });
      }
  
      // إرسال استجابة بنجاح الحذف
      res
        .status(200)
        .json({
          success: true,
          message: "Opinion deleted successfully",
          deletedOpinion,
        });
  }
 
 
  
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }

} 


const getAllProfile = async (req,res) => {
  try{
    const usersProfile = await Profile.find()
    console.log(usersProfile);
    return res.status(200).json({error:false, message:"Succesfully Get Profile",usersProfile })
    


  }
  catch(error){
    console.log(error);
    return res.status(500).json({error:true , message:"Internal Server Error"})
    
  }
  
}




const Comment =  async (req, res) => {
  try {
      const { id } = req.params;
      const { content, userId ,imageUser} = req.body; 

      console.log(id);
      

      const post = await Post.findById(id);
      if (!post) return res.status(404).json({ message: 'Post not found' });



     const getComment = post.comments.push({ content, user: userId , imageUser:imageUser });

     console.log("comment=", getComment);
     

      

      await post.save();

      const comment = post.comments[getComment-1]

      console.log(comment);
      

      res.status(201).json({error:false, post,comment});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};

const Like = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  try {
    console.log(" Received Like request for Post ID:", id);
    console.log(" User ID:", userId);

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    // البحث عن البوست
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    console.log(" Post found:", post);

    // تأكد من أن `likedUsers` موجودة وهي مصفوفة
    if (!Array.isArray(post.likedUsers)) {
      post.likedUsers = [];
    }

    // التحقق مما إذا كان المستخدم قد ضغط لايك من قبل
    const hasLiked = post.likedUsers.includes(userId);

    if (!hasLiked) {
      // إضافة اللايك
      post.likes += 1;
      post.likedUsers.push(userId);
    } else {
      // إزالة اللايك
      post.likes = Math.max(0, post.likes - 1); // منع القيم السالبة
      post.likedUsers = post.likedUsers.filter((id) => id !== userId);
    }

    // حفظ التعديلات
    await post.save();
    console.log("Post saved successfully!");

    return res.json({ liked: !hasLiked, likes: post.likes });
  } catch (error) {
    console.error(" Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};






const search = async (req, res) => {
  try {
      const { username } = req.params; // استلام اسم المستخدم من الـ Query Params
      if (!username) {
          return res.status(400).json({ message: "يرجى إدخال اسم المستخدم للبحث" });
      }

      // البحث في قاعدة البيانات عن جميع المنشورات الخاصة بالمستخدم
      const posts = await Post.find({ username: username });

      if (posts.length === 0) {
          return res.status(404).json({ message: "لم يتم العثور على منشورات لهذا المستخدم" });
      }

      res.status(200).json(posts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "حدث خطأ أثناء البحث" });
  }
};


const userprofile = async (req,res) => {
const {username} = req.params

const dataUser = await Profile.find({username})

if(dataUser){
  return res.status(404).json({error:true, message:"User Not Found"})
}

return res.status(200).json

}




const getUserInfo = async (req, res) => {
  try {
    const {username} = req.params

    

    if (!username) {
      return res.status(401).json({ message: "User Not Found" });
    }

    const user = await SignUp.findOne({Name :username})


    const personalInfo = await Profile.findOne({
      userID: user._id,
    });
  
    res.status(200).json({ personalInfo });
  } catch (error) {
    res.json({ error: true });
    console.log(error);
  }
};

const follow = async (req, res) => {
  try {
    const { username } = req.params;
    const { Name } = req.body;

    // إيجاد المستخدم الحالي (اللي بدنا نتابعه)
    const user = await SignUp.findOne({ Name: username });
    if (!user) {
      return res.status(404).json({ error: true, message: "User Not Found" });
    }

    // الملف الشخصي تبع الشخص اللي بنضيف له صديق
    const profile = await Profile.findOne({ userID: user._id });
    if (!profile) {
      return res.status(404).json({ error: true, message: "Profile Not Found" });
    }

    // إذا ما كان في أصدقاء، أنشئ مصفوفة فاضية
    if (!profile.friends) {
      profile.friends = [];
    }

    // نشوف إذا الصديق موجود فعلاً من قبل
    const existingFriendIndex = profile.friends.findIndex(friend => friend.name === Name.trim());

    if (existingFriendIndex !== -1) {
      // إذا موجود، نحذفه
      profile.friends.splice(existingFriendIndex, 1);
      await profile.save();
      return res.status(200).json({ error: false, message: "Friend removed successfully" });
    } else {
      // الآن نجيب بيانات الصديق من قاعدة البيانات
      const friendUser = await SignUp.findOne({ Name: Name.trim() });
      if (!friendUser) {
        return res.status(404).json({ error: true, message: "Friend user not found" });
      }

      const profileImage = friendUser.profileImage || "";

      // نضيف الصديق مع الاسم والصورة
      profile.friends.push({ 
        name: Name.trim(),
        image: profileImage
      });

      await profile.save();

      return res.status(200).json({
        error: false,
        message: "Friend added successfully",
        profile
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};




const activeAccount = async (req, res) => {
  try {
    const { token } = req.params;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    // فك تشفير التوكن واستخراج id المستخدم
    const decoded = jwt.verify(token, "dsadsadh");
    const userId = decoded.id;

    // البحث عن المستخدم في قاعدة البيانات
    const user = await SignUp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // تحديث حالة الحساب إلى مفعّل
    user.active = 1;
    await user.save();

    return res.status(200).json({ message: "Account activated successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Invalid or expired token", error });
  }
};




const deletePost = async (req, res) => {
  try {
    const { postid } = req.body;
    const post = await Post.findById(postid); // تصحيح البحث عن المنشور

    if (!post) {
      return res.status(404).json({ message: "Post not found", error: true });
    }

    await Post.findByIdAndDelete(postid); // حذف المنشور

    return res.status(200).json({ message: "Post deleted successfully", error: false });

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error", error: true });
  }
};



const savePost = async (req, res) => {
  try {
   
    const { postId ,userId } = req.body; // البوست المطلوب حفظه

    // تحقق مما إذا كان البوست موجودًا في قاعدة البيانات
    const postExists = await Post.findById(postId);
    if (!postExists) {
      return res.status(404).json({ message: "Post not found" });
    }

    // تحديث المستخدم وإضافة البوست المحفوظ (مع التحقق من التكرار)
    const user = await SignUp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // التحقق إذا كان البوست محفوظًا مسبقًا
    if (user.savedPosts.includes(postId)) {
      return res.status(400).json({ message: "Post is already saved" });
    }

    // إضافة البوست إلى قائمة البوستات المحفوظة
    user.savedPosts.push(postId);
    await user.save();

    return res.status(200).json({ message: "Post saved successfully", savedPosts: user.savedPosts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


const showBookmarks = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = await SignUp.findById(userId);
    if (!user || !user.savedPosts || user.savedPosts.length === 0) {
      return res.status(404).json({ message: "No saved posts found" });
    }

    const savedPosts = await Post.find({ _id: { $in: user.savedPosts } });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      error: false,
      posts: savedPosts,
    });

  } catch (error) {
    console.error("Error fetching bookmarks:", error);
    return res.status(500).json({ message: "Server error", error: true });
  }
};




const removeBookmark = async (req, res) => {
  try {
    const { userId, postId } = req.body;

    if (!userId || !postId) {
      return res.status(400).json({ message: "User ID and Post ID are required." });
    }

    const user = await SignUp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    user.savedPosts = user.savedPosts.filter(id => id.toString() !== postId);

    await user.save();

    return res.status(200).json({ message: "Bookmark removed successfully.", error: false });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error.", error: true });
  }
};


const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required." });
    }

    // استرجاع المستخدم بناءً على الـ userId
    const user = await SignUp.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const posts = await Post.find({username:user.Name}) 

    // إرسال البوستات للمستخدم
    return res.status(200).json({ posts: posts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error." });
  }
};




const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // نحذف التعليق من الأراي باستخدام filter
    post.comments = post.comments.filter(
      (comment) => comment._id.toString() !== commentId
    );

    await post.save();

    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// controllers/suggestionController.js

const submitSuggestion = async (req, res) => {
  try {
    const { error } = SuggestValidation(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { type, details ,name,email,state } = req.body;

    const newSuggestion = new Suggest({ type, details ,name,email,state});
    await newSuggestion.save();

    res.status(201).json({ message: "Suggestion submitted successfully.", error:false });
  } catch (err) {
    console.error("Error submitting suggestion:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getSuggestions = async (req, res) => {
  try {
    const suggestions = await Suggest.find().sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};




const getSuggestionsForUser = async (req, res) => {
  try {
    const {name} = req.body
    const suggestions = await Suggest.find({name}).sort({ createdAt: -1 });
    res.json(suggestions);
  } catch (err) {
    console.error("Error fetching suggestions:", err);
    res.status(500).json({ message: "Internal server error." });
  }
};







const deleteSuggestion = async (req, res) => {
  const { id } = req.params;

  try {
    // محاولة حذف الاقتراح باستخدام الـ ID
    const deletedSuggestion = await Suggest.findByIdAndDelete(id);

    if (!deletedSuggestion) {
      return res.status(404).json({ success: false, message: "Suggestion not found" });
    }

    // إرجاع رسالة نجاح بعد الحذف
    res.status(200).json({ success: true, message: "Suggestion deleted successfully" });
  } catch (error) {
    console.error("Error deleting suggestion:", error);
    res.status(500).json({ success: false, message: "Error deleting suggestion" });
  }
};


const showFriends = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await Profile.findOne({userID:userId});
    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    if (!user.friends || user.friends.length === 0) {
      return res.status(404).json({ error: true, message: "Friends not found" });
    }

    return res.status(200).json({ 
      error: false, 
      message: "Friends retrieved successfully", 
      friends: user.friends 
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};
const show_active = async (req, res) => {
  try {
    const { userID } = req.body;

    // تحقق من وجود userID
    if (!userID) {
      return res.status(400).json({ error: true, message: "userID is required" });
    }

    const profile = await Profile.findOne({ userID });

    // تحقق من وجود البروفايل
    if (!profile) {
      return res.status(404).json({ error: true, message: "Profile not found" });
    }

    // إرسال البيانات إذا تم العثور على البروفايل
    return res.status(200).json({
      error: false,
      message: "Profile fetched successfully",
      profile
    });

  } catch (error) {
    console.error("Error in show_active:", error.message);
    return res.status(500).json({ error: true, message: "Server error" });
  }
};


const deleteProfile = async (req, res) => {
  try {
    const { profileId } = req.body;

    if (!profileId) {
      return res.status(400).json({ message: 'postId is required' });
    }

    const deletedProfile = await Profile.findByIdAndDelete(profileId);

    if (!deletedProfile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json({ message: 'Profile deleted successfully', data: deletedProfile });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



const deleteAccount = async (req,res) => {
  try {
    const {userId} = req.body

  const user = await SignUp.findById(userId)

  if(!user){
    return res.status(404).json({error:true,message:"User not found"})
  }

  const deleteUser = await SignUp.findByIdAndDelete(userId)

  return res.status(200).json({error:false , message:"User has been deleted successfully"})
    
  } catch (error) {
    console.log(error);
    
    
  }
} 


const forgetPassword = async (req,res) =>{
 try{
  const {email} = req.body

  const user = await SignUp.findOne({Email:email}) 

  if(!user){
    return res.status(404).json({error:true, message:"User Not found"})
  }


  const randomNumber = Math.floor(1000 + Math.random() * 9000); // رقم عشوائي من 4 خانات
  const newPassword = `${user.Name}@${randomNumber}`;
  
  // تعيين كلمة المرور الجديدة للمستخدم (إذا كنت تستخدم bcrypt أو أي تشفير لازم تشفره هنا)
  user.Password = newPassword;
  
  // حفظ التغيير في قاعدة البيانات
  await user.save();


  
  await sendPass(
    email,
    user.Name,
    newPassword,
    "Reset Your Password",
    "resetPassword" // اسم القالب داخل views
  );
  return res.status(200).json({error:false , message:"Your password has been successfully changed. Please check your email"})
 }



 catch(error){
  console.log(error);
  return res.status(500).json({error:true, message:"Internal Server Error"})
 }


  

}







module.exports = {
  UserOpinion,
  ShowOpinions,
  SignUpUser,
  Login,
  ProfileInfo,
  setProfile,
  getinfo,
  editProfile,
  getUser,
  deleteUser,
  ResetPassword,
  showUser,
  editUser,
  deleteOpinion,
  Comment,
  Like,
  getAllProfile,
  search,
  userprofile,
  getUserInfo,
  follow,
  activeAccount,
  deletePost,
  savePost,
  showBookmarks,
  removeBookmark,
  getUserPosts,
  deleteComment,
  submitSuggestion,
  getSuggestions,
  getSuggestionsForUser,
  deleteSuggestion,
  showFriends,
  show_active,
  deleteProfile,
  deleteAccount,
  forgetPassword
};
