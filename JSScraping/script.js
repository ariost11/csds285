document.getElementById('scrapeForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;
    try {
        const response = await axios.get(`http://localhost:3000/scrape?url=${encodeURIComponent(url)}`);
        const data = response.data;
        document.getElementById('results').innerHTML = `
            <p>Image Count: ${data.imageCount}</p>
            <p>Internal Links: ${data.internalLinks}</p>
            <p>External Links: ${data.externalLinks}</p>
            <p>Total Links: ${data.totalLinks}</p>
            <p>Script Tags: ${data.scriptCount}</p>
            <p>Stylesheets: ${data.styleSheetCount}</p>
            <p>Unique Domains: ${data.uniqueDomains}</p>
            <p>Email Links (mailto): ${data.mailtoLinks}</p>
        `;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
