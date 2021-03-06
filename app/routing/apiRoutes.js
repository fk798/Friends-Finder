var friend = require('../data/friends.js')

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(friend)
    })
    app.post("/api/friends", function(req, res) {
        var newFriendScores = req.body.scores;
    var scoresArray = [];
    var bestMatch = 0;

    //runs through all current friends in list
    for(var i=0; i<friend.length; i++){
      var scoresDiff = 0;
      //run through scores to compare friends
      for(var j=0; j<newFriendScores.length; j++){
        scoresDiff += (Math.abs(parseInt(friend[i].scores[j]) - parseInt(newFriendScores[j])));
      }

      //push results into scoresArray
      scoresArray.push(scoresDiff);
    }

    //after all friends are compared, find best match
    for(var i=0; i<scoresArray.length; i++){
      if(scoresArray[i] <= scoresArray[bestMatch]){
        bestMatch = i;
      }
    }

    //return bestMatch data
    var bff = friend[bestMatch];
    res.json(bff);

    //pushes new submission into the friend array
    friend.push(req.body);
  })
}