/* jQuery */

$(document).ready(function() {

  $("#cmdSearch").click(function() {
    Trackster.searchTracksByTitle($("#searchText").val());
  })

  $("#play").click(function() {
    console.log($("#video").is(":visible"));

    if($("#video").is(":visible")) {
      $("#video").hide(500);
    } else {
      $("#video").show(500);
    }
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
  console.log("tracks.results.trackmatches.track", tracks.results.trackmatches.track);
  $.each(tracks.results.trackmatches.track, function( index, value ) {
    console.log( index + ": " + value.name );

    const thisRow = '<div id="tableBodyRow_' + index + '" class="row"><div id="tableBody" class="container-fluid"><div class="col col-md-1"></div>' +
      '<div class="col col-md-1"><i id="play_' + index + '" class="fa fa-play-circle-o fa-2x"></i></div>' +
      '<div class="col col-md-3">' + value.name + '</div>' +
      '<div class="col col-md-3">' + value.artist + '</div>' +
      '<div class="col col-md-1">Some Image</div>' +
      '<div class="col col-md-1">' + value.listeners + '</div>' +
      '<div class="col col-md-1"></div>' +
      '</div></div>';
    $("#musicTable").append(thisRow);
  });
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
        Trackster.renderTracks(data);
      }
    });
};
