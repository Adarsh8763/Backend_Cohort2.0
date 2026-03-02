const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")

async function followUserController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    if (followeeUsername === followerUsername) {
        return res.status(400).json({
            msg: "U can't follow urself"
        })
    }

    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if (!isFolloweeExists) {
        return res.status(404).json({
            msg: "Followee doesn't exist"
        })
    }

    let isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if(isAlreadyFollowing){
        if (isAlreadyFollowing.status == "pending") {
            return res.status(200).json({
                msg: `The follow request already sent to ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }
        if (isAlreadyFollowing.status == "accepted") {
            return res.status(200).json({
                msg: `The follow request already accepted by ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }
        if (isAlreadyFollowing.status == "rejected") {
            isAlreadyFollowing.status = "pending"
            await isAlreadyFollowing.save()
            return res.status(200).json({
                msg: `The follow request was rejected but sent again to ${followeeUsername}`,
                follow: isAlreadyFollowing
            })
        }

    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        msg: `U have send the following request to ${followeeUsername}`,
        follow: followRecord
    })

}

async function unfollowController(req, res) {
    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    })

    if (!isUserFollowing) {
        return res.status(400).json({
            msg: `U are not following ${followeeUsername}`
        })
    }
    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        msg: `U have unfollowed ${followeeUsername}`
    })
}

async function acceptController(req, res) {
    const followeeUsername = req.user.username
    const followRequestId = req.params.requestId

    const isFollowRequestExists = await followModel.findById(followRequestId)

    if (!isFollowRequestExists) {
        return res.status(404).json({
            msg: "Follow request hasn't come yet"
        })
    }

    if (isFollowRequestExists.followee !== followeeUsername) {
        return res.status(403).json({
            msg: "U are not the valid followee to accept the request(Forbidden request)"
        })
    }
    if (isFollowRequestExists.status === "accepted") {
        return res.status(200).json({
            msg: "Already accepted the follow request"
        })
    }

    if(isFollowRequestExists.status === "rejected"){
        return res.status(400).json({
            msg: "Can't accept as request already rejected"
        })
    }

    const followRequest = await followModel.findByIdAndUpdate(
        followRequestId,
        { status: "accepted" },
        { new: true }
    )

    res.status(200).json({
        msg: "Accepted the request",
        followRequest
    })


}

async function rejectController(req,res){
    const followeeUsername = req.user.username
    const followrequestId = req.params.requestId

    let isFollowRequestExists = await followModel.findById(followrequestId)

    if(!isFollowRequestExists){
        return res.status(404).json({
            msg: "Follow request not found"
        })
    }

    if (isFollowRequestExists.followee !== followeeUsername){
        return res.status(403).json({
            msg: "Forbidden request"
        })
    }
    if(isFollowRequestExists.status === "rejected"){
        return res.status(200).json({
            msg: "Already rejected the request",
            follow: isFollowRequestExists
        })
    }
    if(isFollowRequestExists.status === "accepted"){
        return res.status(400).json({
            msg: "Can't reject as request already accepted"
        })
    }
    isFollowRequestExists.status = "rejected"
    isFollowRequestExists.save() 

    res.status(200).json({
        msg: "The request was rejected successfully",
        follow: isFollowRequestExists
    })
}

module.exports = {
    followUserController,
    unfollowController,
    acceptController,
    rejectController
}