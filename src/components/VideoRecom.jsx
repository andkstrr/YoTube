import formatNumber from "../utils/formatNumber";
import formatTimeAgo from "../utils/formatTimeAgo";
import Thumbnail from "./Thumbnail";

const VideoRecom = (video) => {
  return (
    <div className="col-span-2 cursor-pointer relative space-y-2 grid grid-cols-7 gap-1">
      <Thumbnail
        thumbnail={video?.video?.snippet?.thumbnails?.medium?.url}
        alt={video?.video?.snippet?.title}
        className={
          "w-full h-fit rounded-xl aspect-video object-cover col-span-3"
        }
        colSpan={"col-span-3"}
        duration={video?.video?.duration}
      />

      <div className="flex flex-col gap-0.5 col-span-4">
        <p className="line-clamp-2 font-bold leading-4 text-sm">
          {video?.video?.snippet?.title}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 ">
          {video?.video?.snippet?.channelTitle}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300">
          <span>{formatNumber(video?.video?.viewCount || 0)} x ditonton</span>
          <span className="mx-2">|</span>
          <span>{formatTimeAgo(video?.video?.snippet?.publishedAt)}</span>
        </p>
      </div>
    </div>
  );
};

export default VideoRecom;
