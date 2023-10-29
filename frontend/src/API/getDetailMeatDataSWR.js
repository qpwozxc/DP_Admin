import useSWR from "swr"

const fetcher = (...args) =>
  fetch(...args).then((res) => {
    switch (res.status) {
      case 200:
        return res.json();
      case 404:
        throw new Error("No Meat Data Found");
      default:
        return res.json();
    }
  });

export const useDetailMeatDataFetch = (id) => {
    const apiIP = '3.38.52.82';
    const { data, error } = useSWR(`http://${apiIP}/meat/get?id=${id}`, fetcher);
    
    return {
      data,
      isLoading: !error && !data,
      error,
    };
  };