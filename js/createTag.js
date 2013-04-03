(function(){

	$(document).ready(function (){
	
		getFollowersLink(makeLink);
	
	});
	
	function getFollowersLink(callback)
	{
	
		$.ajax({
		
			url : "http://api.quora.com/api/logged_in_user",
			
			dataType : "html",
			
			success : function(response){
			
				console.log(response);
				
				var profile_url = response.substring(19,55);
				
				profile_url= profile_url+"/followers";
				
				console.log(profile_url);
				
				callback(profile_url);
			
			}
		});
	
	}
	
	function makeLink(follow_link)
	{
		$("#layout_header").append("<div class='contents' style='width : 1025px ;'><ul class='nav_list nav_list_reorg'><li><a href='"+follow_link+"' class='home has_count nav_item has_nav_menu'><strong>Unfollow</strong></a></li></ul></div>");
		console.log("manish");
	}

})();