Lecturefy
=========

# About
Lecturefy is a javascript bookmarklet that makes downloading SCPD lecture videos easier. Lecturefy doesn't actually download anything; instead, it generates links so that you can use your favorite download manager to download videos.

# Requirements
The only thing that is required is a web browser that can play SCPD videos, which is any modern web browser. Tested on Chrome 55, Firefox 50, Safari 10.

# Installation
### Install as a bookmarklet
1. Since Github doesn't allow embedding Javascript on this page, go here: http://www.erkserkserks.com/lecturefy/

2. Drag "Lecturefy" link onto your bookmark toolbar.
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/easy_installation.png)

3. Done!


### Install as a bookmarklet (manual)
This is how to do it in Chrome, but the process is the same for other browsers.

1. Open the Bookmark Manager ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/1.png)
2. In the Bookmarks Bar folder (or any other folder), add a page ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/2.png)
3. Name the bookmark "Lecturefy" or something memorable, then fill in the URL with the javascript below:
```
javascript:(function(){"use strict";function getURLs(){function createStatus(){$(".page-header").after('<p id="lfy-status"> </div>')}function updateStatus(current,target){console.log("Fetching link "+current+" out of "+target+"...");$("#lfy-status").html("<h2> Fetching link "+current+" out of "+target+"...</h2>")}function doneStatus(target){console.log("Done fetching "+target+" links!");$("#lfy-status").html("<h2> Done fetching "+target+" links!</h2>")}createStatus();var buttons=$(".watchVideoButton");var lowQualityURLs=[];var highQualityURLs=[];var fetched=0;for(var i=0;i<buttons.length;i++){var button=$(buttons[i]);var lectureId=button.attr("data-lecture-id");var courseId=button.attr("data-course-id");var playerType=button.attr("data-type");$.ajax({url:"/"+playerType+"/LoadPlayer",type:"get",data:{lectureId:lectureId,courseId:courseId},success:function(result){if(result.length>0){var re=/file: "(.*?)"/g;lowQualityURLs.push(re.exec(result)[1]);highQualityURLs.push(re.exec(result)[1]);fetched++;var target=buttons.length;updateStatus(fetched,target);if(fetched==target){doneStatus(target);displayURLs(lowQualityURLs,highQualityURLs)}}}})}}function displayURLs(lowQualityURLs,highQualityURLs){function printURLs(array){for(var i=0;i<array.length;i++){console.log(array[i]);$("#lfy-urls").append('<br><a href="'+array[i]+'">'+array[i]+'</a></br>')}}$("#lfy-status").after('<div id="lfy-urls"> </div>');console.log("LQ Links: ");$("#lfy-urls").append("<h2> Low quality video links (smaller files): </h2>");printURLs(lowQualityURLs);$("#lfy-urls").append("<br></br>");console.log("HQ Links: ");$("#lfy-urls").append("<h2> High quality video links (larger files): </h2>");printURLs(highQualityURLs)}if(window.location.host.indexOf("mvideox")!==0){alert("Invalid domain name!\n"+"Go to mvideox.stanford.edu");return}if($("#readyToWatch").length===0){alert("No class selected!\n"+"Select a class, and try again.");return}if($("#lfy-urls").length!==0){console.log("#lfy-urls already exists! Quitting.");return}getURLs()})()
```
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/3.png)

# Usage
1. Navigate to https://mvideox.stanford.edu/
2. Choose a course and watch a lecture video (any lecture video)
3. Click on the Lecturefy bookmarklet ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/4.png)
4. Done! Click on the links to download, or copy the links into your favorite download manager.
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/5.png)

Since Lecturefy is just javascript, you can also run it in your browser's javascript console.
