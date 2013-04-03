(function(){

	var followedBy = [] ;
	var counter = 0 ;
	var unfollowers = [] ;
	
	chrome.extension.onRequest.addListener(function(request,sender,sendResponse){
	
		var list = request.data;
		
		assignListToFollowers(list);
		
		findWhoUnfollowYou(list);
		
		printUnfollowers(sendResponse);
	
	});
	
	function assignListToFollowers(list)
	{
		for(var i = 0 ; i < list.length ; i++)
		{
			counter++;
		
			if(isNotPresent(list[i]))
			{
		
				followedBy.push({
			
					key : list[i].key,
					value : list[i].value
			
				});
			}
			
		}
		
		for(var i=0 ;i< followedBy.length ;i++)
		{
			console.log(followedBy[i].key);
		}
		
		console.log(followedBy.length);
	}
	
	function printUnfollowers(sendResponse)
	{
		if(unfollowers.length == 0)
		{
			console.log("no unfollowers found");
			
			sendResponse({msg : "received list",data : unfollowers,length: unfollowers.length});
		}
		
		else
		{
			for(var i=0 ;i <unfollowers.length ;i++)
			{
				console.log(unfollowers[i].key + " " + unfollowers[i].value);
			}
			
			sendResponse({msg : "received list",data : unfollowers,length: unfollowers.length});
			
			unfollowers.length = 0 ;
		}
	}
	
	function isNotPresent(obj)
	{
		for(var i=0 ;i<followedBy.length ; i++)
		{
			if(followedBy[i].key == obj.key)
			{
				return false;
			}
		}
		
		return true;
	}
	
	function findWhoUnfollowYou(list)
	{
		for(var i=0 ; i<followedBy.length ; i++)
		{
			if(!isPresentInList(followedBy[i],list))
			{
				unfollowers.push({
				
					key : followedBy[i].key,
					value : followedBy[i].value
				
				});
				
				
			}
		}
		
		followedBy.length = 0;
		assignListToFollowers(list);
	}
	
	function isPresentInList(obj,list)
	{
			for(var i=0;i<list.length ;i++)
			{
				if(obj.key == list[i].key)
				{
					return true;
				}
			}
			
			return false ;
	}
	
	function onInstall()
	{
		$.ajax({
			
				url : "http://api.quora.com/api/logged_in_user",
				dataType : 'html',
				success : function(response){
				
					console.log(response);
					
					var urlindex = response.indexOf("com/");
					
					var commaindex = response.indexOf(",");
					
					//console.log(profile_url);
					
					var profile_url = response.substring(urlindex+4,commaindex-1);
					
					console.log(profile_url);
					
					profile_url = "http://quora.com/"+profile_url+"/followers"
					
					chrome.tabs.create({url: profile_url});
				
				}
			
			});
	}
	
	onInstall();

})();