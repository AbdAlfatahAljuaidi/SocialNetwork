const express = require('express');
const routerUser =require("express").Router()
const {UserOpinion,ShowOpinions ,SignUpUser, Login ,ProfileInfo,setProfile,getinfo,editProfile,getUser,deleteUser,ResetPassword,showUser,editUser,deleteOpinion,Comment,Like,getAllProfile,search,getUserInfo,follow,activeAccount,deletePost,savePost,showBookmarks,removeBookmark,getUserPosts,deleteComment,submitSuggestion,getSuggestions,getSuggestionsForUser,deleteSuggestion,showFriends,show_active,deleteProfile,deleteAccount,forgetPassword,viewSuggest,updateSuggest,getTopLikedPost,getTopCommentedPost,getPost,updatePost,topUserFriends,messages,getNotifications,readNoti,createReport,getReports,deleteReport,selectCorrectAnswer,getPrivateMessage} = require("../controllers/userController")
const multer = require('multer');



const upload = multer({ dest: 'uploads/' });

routerUser.post("/User/Home",UserOpinion)
routerUser.get("/User/Show",ShowOpinions)
routerUser.post("/User/SignUp",SignUpUser)
routerUser.post("/User/Login",Login)
routerUser.post("/User/Profile", upload.single('file'), ProfileInfo)
routerUser.get("/User/GetProfile",setProfile)
routerUser.get("/GetDataProfile/:id",getinfo)
routerUser.put("/SetDataProfile/:id", upload.single("file"), editProfile)
routerUser.get("/Index/Users",getUser)
routerUser.delete("/Index/Users/Delete/:id",deleteUser)
routerUser.put("/Index/Users/Reset/:id",ResetPassword)
routerUser.get("/showUser/:id",showUser)
routerUser.put("/editUser/:id",editUser)
routerUser.delete("/deleteOpinion/:id",deleteOpinion)
routerUser.post("/comment/:id",Comment)
routerUser.post("/Like/:id",Like)
routerUser.get("/getAllProfile",getAllProfile)
routerUser.post("/search/:username",search)
routerUser.get("/getUserInfo/:username",getUserInfo)
routerUser.post("/follow/:username",follow)
routerUser.put("/activeAccount/:token",activeAccount)
routerUser.post("/deletePost",deletePost)
routerUser.post("/savePost",savePost)
routerUser.post("/showBookmarks",showBookmarks)
routerUser.post("/removeBookmark",removeBookmark)
routerUser.post("/getUserPosts",getUserPosts)
routerUser.post("/deleteComment/:postId/:commentId",deleteComment)
routerUser.post("/submitSuggestion",submitSuggestion)
routerUser.get("/getSuggestions",getSuggestions)
routerUser.post("/getSuggestionsForUser",getSuggestionsForUser)
routerUser.delete("/deleteSuggestion/:id",deleteSuggestion)
routerUser.post("/showFriends",showFriends)
routerUser.post("/show_active",show_active)
routerUser.post("/deleteProfile",deleteProfile)
routerUser.post("/deleteAccount",deleteAccount)
routerUser.post("/forgetPassword",forgetPassword)
routerUser.post("/viewSuggest/:id",viewSuggest)
routerUser.put("/updateSuggest/:id",updateSuggest)
routerUser.get("/getTopLikedPost/",getTopLikedPost)
routerUser.get("/getTopCommentedPost/",getTopCommentedPost)
routerUser.get("/getPost/:id",getPost)
routerUser.put('/updatePost/:id', upload.single('file'), updatePost)
routerUser.post("/topUserFriends",topUserFriends)
routerUser.get("/messages",messages)
routerUser.post("/notifications",getNotifications)
routerUser.put("/readNoti",readNoti)
routerUser.post("/createReport",createReport)
routerUser.get("/getReports",getReports)
routerUser.delete("/deleteReport/:id",deleteReport)
routerUser.put("/selectCorrectAnswer",selectCorrectAnswer)
routerUser.get("/getPrivateMessage/:receiver", getPrivateMessage);



module.exports= routerUser