export default function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? parseInt(match[1]) : 0;
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const seconds = match[3] ? parseInt(match[3]) : 0;
  
    return hours > 0
      ? `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
          2,
          "0"
        )}`
      : `${minutes}:${String(seconds).padStart(2, "0")}`;
  }
  