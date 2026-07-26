
import { useState } from 'react';
export default function ChannelHeader({
  channelInfo,
  avatar,
  subStr,
}) {
    const [showMore, setShowMore] =
    useState(false);
  return (
    <div className="flex items-center gap-4 mb-8">
     


      {avatar ? (
        <img
          src={avatar}
          alt="channel"
          className="w-24 h-24 rounded-full border-4 border-red-500 object-cover"
        />
      ) : (
        <div className="w-24 h-24 rounded-full border-4 border-red-500 bg-zinc-800 flex items-center justify-center text-2xl font-bold">
          Z
        </div>
      )}

      <div>
        <h1 className="text-2xl font-bold">
          {channelInfo?.snippet?.title}
        </h1>

        <p className="text-zinc-400">
          {subStr} subscribers ·{' '}
          {channelInfo?.statistics?.videoCount} videos
        </p>

       <p
            className={`text-zinc-500 whitespace-pre-line leading-7 transition-all duration-300 ${
              !showMore
                ? 'line-clamp-1'
                : ''
            }`}
          >
            {
              channelInfo?.snippet
                ?.description
            }
          </p>

          {channelInfo?.snippet
            ?.description?.length >
            80 && (
            <button
              onClick={() =>
                setShowMore(
                  !showMore
                )
              }
              className="mt-2 text-blue-500 font-semibold hover:underline"
            >
              {showMore
                ? 'Show Less'
                : 'Show More'}
            </button>
          )}

      </div>
         
    </div>
  );
}