const axios = require('axios');

module.exports = async (req, res) => {
    // Yahan wo link daalein jo aapne capture kiya hai
    const streamUrl = "https://jiotvbpkmob.cdn.jio.com/path/to/playlist.m3u8"; 

    try {
        const response = await axios.get(streamUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Referer': 'https://jiocinema.com/',
                'Origin': 'https://jiocinema.com'
            },
            responseType: 'stream'
        });

        // Set headers to allow video streaming
        res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
        res.setHeader('Access-Control-Allow-Origin', '*');

        response.data.pipe(res);
    } catch (error) {
        res.status(500).send("Stream Error: " + error.message);
    }
};
