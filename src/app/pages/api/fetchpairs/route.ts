import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const UNSPLASH_KEY = process.env.UNSPLASH_KEY;
const GIPHY_KEY = process.env.GIPHY_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Missing query parameter' }, { status: 400 });
  }

  try {
    const unsplashRes = await axios.get(`https://api.unsplash.com/search/photos`, {
      params: { query, per_page: 5 },
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
    });

    const giphyRes = await axios.get(`https://api.giphy.com/v1/gifs/search`, {
      params: { api_key: GIPHY_KEY, q: query, limit: 5 }
    });

    const image = unsplashRes.data.results[0]?.urls?.regular;
    const gif = giphyRes.data.data[0]?.images?.original?.url;

    if (!image || !gif) {
      return NextResponse.json({ error: 'No pairs found' }, { status: 404 });
    }

    return NextResponse.json({ image, gif });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch pairs' }, { status: 500 });
  }
}