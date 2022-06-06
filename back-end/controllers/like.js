const Sauce = require('../models/Sauce');

exports.likeSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
    .then(sauce => {
        if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
            Sauce.updateOne({ _id: req.params.id }, {
                $inc : {likes: 1},
                $push: {usersLiked: req.body.userId}  
            })
            .then(() => res.status(201).json({message: 'Likes +1'}))
            .catch(error => res.status(400).json({error}))
        
        } else if (sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({ _id: req.params.id }, {
                $inc : {likes: -1},
                $pull: {usersLiked: req.body.userId}  
            })
            .then(() => res.status(201).json({message: 'Like annulé'}))
            .catch(error => res.status(400).json({error}))
        } 
        
        if (!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
            Sauce.updateOne({ _id: req.params.id }, {
                $inc : {dislikes: 1},
                $push: {usersDisliked: req.body.userId}  
            })
            .then(() => res.status(201).json({message: ' Dislikes +1'}))
            .catch(error => res.status(400).json({error}))

        } else if (sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
            Sauce.updateOne({ _id: req.params.id }, {
                $inc : {dislikes: -1},
                $pull: {usersDisliked: req.body.userId}  
            })
            .then(() => res.status(201).json({message: ' Dislikes annulé'}))
            .catch(error => res.status(400).json({error}))
        }
    })
    .catch(error => res.status(404).json({error}));
};