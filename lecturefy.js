/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 erkserkserks
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

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
