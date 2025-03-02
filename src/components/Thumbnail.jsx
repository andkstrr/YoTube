import formatDuration from "../utils/formatDuration";
const Thumbnail = ({ thumbnail, alt, duration, className, colSpan }) => {
  return (
    <div className={`${colSpan} relative w-full h-fit aspect-video`}>
      <img
        className={`${className} object-cover transition-opacity duration-500`}
        src={thumbnail}
        alt={alt}
      />
      {duration && (
        <span className="absolute bottom-2 right-2 bg-black opacity-75 text-white text-xs font-bold px-2 py-1 rounded">
          {formatDuration(duration)}
        </span>
      )}
    </div>
  );
};

export default Thumbnail;
