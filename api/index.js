// all routes for the api
import express from "express";
const Task = mongoose.model('Task');
//const Feed = mongoose.model('Feed');


const router = express.Router();


router.put("/updateUserTask", (req, res)=>{
	let RSSurl = req.body.RSSurl

	User.findOneAndUpdate({username:req.user.username}, { "$pull": {"favoriteFeeds":{ "RSSurl" : RSSurl }} }, { "new": true }, 
		(error, docs) => {
			if (error) res.redirect(`/user?message=${encodeURI("Feed cannot be removed")}`)
			else res.redirect(`/user?message=${encodeURI("Feed successfully removed")}`)	
	});
	
})

router.post("/removeTask", eLogIn.ensureLoggedIn("/login"), function(req, res){
	
	let link = req.body.link

	User.findOneAndUpdate({username:req.user.username}, { "$pull": {"savedStories":{ "link" : link }} }, { "new": true }, 
		(error, docs) => {
			if (error) res.redirect(`/user?message=${encodeURI("Story cannot be removed")}`)
			else res.redirect(`/user?message=${encodeURI("Story successfully removed")}`)	
	});
});

router.get('/getTasks', eLogIn.ensureLoggedIn("/login"), function(req, res){

 
		let feeds = req.user.favoriteFeeds.map((feed)=>{
			return feed.RSSurl
		});
		feeds = JSON.parse(JSON.stringify(feeds))
		let stories = [];
		
		(async () => {
			for(let i = 0; i < feeds.length;i++){
				let feed = await parser.parseURL(feeds[i]);
				
				stories.push(feed.items.map(item => {
					return {
						feedName: feed.title,
						storyName: item.title,
						storyUrl: item.link,
						storyDescription: (item.content.split("<div")[0].split("<table")[0]),
						datePublished: (item.pubDate || item.isoDate)
					}
				}));
			}
			
			stories = stories.reduce((x,y) => x.concat(y), [])
			
			if (req.query.searchterms){
				let patterns = req.query.searchterms.split(" ");
				let fields = { feedName: true, storyName: true, storyName: true, storyDescription:true };
				stories = smartSearch(stories, patterns, fields);
				stories = stories.map((value)=>{
					return value.entry;
				})
			}else{
				stories.sort(function(a, b) {
					a = new Date(a.datePublished);
					b = new Date(b.datePublished);
					return a>b ? -1 : a<b ? 1 : 0;
				});
			}
			
			res.send(JSON.stringify(stories))
		})();
	
	   


})

router.post("/postTask", eLogIn.ensureLoggedIn("/login"), function(req, res){
	
	if(req.user.favoriteFeeds.some((feed)=>{
		req.body.storyUrl == feed.link;
	})){
		res.send("Already Saved");
	}
	console.log(req.body.storyDescription);
	let story = new Story({
		feed : req.body.feedName,
		title : req.body.storyName,
		link : req.body.storyUrl,
		description : sanitize(req.body.storyDescription) ,
		datePublished : req.body.datePublished
	})

	User.findOneAndUpdate({username:req.user.username}, { "$push": { savedStories: story } }, { "new": true }, 
		(error, docs) => {
			if (error) res.send("Couldn't be Saved")
			else{
				res.send("Saved");
			} 
	});

});



export default router;
