// export default function VideoPlayer({ selectedVideo }) {
//   if (!selectedVideo) return null;

//   return (
//     <div className="mb-10">

//       <iframe
//         width="100%"
//         height="550"
//         src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
//         title={selectedVideo.snippet.title}
//         allowFullScreen
//         className="rounded-2xl"
//       />

//       <h2 className="text-2xl font-semibold mt-4">
//         {selectedVideo.snippet.title}
//       </h2>

//       <p className="text-zinc-400 mt-2">
//         {selectedVideo.snippet.channelTitle}
//       </p>
//     </div>
//   );
// }

export default function VideoPlayer({
  selectedVideo,
}) {
  if (!selectedVideo) return null;

  return (
    <div className="mb-10">

      <div className="relative w-full overflow-hidden rounded-2xl">

        <iframe
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}?autoplay=1`}
          title={
            selectedVideo.snippet.title
          }
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-2xl"
        />

      </div>

      <h2 className="text-2xl font-bold mt-4">
        {selectedVideo.snippet.title}
      </h2>

      <p className="text-zinc-500 mt-2">
        {
          selectedVideo.snippet
            .channelTitle
        }
      </p>
    </div>
  );
}