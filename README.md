Lecturefy
=========

# About
Lecturefy is a javascript bookmarklet that makes downloading SCPD lecture videos easier. Lecturefy doesn't actually download anything; instead, it generates links so that you can use your favorite download manager to download videos.

# Requirements
The only thing that is required is a web browser that can play SCPD videos, which is pretty much any modern web browser. Tested on Chrome 39, Firefox 32, and Safari 7.1.

# Installation
### Install as a bookmarklet
1. Since Github doesn't allow embedding Javascript on this page, go here: http://www.erkserkserks.com/2014/11/29/lecturefy/

2. Drag "Lecturefy" link onto your bookmark toolbar.
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/easy_installation.png)

3. Done!


### Install as a bookmarklet (manual)
This is how to do it in Chrome, but the process is the same for other browsers.

1. Open the Bookmark Manager ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/1.png)
2. In the Bookmarks Bar folder (or any other folder), add a page ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/2.png)
3. Name the bookmark "Lecturefy" or something memorable, then fill in the URL with the javascript below:
```
javascript:(function(){if(window.location.host.indexOf("mvideox")!==0){alert('Invalid domain name!\n'+'Go to mvideox.stanford.edu');return;}if($('#myVideoContainer').length===0){alert('No video player detected!\n'+'Select a class, click on any lecture video and try again.');return;}if($('#urls-output').length!==0){console.log('#urls-output already exists! Quitting.');return;}var cd=angular.element('#myVideoContainer').scope().courseDetail;var weeks=cd.CourseWeek;var highQualityURLs=[];var lowQualityURLs=[];for(var i=0;i<weeks.length;i++){var lectures=weeks[i].Lectures;for(var j=0;j<lectures.length;j++){var lecture=lectures[j];highQualityURLs.push(lecture.HiVideoDownloadUrl);lowQualityURLs.push(lecture.LowVideoDownloadUrl);}}function printURLs(array){for(var i=0;i<array.length;i++){console.log(array[i]);$('#urls-output').append('<br><a href="'+array[i]+'">'+array[i]+'</a></br>');}}$('.page-header').after('<div id="urls-output"> </div>');console.log('HQ Links: ');$('#urls-output').append('<h2> High quality video links (larger files): </h2>');printURLs(highQualityURLs);$('#urls-output').append('<br></br>');console.log('LQ Links: ');$('#urls-output').append('<h2> Low quality video links (smaller files): </h2>');printURLs(lowQualityURLs);})();
```
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/3.png)

4. Done!


# Usage
1. Navigate to https://mvideox.stanford.edu/
2. Choose a course and watch a lecture video (any lecture video)
3. Click on the Lecturefy bookmarklet ![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/4.png)
4. Done! Click on the links to download, or copy the links into your favorite download manager.
![](https://raw.githubusercontent.com/erkserkserks/lecturefy/master/tutorial_screenshots/5.png)

Since Lecturefy is just javascript, you can also run it in your browser's javascript console.
