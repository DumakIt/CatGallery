import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore/lite";
import { Dispatch, SetStateAction, useEffect } from "react";
import { firebaseApp } from "../../../../commons/libraries/firebase";

interface IUseEffectGetCategoryImgArgs {
  isUpdated: boolean;
  categoryList: any[];
  selectCategory: string;
  catGalleryUserId: string;
  setCatImgs: (value: SetStateAction<any[]>) => void;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
}

export const useEffectGetCategoryImg = (
  args: IUseEffectGetCategoryImgArgs
): void => {
  useEffect(() => {
    if (args.catGalleryUserId !== "" && args.categoryList[0] !== undefined) {
      const fetchSaveImg = async (): Promise<void> => {
        const accessDB = collection(
          getFirestore(firebaseApp),
          args.catGalleryUserId,
          args.selectCategory === ""
            ? args.categoryList[0].label
            : args.selectCategory,
          args.selectCategory === ""
            ? args.categoryList[0].label
            : args.selectCategory
        );
        const result = await getDocs(
          query(accessDB, orderBy("timestamp", "asc"))
        );
        const datas = result.docs.map((el) => el.data());
        args.setCatImgs(datas);
        args.setIsUpdated(false);
      };
      void fetchSaveImg();
    }
  }, [args.selectCategory, args.categoryList, args.isUpdated]);
};
