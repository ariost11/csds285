<?php
// Handle URL form submission

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['url'])) {
    $url = $_POST['url'];

    // Ping the URL
    $pingResult = [];
    exec("ping -c 4 " . escapeshellarg($url), $pingResult);

    // Find average ping time
    $averageTime = '';
    foreach ($pingResult as $line) {
        if (preg_match("/^rtt min\/avg\/max\/mdev = ([\d\.]+)\/([\d\.]+)\/([\d\.]+)\/([\d\.]+) ms$/", $line, $matches)) {
            $averageTime = $matches[2] . ' ms';
            break;
        }
    }

    // Output average time
    echo "Average ping time for $url: $averageTime";
}
?>
