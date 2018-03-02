/* jQuery */

$(document).ready(function() {

  $("#cmdSearch").click(function() {
    const searchText = $("#searchText").val();

    if(searchText.length > 0 && searchText != "Watcha lookin' for?") {
      $('h1').css('color', 'rgb(255, 255, 255)');
      setTimeout(function(){ $('h1').css('color', 'rgb(255, 0, 171)'); }, 500);

      Trackster.searchTracksByTitle($("#searchText").val());
    }
  })

    $("#searchText").click(function() {
      if ($("#searchText").val() == "Watcha lookin' for?") {
        $("#searchText").val("").select();
      } else {
        $("#searchText").selectAll();
      }
    })

  $("#play").click(function() {
    if($("#video").is(":visible")) {
      $("#video").hide(500);
    } else {
      $("#video").show(500);
    }
  })

  $("#cmdClose").click(function() {
    $("#searchText").val("").select();
  })

  $('#searchText').keypress(function(event){
    if(event.keyCode == 13){
      $('#cmdSearch').click();
    }
  });

});

const API_KEY = "2df2103dfbff06449dce13e12a56ac4a";

/* Trackster Object */

var Trackster = {};

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  $("#musicTable").empty();

  $.each(tracks.results.trackmatches.track, function( index, value ) {
    var mediumAlbumArt = value.image[0]["#text"]; // [0] - small - [1] - medium - [2] - large - [3] - extra large\

    const thisRow = '<div id="tableBodyRow_' + index + '" class="row"><div id="tableBody" class="container-fluid"><div class="col col-md-1"></div>' +
      '<div class="col col-md-1"><a href="' + value.url + '" target="_blank_"><i id="play_' + index + '" class="fa fa-play-circle-o fa-2x"></i></a></div>' +
      '<div class="col col-md-3">' + value.name + '</div>' +
      '<div class="col col-md-3">' + value.artist + '</div>' +
      '<div class="col col-md-1"><img src="' + mediumAlbumArt + '" alt="Album art for the song ' + value.name + ' by ' + value.artist + '."></div>' +
      '<div class="col col-md-1">' + numeral(value.listeners).format('0,0') + '</div>' +
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
      url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
      datatype: 'jsonp',
      success: function(data) {
        Trackster.renderTracks(data);
      }
    });
};
