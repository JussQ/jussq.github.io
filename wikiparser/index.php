<?php
header("Content-type: application/json; charset=utf-8");
/*$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://ru.wikipedia.org/w/api.php?action=parse&format=json&page=Dragon_Age:_Inquisition");
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_USERAGENT, "Testing for http://stackoverflow.com/questions/8956331/how-to-get-results-from-the-wikipedia-api-with-php");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = curl_exec($ch);
curl_close($ch);

echo json_decode($result, JSON_UNESCAPED_UNICODE);
*/

    $url = "https://ru.wikipedia.org/w/api.php?action=parse&format=json&page=Dragon_Age:_Inquisition";
	$curl = curl_init();
	curl_setopt( $curl, CURLOPT_URL, $url );
	curl_setopt( $curl, CURLOPT_RETURNTRANSFER, 1 );
	$result = curl_exec( $curl );
	curl_close( $curl );

    $result = utf8_encode($result); // before json_decode
    $return = json_decode( $result, true);
    
    //echo $return['parse']['text']['*'];
    //echo "<h1> TYT TEST </h1>";
    //echo var_dump($return['parse']['sections']) . "<br> <br>";
    /*$countSections = count($return['parse']['sections']);
    
    for ($i = 0; $i < $countSections; $i++)
    {
        echo $return['parse']['sections'][$i]['line'] . " <br> <br> ";
    }

    echo "<br><br><br><br><br>";*/

    $array = array(
        "sections" => json_encode($return['parse']['sections']),
        "text" => json_encode($return['parse']['text']['*'])
    );
    
    //echo var_dump($array);
    echo "TEST";

?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Testing parser</title>
</head>
<body>
	
</body>
</html>