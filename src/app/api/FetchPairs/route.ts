import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');

    console.log('Query:', query);

    if (!query) {
      return NextResponse.json({ error: 'Missing query' }, { status: 400 });
    }

    const unsplashKey = process.env.UNSPLASH_KEY;
    const giphyKey = process.env.GIPHY_KEY;

    console.log('Unsplash Key:', unsplashKey);
    console.log('Giphy Key:', giphyKey);

    if (!unsplashKey || !giphyKey) {
      return NextResponse.json({ error: 'Missing API keys' }, { status: 500 });
    }

    const [unsplashRes, giphyRes] = await Promise.all([
      fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=${unsplashKey}`),
      fetch(`https://api.giphy.com/v1/gifs/search?q=${query}&api_key=${giphyKey}&limit=5`)
    ]);

    if (!unsplashRes.ok || !giphyRes.ok) {
      throw new Error('Failed to fetch from external APIs');
    }

    const unsplashData = await unsplashRes.json();
    const giphyData = await giphyRes.json();

    // ✅ Extract image and GIF URLs
    const imageUrl = unsplashData?.results?.[0]?.urls?.regular || null;
    const gifUrl = giphyData?.data?.[0]?.images?.original?.url || null;

    console.log('Fetched Image URL:', imageUrl);
    console.log('Fetched GIF URL:', gifUrl);

    // Send only the URLs in the response
    return NextResponse.json({ imageUrl, gifUrl });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
