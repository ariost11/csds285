document.getElementById('scrapeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value;
    if (!url) {
        alert('Please enter a URL to scrape.');
        return;
    }

    showLoading(true); // Show the loading screen

    try {
        const response = await axios.get(`http://localhost:3000/scrape?url=${encodeURIComponent(url)}`);
        // Process the response and update the DOM as needed
        document.getElementById('results').innerHTML = `
            <p>Image Count: ${response.data.imageCount}</p>
            <p>Internal Links: ${response.data.internalLinks}</p>
            <p>External Links: ${response.data.externalLinks}</p>
            <p>Total Links: ${response.data.totalLinks}</p>
            <p>Script Tags: ${response.data.scriptCount}</p>
            <p>Stylesheets: ${response.data.styleSheetCount}</p>
            <p>Unique Domains: ${response.data.uniqueDomains}</p>
            <p>Email Links (mailto): ${response.data.mailtoLinks}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('results').innerHTML = `<p class="error">Failed to fetch data. Please try again.</p>`;
    }

    showLoading(false); // Hide the loading screen
});



function showLoading(show) {
    const loading = document.getElementById('loading');
    const dashboard = document.getElementById('dashboard');
    if (show) {
        loading.classList.remove('hidden');
        dashboard.classList.add('hidden');
    } else {
        loading.classList.add('hidden');
        dashboard.classList.remove('hidden');
    }
}
