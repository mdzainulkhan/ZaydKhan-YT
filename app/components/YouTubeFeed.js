// 'use client';

// import { useEffect, useState, useCallback } from 'react';
// import Image from 'next/image';
// import Link from 'next/link';
// import { useRouter, useSearchParams } from 'next/navigation';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function YouTubeFeed() {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);
//   const [nextPageToken, setNextPageToken] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const [uploadsPlaylistId, setUploadsPlaylistId] = useState('');

//   const [channelInfo, setChannelInfo] = useState(null);
//   const [avatar, setAvatar] = useState('');
//   const [subscribed, setSubscribed] = useState(false);
//   const [subAnim, setSubAnim] = useState(false);

//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const videoIdFromUrl = searchParams.get('v');

//   const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || '';
//   const CHANNEL_ID = 'UCLX1dlIr5fYMqXX4k3UQijg';

//   const subStr =
//     channelInfo?.statistics?.subscriberCount
//       ? Intl.NumberFormat('en', {
//           notation: 'compact',
//         }).format(channelInfo.statistics.subscriberCount)
//       : '0';

//   const handleSubscribe = () => {
//     setSubscribed(!subscribed);

//     setSubAnim(true);

//     setTimeout(() => {
//       setSubAnim(false);
//     }, 500);
//   };

//   // Fetch Channel Info
//   const fetchChannelInfo = async () => {
//     try {
//       const res = await fetch(
//         `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics,contentDetails&id=${CHANNEL_ID}&key=${API_KEY}`
//       );

//       const data = await res.json();

//       if (data.items?.length > 0) {
//         const info = data.items[0];

//         setChannelInfo(info);

//         setAvatar(info.snippet?.thumbnails?.high?.url || '');

//         const playlistId =
//           info.contentDetails?.relatedPlaylists?.uploads || '';

//         setUploadsPlaylistId(playlistId);

//         return playlistId;
//       }
//     } catch (error) {
//       console.error(error);
//     }

//     return '';
//   };

//   // Fetch Videos
//   const fetchVideos = useCallback(
//     async (playlistId, pageToken = '') => {
//       if (!playlistId || loading || !hasMore) return;

//       setLoading(true);

//       try {
//         const res = await fetch(
//           `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=12&pageToken=${pageToken}&key=${API_KEY}`
//         );

//         const data = await res.json();

//         const newVideos = (data.items || []).filter(
//           (item) => item?.snippet?.resourceId?.videoId
//         );

//         const formattedVideos = newVideos.map((item) => ({
//           id: {
//             videoId: item.snippet.resourceId.videoId,
//           },
//           snippet: item.snippet,
//         }));

//         setVideos((prev) => {
//           const existingIds = new Set(prev.map((v) => v.id.videoId));

//           const uniqueVideos = formattedVideos.filter(
//             (v) => !existingIds.has(v.id.videoId)
//           );

//           return [...prev, ...uniqueVideos];
//         });

//         setNextPageToken(data.nextPageToken || '');

//         setHasMore(!!data.nextPageToken);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     },
//     [loading, hasMore, API_KEY]
//   );

//   // Initial Load
//   useEffect(() => {
//     const init = async () => {
//       const playlistId = await fetchChannelInfo();

//       if (playlistId) {
//         fetchVideos(playlistId);
//       }
//     };

//     init();
//   }, []);

//   // Select Video from URL
//   useEffect(() => {
//     if (videoIdFromUrl && videos.length > 0) {
//       const matchedVideo = videos.find(
//         (video) => video.id.videoId === videoIdFromUrl
//       );

//       if (matchedVideo) {
//         setSelectedVideo(matchedVideo);
//       }
//     }
//   }, [videoIdFromUrl, videos]);

//   const handleVideoClick = (video) => {
//     setSelectedVideo(video);

//     router.push(`?v=${video.id.videoId}`);
//   };

//   // Infinite Scroll
//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollTop = window.scrollY;
//       const windowHeight = window.innerHeight;
//       const fullHeight = document.documentElement.scrollHeight;

//       if (
//         scrollTop + windowHeight >= fullHeight - 300 &&
//         hasMore &&
//         !loading &&
//         uploadsPlaylistId
//       ) {
//         fetchVideos(uploadsPlaylistId, nextPageToken);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [
//     nextPageToken,
//     hasMore,
//     loading,
//     uploadsPlaylistId,
//     fetchVideos,
//   ]);

//   return (
//     <main
//       style={{
//         background: '#101010',
//         minHeight: '100vh',
//         color: '#fff',
//       }}
//     >
//       <div className="container py-4">
        

//         {/* Logo */}
//         <Link href="/" className="mb-4 d-inline-block">
//           <Image
//             src="/YouTube_logo.svg"
//             alt="YouTube Logo"
//             width={120}
//             height={35}
//             priority
//           />
//         </Link>
        

//         {/* Channel Info */}
//         <div className="d-flex align-items-center gap-3 mb-4 flex-wrap">
//           <div
//             style={{
//               width: 90,
//               height: 90,
//               borderRadius: '50%',
//               overflow: 'hidden',
//               border: '3px solid red',
//             }}
//           >
//             {avatar ? (
//               <img
//                 src={avatar}
//                 alt="channel"
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                 }}
//               />
//             ) : null}
//           </div>

//           <div>
//             <h2>{channelInfo?.snippet?.title || 'YouTube Channel'}</h2>

//             <p style={{ color: '#aaa' }}>
//               {subStr} subscribers ·{' '}
//               {channelInfo?.statistics?.videoCount || 0} videos
//             </p>
//             <p>Hi everyone! 👋 Welcome to Zayd Khan, our happy little world! 🌍✨ ... more</p>

//             {/* <button
//               onClick={handleSubscribe}
//               style={{
//                 background: subscribed ? '#333' : '#ff0000',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: 30,
//                 padding: '10px 20px',
//                 fontWeight: 600,
//                 transform: subAnim ? 'scale(1.05)' : 'scale(1)',
//                 transition: '0.3s',
//               }}
//             >
//               {subscribed ? 'Subscribed' : 'Subscribe'}
//             </button> */}
//           </div>
//         </div>

//         {/* Selected Video */}
//         {selectedVideo && (
//           <div className="mb-5">
//             <iframe
//               width="100%"
//               height="500"
//               src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
//               title={selectedVideo.snippet.title}
//               frameBorder="0"
//               allowFullScreen
//               style={{
//                 borderRadius: 12,
//               }}
//             />

//             <h4 className="mt-3">
//               {selectedVideo.snippet.title}
//             </h4>

//             <p style={{ color: '#aaa' }}>
//               {selectedVideo.snippet.channelTitle}
//             </p>
//           </div>
//         )}

//         {/* Videos */}
//         <div className="row">
//           {videos.map((video) => (
//             <div
//               className="col-lg-3 col-md-4 col-sm-6 mb-4"
//               key={video.id.videoId}
//               style={{ cursor: 'pointer' }}
//               onClick={() => handleVideoClick(video)}
//             >
//               <div
//                 style={{
//                   background: '#1a1a1a',
//                   borderRadius: 12,
//                   overflow: 'hidden',
//                 }}
//               >
//                 <img
//                   src={
//                     video.snippet.thumbnails?.medium?.url ||
//                     video.snippet.thumbnails?.default?.url
//                   }
//                   alt={video.snippet.title}
//                   style={{
//                     width: '100%',
//                     display: 'block',
//                   }}
//                 />

//                 <div className="p-3">
//                   <h6
//                     style={{
//                       fontSize: 15,
//                       lineHeight: 1.4,
//                     }}
//                   >
//                     {video.snippet.title}
//                   </h6>

//                   <p
//                     style={{
//                       color: '#aaa',
//                       fontSize: 13,
//                       marginBottom: 0,
//                     }}
//                   >
//                     {video.snippet.channelTitle}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Loading */}
//         {loading && (
//           <div className="text-center py-4">
//             <p>Loading more videos...</p>
//           </div>
//         )}

//         {/* End */}
//         {!hasMore && videos.length > 0 && (
//           <div className="text-center py-4">
//             <p>All videos loaded ✅</p>
//           </div>
//         )}
//       </div>
//     </main>
//   );
// }