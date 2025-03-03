import { useQuery } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { API } from "../../api/api";

function GetData(url, key, paramsHeader, enabled) {
  const fetchData = async () => {
    try {
      const res = await API.get(url, {
        params: paramsHeader,
      });

      return res.data;
    } catch (error) {
      const message = error.response?.data.message;
      toast.error(
        Array.isArray(message) ? message[0] : message || "something went wrong"
      );
      throw error;
    }
  };

  return useQuery({
    queryKey: key,
    queryFn: fetchData,
    enabled,
    staleTime: 1000 * 60 * 10, // 10 menit
    cacheTime: 1000 * 60 * 20, // 20 menit
    retry: 0,
    // refetchOnWindowFocus: false, supaya data tidak di fetch ulang saat halaman sedang aktif
  });
}

export default GetData;
