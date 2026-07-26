import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey =
    process.env.YOUTUBE_API_KEY ||
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ||
    process.env.GOOGLE_API_KEY;

  const { searchParams } = new URL(request.url);
  const channelId = searchParams.get('channelId') || process.env.YOUTUBE_CHANNEL_ID;
  const playlistId = searchParams.get('playlistId') || '';
  const pageToken = searchParams.get('pageToken') || '';

  if (!apiKey) {
    return NextResponse.json(
      {
        error: 'Missing YouTube API key.',
      },
      { status: 500 }
    );
  }

  if (!channelId && !playlistId) {
    return NextResponse.json(
      {
        error: 'Missing channel or playlist identifier.',
      },
      { status: 400 }
    );
  }

  try {
    if (!playlistId) {
      const channelRes = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${channelId}&key=${apiKey}`
      );

      const channelData = await channelRes.json();

      if (!channelRes.ok || !channelData.items?.length) {
        return NextResponse.json(
          {
            error: channelData.error?.message || 'Unable to load channel info.',
          },
          { status: channelRes.status || 500 }
        );
      }

      const uploadsPlaylistId =
        channelData.items[0].contentDetails?.relatedPlaylists?.uploads;

      if (!uploadsPlaylistId) {
        return NextResponse.json(
          {
            error: 'No uploads playlist found for this channel.',
          },
          { status: 404 }
        );
      }

      const videoRes = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&pageToken=${pageToken}&key=${apiKey}`
      );

      const videoData = await videoRes.json();

      return NextResponse.json({
        channelInfo: channelData.items[0],
        playlistId: uploadsPlaylistId,
        videos: videoData.items || [],
        nextPageToken: videoData.nextPageToken || '',
      });
    }

    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=12&pageToken=${pageToken}&key=${apiKey}`
    );

    const videoData = await videoRes.json();

    return NextResponse.json({
      videos: videoData.items || [],
      nextPageToken: videoData.nextPageToken || '',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      { status: 500 }
    );
  }
}