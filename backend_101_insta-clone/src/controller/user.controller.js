const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername === followerUsername){
        return res.status(400).json({
            msg: "U can't follow urself"
        })
    }
    
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists){
        return res.status(404).json({
            msg: "Followee doesn't exist"
        })
    }

    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername, 
        followee: followeeUsername
    })

    if(isAlreadyFollowing){
        return res.status(200).json({
            msg: `U are already following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        msg: `U started following ${followeeUsername}`,
        follow: followRecord
    })

}

async function unfollowController(req,res){
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(!isUserFollowing){
        return res.status(400).json({
            msg: `U are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        msg: `U have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unfollowController
}