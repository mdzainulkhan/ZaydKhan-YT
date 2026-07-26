
// import { Suspense } from "react";
// import YouTubeFeed from "./components/YouTubeFeed";

// export default function YoutubePage() {
//   return (
//     <main>
//       <Suspense fallback={<p>Loading YouTube Feed...</p>}>
//         <YouTubeFeed />
//       </Suspense>
//     </main>
//   );
// }


'use client';

import { useEffect, useState } from 'react';

import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';
import ChannelHeader from './components/ChannelHeader';
import VideoPlayer from './components/VideoPlayer';
import VideoCard from './components/VideoCard';
import SkeletonCard from './components/SkeletonCard';

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] =
    useState(null);

  const [nextPageToken, setNextPageToken] =
    useState('');

  const [loading, setLoading] =
    useState(false);

  const [channelInfo, setChannelInfo] =
    useState(null);

  const [avatar, setAvatar] = useState('');

  const [searchTerm, setSearchTerm] =
    useState('');

  const [darkMode, setDarkMode] =
    useState(true);

  const [playlistId, setPlaylistId] =
    useState('');

  const API_KEY =
    process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

  const CHANNEL_ID =
    'UCLX1dlIr5fYMqXX4k3UQijg';

  const subStr =
    channelInfo?.statistics?.subscriberCount
      ? Intl.NumberFormat('en', {
          notation: 'compact',
        }).format(
          channelInfo.statistics
            .subscriberCount
        )
      : '0';

  // Dark Mode
 useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add(
      'dark'
    );
  } else {
    document.documentElement.classList.remove(
      'dark'
    );
  }
}, [darkMode]);

  // Fetch Channel Info
  const fetchChannelInfo = async () => {
    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
      );

      const data = await res.json();

      if (data.items?.length > 0) {
        const info = data.items[0];

        setChannelInfo(info);

        setAvatar(
          info.snippet?.thumbnails?.high
            ?.url || ''
        );

        const uploadsPlaylistId =
          info.contentDetails
            ?.relatedPlaylists?.uploads;

        setPlaylistId(uploadsPlaylistId);

        fetchVideos(uploadsPlaylistId);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch Videos
  const fetchVideos = async (
    uploadsPlaylistId,
    pageToken = ''
  ) => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`
      );

      const data = await res.json();

      const formattedVideos = (
        data.items || []
      )
        .filter(
          (item) =>
            item?.snippet?.resourceId
              ?.videoId
        )
        .map((item) => ({
          id: {
            videoId:
              item.snippet.resourceId
                .videoId,
          },
          snippet: item.snippet,
        }));

      setVideos((prev) => {
        const existingIds = new Set(
          prev.map((v) => v.id.videoId)
        );

        const uniqueVideos =
          formattedVideos.filter(
            (v) =>
              !existingIds.has(
                v.id.videoId
              )
          );

        return [...prev, ...uniqueVideos];
      });

      setNextPageToken(
        data.nextPageToken || ''
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchChannelInfo();
  }, []);

  // Infinite Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        loading ||
        !nextPageToken ||
        !playlistId
      )
        return;

      const scrollTop = window.scrollY;

      const windowHeight =
        window.innerHeight;

      const fullHeight =
        document.documentElement
          .scrollHeight;

      if (
        scrollTop + windowHeight >=
        fullHeight - 300
      ) {
        fetchVideos(
          playlistId,
          nextPageToken
        );
      }
    };

    window.addEventListener(
      'scroll',
      handleScroll
    );

    return () =>
      window.removeEventListener(
        'scroll',
        handleScroll
      );
  }, [
    loading,
    nextPageToken,
    playlistId,
  ]);

  // Search Filter
  const filteredVideos = videos.filter(
    (video) =>
      video.snippet.title
        .toLowerCase()
        .includes(
          searchTerm.toLowerCase()
        )
  );

  // Video Click
  const handleVideoClick = (video) => {

  setSelectedVideo(video);

  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

  return (
    <main className="min-h-screen bg-white text-black dark:bg-black dark:text-white duration-300">

      {/* Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="flex">

        {/* Sidebar */}
        {/* <Sidebar />00 */}

        {/* Main Content */}
        <div className="flex-1 p-4 md:p-6">

          {/* Channel Header */}
          <ChannelHeader
            channelInfo={channelInfo}
            avatar={avatar}
            subStr={subStr}
          />

          {/* Selected Video */}
          <VideoPlayer
            selectedVideo={selectedVideo}
          />

          {/* Video Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

            {filteredVideos.map((video) => (
              <VideoCard
                key={video.id.videoId}
                video={video}
                handleVideoClick={
                  handleVideoClick
                }
              />
            ))}

            {/* Skeleton Loading */}
            {loading &&
              Array.from({
                length: 8,
              }).map((_, index) => (
                <SkeletonCard
                  key={index}
                />
              ))}
          </div>

          {/* End Message */}
          {!loading &&
            !nextPageToken &&
            videos.length > 0 && (
              <div className="text-center py-10 text-zinc-500">
                All videos loaded ✅
              </div>
            )}
        </div>
      </div>
    </main>
  );
}