import { FaEye, FaRegThumbsUp } from "react-icons/fa";
import formatNumber from "../utils/formatNumber";

const VideoPlayer = ({ videosWithChannels, videoId }) => {
  return (
    <div className="space-y-3">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full aspect-video rounded-md"
        loading="lazy"
      />
      <h3 className="font-semibold text-xl line-clamp-2">
        {videosWithChannels?.snippet?.title}
      </h3>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-1.5">
          <img
            src={videosWithChannels?.channel?.thumbnail?.medium?.url}
            alt={videosWithChannels?.snippet?.channelTitle}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col">
            <h4 className="font-semibold text-md">
              {videosWithChannels?.snippet.channelTitle}
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {formatNumber(videosWithChannels?.channel?.subscriberCount || 0)}{" "}
              subscriber
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-5 text-sm">
          <button className="flex flex-row items-center gap-2 text-gray-700 dark:text-gray-400">
            <FaEye className="w-5 h-5" />
            {formatNumber(videosWithChannels?.statistics.viewCount || 0)} views
          </button>
          <button className="flex flex-row items-center gap-2 text-gray-700 dark:text-gray-400">
            <FaRegThumbsUp className="w-5 h-5" />
            {formatNumber(videosWithChannels?.statistics.likeCount || 0)} likes
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
