<?php

$url = $_GET["text"];

$urlFileName = strtok($url, $_GET["decollator"]);

echo "[\"" . $urlFileName . "\",\"";

while (!empty($urlFileName)) {

$urlFileName = strtok($_GET["decollator"]);

echo $urlFileName . ",\"";

}

echo "]";

?>
