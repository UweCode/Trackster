/* jQuery */

$(document).ready(function() {

  $("#cmdSearch").click(function() {
    Trackster.searchTracksByTitle($("#searchText").val());
  })

});

const API_KEY = "2df2103dfbff06449dce13e12a56ac4a";




/* Trackster Object */

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {

};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
    $.ajax({
      url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
      datatype: 'jsonp',
      success: function(data) {
        console.log("data", data);
      }
    });
};
