function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}
$(function() {
	$("form").on("submit", function(e){
		e.preventDefault();
		//prepare the request
		var request = gapi.client.youtube.search.list({			
			part: "snippet",
			type: "video",
			q: ($("#search").val()).replace(/%20/g,"+"),
			maxResults: 5,
			order: "viewCount",
			publishedAfter: "2015-01-01T00:00:00Z",		
			//channelId: ($("#channel").val()).split("/channel/")[1].toString()
		});
		//console.log(encodeURIComponent($("#search").val()));
		//execute the request
		request.execute(function(response){
			var results = response.result;
			$('#results').html("");
			$.each(results.items, function(index, item) {
				$.get("item.html", function(data){
					$('#results').append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId, "iframeid":item.id.videoId}]));					
				})
				//$("#results").append(item.id.videoId+" "+item.snippet.title+"<br>")
			});
		});
	//$(window).on("resize", resetVideoHeight);
	});
});
function resetVideoHeight() {
	$(".video").css("height", $("#results").width() * 9/16);
}
function init(){
	gapi.client.setApiKey("AIzaSyBwBZ99blUI6sZC6Fm_4UNeVfcp9IEmIoI");
	gapi.client.load("youtube", "v3", function() {
	});
}
