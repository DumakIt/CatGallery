import { Modal } from "antd";
import axios from "axios";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

interface IUseGetCatImg {
  catImgs: any[];
  axiosCatImg: () => Promise<void>;
}

export const useGetCatImg = (): IUseGetCatImg => {
  const [catImgs, setCatImgs] = useState<any[]>([]);
  const [pageNum, setPageNum] = useState(0);

  const axiosCatImg = async (): Promise<void> => {
    try {
      const result = await axios.get(
        `https://api.thecatapi.com/v1/images/search?limit=12&order=ASC&mime_types=jpg&page=${pageNum}&api_key=live_SEnutBQpOTB4uNB0KSkKHTOLfDKQYfR3NJS6UgWzLNVMUqwzo0sBryYa4CkvC5qB`
      );

      const newResult = result.data.map((el: any) => ({
        src: el.url,
        width: el.width,
        height: el.height,
        key: uuidv4(),
      }));

      setCatImgs((prev) => [...prev, ...newResult]);
      setPageNum((prev) => prev + 1);
    } catch (error) {
      if (error instanceof Error)
        Modal.error({
          content: "잠시후 다시 시도해 주세요",
          okButtonProps: {
            style: { backgroundColor: "#4096ff", color: "white" },
          },
        });
    }
  };

  return { catImgs, axiosCatImg };
};
