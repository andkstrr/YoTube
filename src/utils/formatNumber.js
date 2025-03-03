export default function formatNumber(number) {
    if (number >= 1_000_000_000_000) {
      return (number / 1_000_000_000_000).toFixed(1).replace(".0", "") + " T";
    } else if (number >= 1_000_000_000) {
      return (number / 1_000_000_000).toFixed(1).replace(".0", "") + " M";
    } else if (number >= 1_000_000) {
      return (number / 1_000_000).toFixed(1).replace(".0", "") + " jt";
    } else if (number >= 1_000) {
      return (number / 1_000).toFixed(1).replace(".0", "") + " rb";
    }
    return number.toString();
  }
  