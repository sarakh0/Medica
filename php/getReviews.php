<?php

$placeId = 'ChIJ30bWcussO4gRl6Ju1y5SywM';
$apiKey = 'AIzaSyBCGA86nV85VBKlg6_UsraUse6jrTju7AU';

$url = "https://maps.googleapis.com/maps/api/place/details/json?place_id=$placeId&fields=review,rating,user_ratings_total&key=$apiKey";

$response = file_get_contents($url);
header("Content-Type: application/json");
echo $response;


?>