/* eslint-disable camelcase */
const router = require('express').Router();
const request = require('request');
const axios = require('axios');
const qs = require('querystring');
const config = require('../../config');

router.post('/exchange', async (req, res) => {
  try {
    const requestBody = qs.stringify({
      grant_type: 'authorization_code',
      redirect_uri: config.spotifyCallbackUri,
      code: req.body.code,
      client_secret: config.spotifyClientSecret,
      client_id: config.spotifyClientId,
    });
    const configPost = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };
    const result = await axios.post(config.spotifyAuthUrl, requestBody, configPost);
    return res.send(result);
  } catch (err) {
    return res.send(err);
  }
});

router.get('/extract-data', async (req, res) => {
  try {
    const headers = {
      Authorization: `Bearer ${req.headers.authorization}`,
    };

    const { limit = '50', offset = '0', timeRange = 'long_term' } = req.query;

    // User profile
    const { data: userInfo } = await axios.get('https://api.spotify.com/v1/me', {
      headers,
    });

    // Top Artists
    const topArtistsParams = `limit=${limit}&offset=${offset}&time_range=${timeRange}`;
    const { data: topArtists } = await axios.get(
      `https://api.spotify.com/v1/me/top/artists?${
        topArtistsParams}`,
      {
        headers,
      },
    );

    const topAritstsToShow = topArtists.items.map((item) => ({
      name: item.name,
      id: item.id,
      genres: item.genres,
      images: item.images,
      uri: item.uri,
    }));

    // Top Tracks
    const topTracksParams = `limit=${limit}&offset=${offset}&time_range=${timeRange}`;
    const { data: topTracks } = await axios.get(
      `https://api.spotify.com/v1/me/top/tracks?${
        topTracksParams}`,
      {
        headers,
      },
    );

    const topTracksToShow = topTracks.items.map((item) => ({
      name: item.name,
      previewUrl: item.preview_url,
      artists: item.artists.map((artist) => ({
        name: artist.name,
        id: artist.id,
      })),
      id: item.id,
      uri: item.uri,
    }));

    return res.send({
      userInfo,
      topAritstsToShow,
      topTracksToShow,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

// Get a new access token from a refresh token
router.post('/refresh', (req, res) => {
  request.post(config.spotifyAuthUrl, {
    form: {
      grant_type: 'refresh_token',
      refresh_token: req.body.refreshToken,
    },
  }, (err, respuesta, body) => {
    if (err) {
      return res.send({ err });
    }
    return res.send(body);
  });
});

module.exports = router;
