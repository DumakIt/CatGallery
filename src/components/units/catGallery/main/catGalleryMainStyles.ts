import styled from "@emotion/styled";

export const Container = styled.div`
  position: relative;
  max-width: 1200px;
  min-width: 750px;
  margin: 70px auto 0;
  padding: 15px;

  & img:hover {
    outline: 5px solid #4096ff;
    transition: all 0.1s linear;
  }
`;

export const Title = styled.h1`
  margin-bottom: 15px;
  text-align: center;
`;

export const LoadingImg = styled.h2`
  margin: 0 15px;
  text-align: center;
`;
