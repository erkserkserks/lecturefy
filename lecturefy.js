(function() {
  // Some sanity checks
  if (window.location.host.indexOf("mvideox") !== 0) {
    alert('Invalid domain name!\n' + 
          'Go to mvideox.stanford.edu');
    return;
  }

  if ($('#myVideoContainer').length === 0) {
    alert('No video player detected!\n' +
          'Select a class, click on any lecture video and try again.');
    return;
  }

  if ($('#urls-output').length !== 0) {
    console.log('#urls-output already exists! Quitting.');
    return;
  }

  // Grab course detail info from SCPD's Angular.js app
  var cd = angular.element('#myVideoContainer').scope().courseDetail;
  var weeks = cd.CourseWeek;

  // Grab video URLs
  var highQualityURLs = [];
  var lowQualityURLs = [];

  for (var i = 0; i < weeks.length; i++) {
    var lectures = weeks[i].Lectures;
    for (var j = 0; j < lectures.length; j++) {
      var lecture = lectures[j];
      highQualityURLs.push(lecture.HiVideoDownloadUrl);
      lowQualityURLs.push(lecture.LowVideoDownloadUrl);
    }
  }

  // Print URLs from array, one on each line
  function printURLs(array) {
    for (var i = 0; i < array.length; i++) {
      console.log(array[i]);
      $('#urls-output').append('<br><a href="' + array[i] + '">' + array[i] + '</a></br>');
    }
  }

  // Create new div for output
  $('.page-header').after('<div id="urls-output"> </div>');

  // Output high quality links
  console.log('HQ Links: ');
  $('#urls-output').append('<h2> High quality video links (larger files): </h2>');
  printURLs(highQualityURLs);
  $('#urls-output').append('<br></br>');

  // Output low quality links
  console.log('LQ Links: ');
  $('#urls-output').append('<h2> Low quality video links (smaller files): </h2>');
  printURLs(lowQualityURLs);
})();
