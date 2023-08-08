import styled from "@emotion/styled";
import Link from "next/link";

export const Container = styled.header`
  height: 70px;
  min-width: 750px;
  background-color: #4096ff;

  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    max-width: 1800px;
    height: 100%;
    margin: 0 auto;
    padding: 0 15px;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  cursor: pointer;
  & > img {
    height: 40%;
  }
`;

export const SavedImgBtn = styled(Link)`
  width: 120px;
  height: 50px;
  color: white;
  line-height: 45px;
  font-size: 18px;
  text-align: center;
  text-decoration: none;
  border: 3px solid white;
  border-radius: 10px;
`;
