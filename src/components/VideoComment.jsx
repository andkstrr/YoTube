import formatNumber from "../utils/formatNumber";
import formatTimeAgo from "../utils/formatTimeAgo";

const VideoComment = ({ videosWithChannels, commentThreads }) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-xl">
        <span>
          {formatNumber(videosWithChannels?.statistics.commentCount || 0)}
        </span>{" "}
        komentar
      </h3>
      <hr />
      <div className="space-y-4">
        {commentThreads?.items?.length > 0 &&
          commentThreads?.items.map((commentThread) => (
            <div className="space-y-2" key={commentThread.id}>
              <div className="flex flex-row items-center space-x-2">
                <img
                  src={
                    commentThread.snippet.topLevelComment.snippet
                      .authorProfileImageUrl
                  }
                  alt={
                    commentThread.snippet.topLevelComment.snippet
                      .authorDisplayName
                  }
                  className="w-10 h-10 rounded-full"
                  loading="lazy"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm space-x-3">
                    <span className="font-semibold ">
                      {
                        commentThread.snippet.topLevelComment.snippet
                          .authorDisplayName
                      }
                    </span>
                    <span className="text-gray-500">
                      {formatTimeAgo(
                        commentThread.snippet.topLevelComment.snippet
                          .publishedAt
                      )}
                    </span>
                  </p>
                  <p className="text-xs">
                    {commentThread.snippet.topLevelComment.snippet.textDisplay}
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VideoComment;
