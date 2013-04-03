(function(){

	var dict = [] ;
	
	var unfollowers_count=0 ;
	
	var unfollowers_list = [] ;

	$(document).ready(function(){
	
		var more_id = getMoreButtonId();
		
		console.log("more_id "+more_id);
		
		console.log(document.getElementById(more_id).innerHTML);
		
		loadFullFollowersList(more_id);
		
		createLink();
		
		$("#"+more_id).click(function(){
			console.log("more_id button gets clicked");
		});
		
		var a = document.getElementById("unfollowbutton");
		
		a.onclick = function (){
		
			console.log("list has been shown");
			
			seeUnfollowList();
		
			return false;
			
		}
	
	});
	
	function seeUnfollowList()
	{
		console.log("seeUnfollowList called");
		$('div.e_col.w4_5').empty();
		$('div.e_col.w4_5').append("<div id='unfollowerslist'><div class='row p1'><h3>"+unfollowers_count+" Unfollowers</h3><div tabindex='-1' id='pagedlistunfollowerslist'></div></div></div>");
		
		display();
	}
	
	function display()
	{
		$('#pagedlistunfollowerslist').empty();
		
		if(unfollowers_count == 0)
		{
			console.log('if loop of display called');
		}
		
		else
		{
			console.log("else loop of display called");
			for(var i=0 ;i<unfollowers_count ; i++)
			{
				console.log("In Display "+unfollowers_list[i].key+" "+unfollowers_list[i].value);
				$('#pagedlistunfollowerslist').append("<div class='col w4_5 item p1'><div class='col w3'><h2 class='name' style='margin-bottom:3px;'><div class='hover_menu hidden hover_menu_wide' style='display: none'><div class='hover_menu_nub'></div><div class='hover_menu_contents' > </div></div><a class='user' href='"+unfollowers_list[i].key+"' routing='q://user/(7133188)' rel='contact'>"+unfollowers_list[i].value+"</a></h2><div class='meta'><span id='ld_ZoFOf6_39780'><span></span></span></div></div><div class='side_col col w0_5 usercard_row' style='border:0;'><span><span></span><keyevent></keyevent></span></div></div>");
			}
		}
		
	}
	
	function makeLinkVisible()
	{
		console.log("makeLinkVisible");
		document.getElementById("unfollowbutton").style.display = "";
	}
	
	function loadFullFollowersList(more_id)
	{
		var myMoreButton = setInterval(function(){
			
				document.getElementById(more_id).click()
				console.log("set interval called");

				if(document.getElementById(more_id).style.display === "none")
				{
					clearInterval(myMoreButton);
					getFollowersList();
					makeLinkVisible();
					
				}
			
		},10);
		
	}
	
	function createLink()
	{
		$('ul.simple_profile_tabs').prepend("<div id='ld_poiuyt_1111'><li class='tab #'><a class='link_label' href='javascript:void(0);' id='unfollowbutton' style='display : none ;'>UnFollowers&nbsp;<span class='light normal profile-tab-count' id='unfollowcount'>0</span></a></li></div>")
	}
	
	function getFollowersList()
	{
		console.log("callback function successfully called");
	
		$('div.pagedlist_item').each(function (){
			
			var profile_href = $(this).find('a').attr('href');
			
			var profile_name = $(this).find('img').attr('alt');
			
			dict.push({
				
				key : profile_href ,
				value : profile_name
				
			});
			
		});
		
		chrome.extension.sendRequest({data : dict},function(response){
		
			console.log(response.msg);
			
			var list = response.data ;
			
			var list_length = response.length ;
			
			if(list_length != 0)
			{
				for(var i=0 ;i<list_length ; i++)
				{
					unfollowers_list.push({
						
						key : list[i].key,
						value : list[i].value
						
					});
				}
				
				unfollowers_count = list_length ;
				
				$("#unfollowcount").text(unfollowers_count);
			}
		
		});
		
	}
	
	
	function getMoreButtonId()
	{
		var response = $("html").html();
		
		var index = response.search('more_button');
		
		var id=response.substring(index+15,index+22);
		
		var more_button_id = "__w2_"+id+"_more";
		
		return more_button_id ;
	}

})();