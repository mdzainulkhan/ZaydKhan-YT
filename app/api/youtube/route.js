import { NextResponse } from 'next/server';

export async function GET(request) {
  const apiKey =
    process.env.YOUTUBE_API_KEY;

  const channelId =
    process.env.YOUTUBE_CHANNEL_ID;

  const { searchParams } = new URL(
    request.url
  );

  const pageToken =
    searchParams.get('pageToken') || '';

  try {
    // Get Upload Playlist
    const channelRes = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&id=${channelId}&key=${apiKey}`
    );

    const channelData =
      await channelRes.json();

    const playlistId =
      channelData.items?.[0]
        ?.contentDetails
        ?.relatedPlaylists?.uploads;

    // Fetch Videos
    const videoRes = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=12&pageToken=${pageToken}&key=${apiKey}`
    );

    const videoData =
      await videoRes.json();

    return NextResponse.json({
      videos: videoData.items || [],
      nextPageToken:
        videoData.nextPageToken || '',
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}