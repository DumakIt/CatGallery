import InfiniteScroll from "react-infinite-scroller";
import { PhotoAlbum } from "react-photo-album";
import { useGetCatImg } from "../../../commons/hooks/custom/useGetCatImg";
import * as S from "./catGalleryMainStyles";
import { useSetIsToggle } from "../../../commons/hooks/custom/useSetIsToggle";
import SaveCatModal from "../../../commons/catGallery/saveCatModal/saveCatModal";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

export default function CatGalleryMain(): JSX.Element {
  const { catImgs, axiosCatImg } = useGetCatImg();
  const [isToggle, changeIsToggle] = useSetIsToggle();
  const [selectCat, setSelectCat] = useState<{
    src?: string;
    width?: number;
    height?: number;
    key?: string;
  }>({});

  return (
    <S.Container>
      <S.Title>사진을 클릭해 저장해 보세요!</S.Title>
      <InfiniteScroll
        loadMore={() => {
          void axiosCatImg();
        }}
        hasMore={true}
        loader={<S.LoadingImg key={uuidv4()}>Loading ...</S.LoadingImg>}
      >
        <PhotoAlbum
          layout="masonry"
          photos={catImgs}
          columns={(containerWidth) => {
            if (containerWidth < 768) return 2;
            return 3;
          }}
          onClick={({ photo }) => {
            setSelectCat({ ...photo, key: uuidv4() });
            changeIsToggle();
          }}
        />
      </InfiniteScroll>

      {isToggle && (
        <SaveCatModal changeIsToggle={changeIsToggle} selectCat={selectCat} />
      )}
    </S.Container>
  );
}
