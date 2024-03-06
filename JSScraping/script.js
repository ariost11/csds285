document.getElementById('scrapeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    showLoading(true);
    
    try {
        const response = await axios.get(`http://localhost:3000/scrape?url=${encodeURIComponent(url)}`);
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
        document.getElementById('results').textContent = 'Failed to fetch data. Please try again.';
    }

    showLoading(false);
});

function showLoading(show) {
    document.getElementById('loading').style.display = show ? 'block' : 'none';
    document.getElementById('content').style.display = show ? 'none' : 'block';
}
