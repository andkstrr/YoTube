import { useEffect, useState } from "react";
import GetData from "../hooks/custom/GetData";
import Category from "../components/Category";
import { Link, useSearchParams } from "react-router";
import VideoCard from "../components/VideoCard";
import CardSkeleton from "../components/CardSkeleton";

const Home = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [categoryId, setCategoryId] = useState(0);
  const [channelIds, setChannelIds] = useState("");
  const [videoSearchIds, setVideoSearchIds] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search_query");

  const handleCategory = (categoryId) => {
    setCategoryId(categoryId);
    searchParams.delete("search_query");
    setSearchParams(searchParams);
  };

  const { data: videoData, isLoading: loadingVideoData } = GetData(
    "/videos",
    [categoryId, videoSearchIds],
    {
      key: API_KEY,
      part: "snippet, contentDetails, statistics",
      maxResults: 9,
      ...(videoSearchIds
        ? { id: videoSearchIds }
        : {
            chart: "mostPopular",
            regionCode: "ID",
            order: "date",
            videoCategoryId: categoryId,
          }),
    },
    true
  );

  const { data: channelData } = GetData(
    "/channels",
    ["channels", channelIds],
    {
      key: API_KEY,
      part: "snippet",
      id: channelIds,
    },
    !!channelIds
  );

  const { data: searchResultData, isLoading: loadingSearchData } = GetData(
    "/search",
    ["search", searchQuery],
    {
      key: API_KEY,
      chart: "mostPopular",
      part: "snippet",
      regionCode: "ID",
      maxResults: 9,
      type: "video",
      q: searchQuery,
      videoDuration: "medium",
      order: "relevance",
      relevanceLanguage: "id",
    },
    searchQuery !== null
  );

  useEffect(() => {
    const channelId = (searchQuery ? searchResultData : videoData)?.items
      ?.map((video) => video?.snippet?.channelId)
      .join(",");

    const ids = searchResultData?.items
      ?.map((video) => video.id.videoId)
      .join(",");

    setVideoSearchIds(ids);
    setChannelIds(channelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoData, searchResultData]);

  const videosWithChannels =
    videoData?.items?.map((video) => {
      const channel = channelData?.items?.find(
        (channel) => channel.id === video.snippet.channelId
      );

      return {
        ...video,
        channelThumbnails: channel?.snippet.thumbnails || {},
      };
    }) || [];

  const resultSearchData =
    searchResultData?.items?.map((video) => {
      const channel = channelData?.items?.find(
        (channel) => channel.id === video?.snippet?.channelId
      );
      const videoDataVar = videoData?.items?.find(
        (data) => data.id === video?.id?.videoId
      );

      return {
        ...video,
        channelThumbnails: channel?.snippet.thumbnails || "",
        contentDetails: videoDataVar?.contentDetails || null,
        statistics: videoDataVar?.statistics || null,
      };
    }) || [];

  const videoToDisplay = searchQuery ? resultSearchData : videosWithChannels;

  console.log(videoToDisplay);

  return (
    <div className="space-y-8">
      <Category handleCategory={handleCategory} categoryId={categoryId} />
      <div className="grid grid-cols-3 gap-3 space-y-4">
        {!loadingVideoData && !loadingSearchData
          ? videoToDisplay?.map((video, index) => {
              return (
                <Link
                  key={index}
                  to={`/watch?v=${searchQuery ? video.id.videoId : video.id}`}
                >
                  <VideoCard video={video} />
                </Link>
              );
            })
          : Array.from({ length: 9 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))}
      </div>
    </div>
  );
};

export default Home;
