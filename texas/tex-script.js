var button = [];
var LTIblocks = [];
window.onload = function() {
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
      for(var key in data.blocks){
        if(data.blocks[key].type == "lti_consumer"){
          LTIblocks.push(data.blocks[key]);
        }
      }
    console.log("Curated blocks: ", LTIblocks);
    for(var i = 0; i< LTIblocks.length; i++){
      $('<iframe/>', {
          'id': LTIblocks[i].id,
          'style':'border:none;',
          'height':'1',
          'width':'1',
          'src': LTIblocks[i].student_view_url
      }).appendTo('#lti-iframes-hidden-container');

      // TODO: Module button generation

    }
  });
};

$(".lo-mainclass a").on("click", function(event) {
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