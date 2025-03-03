import { Link, useSearchParams } from "react-router";
import GetData from "../hooks/custom/GetData";
import VideoPlayer from "../components/VideoPlayer";
import VideoComment from "../components/VideoComment";
import { useEffect, useMemo, useState } from "react";
import VideoRecom from "../components/VideoRecom";

const Watch = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [relevanceVideoId, setrelevanceVideoId] = useState(null);

  const { data: detailVideo } = GetData(
    "/videos",
    [`detailVideo-${videoId}`],
    {
      key: API_KEY,
      part: "snippet, contentDetails, statistics",
      regionCode: "ID",
      id: videoId,
    },
    true
  );

  const { data: videoData } = GetData(
    "/videos",
    [`relevance-${relevanceVideoId}`],
    {
      key: API_KEY,
      part: "snippet, contentDetails, statistics",
      id: relevanceVideoId,
      maxResults: 15,
    },
    relevanceVideoId !== null
  );

  const channelId = detailVideo?.items[0]?.snippet.channelId;

  const { data: channelData } = GetData(
    "/channels",
    ["channels", channelId],
    {
      key: API_KEY,
      part: "snippet, statistics",
      id: channelId,
    },
    !!channelId
  );

  const videosWithChannels = detailVideo?.items[0]
    ? {
        ...detailVideo.items[0],
        channel: {
          thumbnail: channelData?.items[0]?.snippet.thumbnails,
          subscriberCount: channelData?.items[0]?.statistics.subscriberCount,
        },
      }
    : null;

  const { data: commentThreads } = GetData(
    "/commentThreads",
    [`commentThreads-${videoId}`],
    {
      key: API_KEY,
      part: "snippet",
      videoId: videoId,
      maxResults: 10,
    },
    true
  );

  const [query, setQuery] = useState("");

  const { data: relevanceVideos } = GetData(
    "/search",
    [`search-${query}`],
    {
      key: API_KEY,
      part: "snippet",
      regionCode: "ID",
      maxResults: 15,
      type: "video",
      q: query,
      videoDuration: "medium",
      order: "relevance",
      relevanceLanguage: "id",
      videoEmbeddable: "true",
    },
    true
  );

  useEffect(() => {
    const ids = relevanceVideos?.items
      ?.map((video) => video.id.videoId)
      .join(",");

    setrelevanceVideoId(ids);
  }, [relevanceVideos]);

  useEffect(() => {
    setQuery(videosWithChannels?.snippet?.title);
  }, [detailVideo, videosWithChannels?.snippet?.title]);

  const relevanceVideosDetail = useMemo(() => {
    return (
      relevanceVideos?.items?.map((video) => {
        const videoDataVar = videoData?.items?.find(
          (data) => data.id === video.id.videoId
        );
        return {
          ...video,
          viewCount: videoDataVar?.statistics?.viewCount || "",
          duration: videoDataVar?.contentDetails?.duration || "",
        };
      }) || []
    );
  }, [relevanceVideos, videoData]);

  return (
    <div className="grid grid-cols-10 gap-4">
      <div className="flex flex-col gap-5 w-full col-span-7">
        <VideoPlayer
          videosWithChannels={videosWithChannels}
          videoId={videoId}
        />
        <VideoComment
          videosWithChannels={videosWithChannels}
          commentThreads={commentThreads}
        />
      </div>
      <div className="col-span-3 p-2 flex flex-col space-y-2">
        {relevanceVideosDetail.map((video, index) => (
          <Link key={index} to={`/watch?v=${video.id.videoId}`}>
            <VideoRecom key={index} video={video} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Watch;
