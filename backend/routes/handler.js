const express = require('express');
const router = express.Router();
const Schemas = require('../models/Schemas.js');

/*An example to manually insert a user from the back-end
router.get('/addUser', async (req, res) => {
    const user = {username: 'eaglefang', fullname: 'Sensi Johny'};
    const newUser = new Schemas.Users(user);

    try {
        await newUser.save( async(err, newUserResult) => {
            console.log('New user created!');
            res.end('New user created!');
        });
    } catch(err) {
        console.log(err);
        res.end('User not added!');   
    }

});
*/

// SQL equivelant below SELECT FROM TABLE JOIN a on b

router.get('/tweets', async (req, res) => {
    const tweets = Schemas.Tweets;

    const userTweets = await tweets.find({}).populate("user").exec((err, tweetData) => {    //Find the tweets and add the user of those tweets
        if (err) throw err;
        if (tweetData) {
            res.end(JSON.stringify(tweetData));
        } else {
            res.end();
        }
    });
});

//Dummy data from the initial tutorial, went in router.get above...   
/*    const str = [{
       "name": "Codr Kai",
       "msg": "This is my first tweet!",
       "username": "codrkai"
    }];
    res.end(JSON.stringify(str));
*/

router.post('/addTweet', async (req, res) => {
    const userTweet = req.body.tweetInput;
    const user = Schemas.Users;
    const userId = await user.findOne({username:'eaglefang'}).exec();

    const newTweet = new Schemas.Tweets({
        tweet: userTweet,
        user: userId._id
    });

    try {
        await newTweet.save( (err, newTweetResults) => {
            if (err) res.end('Error Saving.');
            res.redirect('/tweets');
            res.end();
        });
    } catch(err) {
        console.log(err);
        res.redirect('/tweets');
        res.end();
    }

});

module.exports = router;