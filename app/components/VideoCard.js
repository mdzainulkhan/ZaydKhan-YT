
// export default function VideoCard({
//   video,
//   handleVideoClick,
// }) {
//   return (
//     <div
//       onClick={() => handleVideoClick(video)}
//       className="cursor-pointer group"
//     >
//       <div className="bg-zinc-900 rounded-2xl overflow-hidden">

//         <img
//           src={
//             video.snippet.thumbnails?.medium?.url
//           }
//           alt={video.snippet.title}
//           className="w-full group-hover:scale-105 duration-300"
//         />

//         <div className="p-3">
//           <h3 className="font-semibold line-clamp-2 text-zinc-400 ">
//             {video.snippet.title}
//           </h3>

//           <p className="text-zinc-400 text-sm mt-2">
//             {video.snippet.channelTitle}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

export default function VideoCard({
  video,
  handleVideoClick,
}) {
  return (
    <div
      onClick={() =>
        handleVideoClick(video)
      }
      className="cursor-pointer group"
    >
      <div className="bg-zinc-100 dark:bg-zinc-900 rounded-2xl overflow-hidden duration-300">

        <img
          src={
            video.snippet.thumbnails?.high
              ?.url
          }
          alt={video.snippet.title}
          className="w-full h-56 object-cover group-hover:scale-105 duration-300"
        />

        <div className="p-3">

          <h3 className="font-semibold line-clamp-1">
            {video.snippet.title}
          </h3>

          <p className="text-zinc-500 text-sm mt-0">
            {
              video.snippet
                .channelTitle
            }
          </p>

        </div>
      </div>
    </div>
  );
}