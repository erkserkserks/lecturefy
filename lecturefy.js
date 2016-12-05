/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2016 erkserkserks
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

(function(){
  'use strict';

  function getURLs() {
    function createStatus() {
      // Create new div for status information
      $('.page-header').after('<p id=\'lfy-status\'> </div>');
    }

    function updateStatus(current, target) {
      console.log('Fetching link ' + current + ' out of ' + target + '...');
      $('#lfy-status').html('<h2> Fetching link ' + current + ' out of ' + target + '...</h2>');
    }

    function doneStatus(target) {
      console.log('Done fetching ' + target + ' links!');
      $('#lfy-status').html('<h2> Done fetching ' + target + ' links!</h2>');
    }

    createStatus();
    var buttons = $('.watchVideoButton');
    var lowQualityURLs = [];
    var highQualityURLs = [];
    var fetched = 0;

    // For each lecture, get the video URLs
    for (var i = 0; i < buttons.length; i++) {
      var button = $(buttons[i]);
      var lectureId = button.attr('data-lecture-id');
      var courseId = button.attr('data-course-id');
      var playerType = button.attr('data-type');
      $.ajax({
        url: '/' + playerType + '/LoadPlayer',
        type: 'get',
        data: {
          lectureId: lectureId,
          courseId: courseId
        },
        success: function (result) {
          if (result.length > 0) {
            var re = /file: "(.*?)"/g;
            // TODO(ethong): Error handling in case we don't find what we expect
            lowQualityURLs.push(re.exec(result)[1]);
            highQualityURLs.push(re.exec(result)[1]);
            fetched++;
            var target = buttons.length;
            updateStatus(fetched, target);
            if (fetched == target) {
              doneStatus(target);
              displayURLs(lowQualityURLs, highQualityURLs);
            }
          }
        }
      });
    }
  }

  function displayURLs(lowQualityURLs, highQualityURLs) {
    // Print URLs from array, one on each line
    function printURLs(array) {
      for (var i = 0; i < array.length; i++) {
        console.log(array[i]);
        $('#lfy-urls').append('<br><a href=\'' + array[i] + '\'>' + array[i] + '</a></br>');
      }
    }

    // Create new div for output
    $('#lfy-status').after('<div id=\'lfy-urls\'> </div>');

    // Output low quality links
    console.log('LQ Links: ');
    $('#lfy-urls').append('<h2> Low quality video links (smaller files): </h2>');
    printURLs(lowQualityURLs);
    $('#lfy-urls').append('<br></br>');

    // Output high quality links
    console.log('HQ Links: ');
    $('#lfy-urls').append('<h2> High quality video links (larger files): </h2>');
    printURLs(highQualityURLs);
  }

  // Some sanity checks
  if (window.location.host.indexOf('mvideox') !== 0) {
    alert('Invalid domain name!\n' +
          'Go to mvideox.stanford.edu');
    return;
  }

  if ($('#readyToWatch').length === 0) {
    alert('No class selected!\n' +
          'Select a class, and try again.');
    return;
  }

  if ($('#lfy-urls').length !== 0) {
    console.log('#lfy-urls already exists! Quitting.');
    return;
  }

  // Start getting URLs!
  getURLs();
})();
