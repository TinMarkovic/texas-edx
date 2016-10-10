var button = [];
window.onload = function() {
  // zasad upeceno
  var apiBlocksFromCourseRoute = "/api/courses/v1/blocks/?course_id="
  var apiUsernameSetting = "&username=";
  var apiDepthSetting = "&depth=all";

  var domain = "microsite.tex.extensionengine.com";
  var username = "oncourse";
  var courseId = "course-v1%3ATexasOnCourse%2BTXOC101%2B2016_T2";

  var apiUrl =  "http://" + domain + apiBlocksFromCourseRoute + courseId + apiUsernameSetting + username + apiDepthSetting;
  // example: http://microsite.tex.extensionengine.com/api/courses/v1/blocks/?course_id=course-v1%3ATexasOnCourse%2BTXOC101%2B2016_T2&username=oncourse&depth=all

  $.get(apiUrl, function(data, textStatus){
    console.log("Successful request! ");
    console.log("Request status: ", textStatus);
    console.log("Request returned: ", data);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    var LTIblocks = [];
      for(var key in data.blocks){
        if(data.blocks[key].type == "lti_consumer"){
          LTIblocks.push(data.blocks[key]);
        }
      }
    console.log("Curated blocks: ", LTIblocks);
  });
  // Need to find a better way for controlling this:
  if (window.location.port){
    $("#lti-iframes-hidden-container").html("");
  } else {
    $("#lti-iframes-hidden-container").html('<iframe id="financial-aid-advising" style="border:none;" height="1" width="1" src="http://microsite.tex.extensionengine.com/xblock/block-v1:TexasOnCourse+TXOC101+2016_T2+type@lti_consumer+block@788c479d8370471185c422ffbd198a82"> </iframe><iframe id="career-advising" style="border:none;" height="1" width="1" src="http://microsite.tex.extensionengine.com/xblock/block-v1:TexasOnCourse+TXOC101+2016_T2+type@lti_consumer+block@4932fabbde5445b0a5eb29ccb5947453"> </iframe><iframe id="postsecondary-advising" style="border:none;" height="1" width="1" src="http://microsite.tex.extensionengine.com/xblock/block-v1:TexasOnCourse+TXOC101+2016_T2+type@lti_consumer+block@cc3b50c9ed2d441893d68a66aa2c9689"> </iframe>');
  }
};

$(".lo-mainclass a").on("click", function(event) {
  // Probably should look if they're loaded already, but for now it's working.
  loadButtons();
  button[event.currentTarget.id].click();
});

function loadButtons(){
  var children = document.getElementById("lti-iframes-hidden-container").children;
  var c = children.length;

  for(var i = 0; i < c; i ++){
    var el = children[i].contentWindow.document.getElementsByClassName("btn-lti-new-window")[0];
      if(el) button[children[i].id] = el;
  }

}