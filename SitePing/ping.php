<?php
// Handle URL form submission, perform a ping, and a traceroute

if ($_SERVER["REQUEST_METHOD"] == "POST" && !empty($_POST['url'])) {
    $url = $_POST['url'];

    // Ping the URL with error suppression
    $pingResult = [];
    @exec("ping -c 4 " . escapeshellarg($url), $pingResult);

    // Traceroute to the URL
    $traceResult = [];
    @exec("traceroute " . escapeshellarg($url), $traceResult);

    // Extract average time from ping results
    $averageTime = '';
    foreach ($pingResult as $line) {
        if (preg_match("/^rtt min\/avg\/max\/mdev = ([\d\.]+)\/([\d\.]+)\/([\d\.]+)\/([\d\.]+) ms$/", $line, $matches)) {
            $averageTime = $matches[2] . ' ms';
            break;
        }
    }

    // Scrape the <title> tag from the webpage
    $webContent = @file_get_contents($url);
    if ($webContent !== false) {
        if (preg_match("/<title>(.*?)<\/title>/is", $webContent, $matches)) {
            $pageTitle = $matches[1];
        } else {
            $pageTitle = "Title not found";
        }
    } else {
        $pageTitle = "Failed to fetch content";
    }

    // Check if URL is reachable
    $headers = @get_headers($url);
    $isReachable = $headers ? "Yes" : "No";

    // Output results
    echo "Average ping time for $url: $averageTime\n";
    echo "Page title: $pageTitle\n";
    echo "Is URL reachable? $isReachable\n";
    echo "Traceroute result:\n";
    echo implode("\n", $traceResult);
}
?>
