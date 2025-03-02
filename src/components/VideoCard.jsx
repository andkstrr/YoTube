import formatNumber from "../utils/formatNumber";
import formatTimeAgo from "../utils/formatTimeAgo";
import Thumbnail from "./Thumbnail";

const VideoCard = (video) => {
  return (
    <div className="col-span-1 cursor-pointer relative space-y-2">
      <Thumbnail
        thumbnail={video?.video.snippet.thumbnails.medium?.url}
        alt={video?.video.snippet?.title}
        duration={video?.video.contentDetails?.duration}
        className={"w-full h-full rounded-2xl"}
      />

      <div className="flex flex-row gap-2">
        <div className="flex w-auto">
          <img
            className="w-7 h-7 rounded-full object-cover bg-slate-50"
            src={video?.video?.channelThumbnails.medium?.url}
            alt={video?.video.snippet?.channelTitle}
            loading="lazy"
          />
        </div>
        <div className="flex flex-col gap-0.5 w-[90%] items-start">
          <p className="line-clamp-2 font-bold leading-5 text-left">
            {video?.video.snippet?.title}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300 ">
            {video?.video.snippet?.channelTitle}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <span>
              {formatNumber(video?.video.statistics?.viewCount || 0)} x ditonton
            </span>
            <span className="mx-2">|</span>
            <span>{formatTimeAgo(video?.video.snippet?.publishedAt)}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
