Lecturefy
=========

# About
Lecturefy is a javascript bookmarklet that makes downloading SCPD lecture videos easier. Lecturefy doesn't actually download anything; instead, it generates links so that you can use your favorite download manager to download videos.

# Requirements
Any modern web browser. If it can play SCPD videos, Lecturefy will probably work. Tested on Chrome 39, Firefox 32, and Safari 7.1.

# Installation

javascript:(function(){if(window.location.host.indexOf("mvideox")!==0){alert('Invalid domain name!\n'+'Go to mvideox.stanford.edu');return;}if($('#myVideoContainer').length===0){alert('No video player detected!\n'+'Select a class, click on any lecture video and try again.');return;}if($('#urls-output').length!==0){console.log('#urls-output already exists! Quitting.');return;}var cd=angular.element('#myVideoContainer').scope().courseDetail;var weeks=cd.CourseWeek;var highQualityURLs=[];var lowQualityURLs=[];for(var i=0;i<weeks.length;i++){var lectures=weeks[i].Lectures;for(var j=0;j<lectures.length;j++){var lecture=lectures[j];highQualityURLs.push(lecture.HiVideoDownloadUrl);lowQualityURLs.push(lecture.LowVideoDownloadUrl);}}function printURLs(array){for(var i=0;i<array.length;i++){console.log(array[i]);$('#urls-output').append('<br><a href="'+array[i]+'">'+array[i]+'</a></br>');}}$('.page-header').after('<div id="urls-output"> </div>');console.log('HQ Links: ');$('#urls-output').append('<h2> High quality video links (larger files): </h2>');printURLs(highQualityURLs);$('#urls-output').append('<br></br>');console.log('LQ Links: ');$('#urls-output').append('<h2> Low quality video links (smaller files): </h2>');printURLs(lowQualityURLs);})();
