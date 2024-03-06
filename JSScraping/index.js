const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');
const url = require('url');

const fs = require('fs').promises;
const { exec } = require('child_process');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static('.'));

app.get('/scrape', async (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is missing' });
    }

    try {
        const response = await axios.get(targetUrl);
        const html = response.data;
        const $ = cheerio.load(html);
        const baseDomain = new URL(targetUrl).hostname;

        const stats = {
            imageCount: 0,
            internalLinks: 0,
            externalLinks: 0,
            scriptCount: 0,
            styleSheetCount: 0,
            totalLinks: 0,
            uniqueDomains: new Set(),
            mailtoLinks: 0
        };

        $('a').each((_, element) => {
            const href = $(element).attr('href');
            if (!href) return;

            stats.totalLinks++;

            if (href.startsWith('mailto:')) {
                stats.mailtoLinks++;
            } else if (href.startsWith('http') || href.startsWith('//')) {
                const linkDomain = new URL(href, targetUrl).hostname;
                stats.uniqueDomains.add(linkDomain);
                if (linkDomain === baseDomain) {
                    stats.internalLinks++;
                } else {
                    stats.externalLinks++;
                }
            } else {
                stats.internalLinks++;
            }
        });

        $('img').each((_, element) => {
            stats.imageCount++;
        });

        $('script').each((_, element) => {
            stats.scriptCount++;
        });

        $('link[rel="stylesheet"]').each((_, element) => {
            stats.styleSheetCount++;
        });

        stats.uniqueDomains = stats.uniqueDomains.size;

        res.json(stats);
    } catch (error) {
        console.error('Scraping failed:', error);
        res.status(500).json({ error: 'Failed to scrape the URL' });
    }
});



app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
