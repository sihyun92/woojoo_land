import styled from "styled-components";
import Tag from "./Tag";
import Banner from "../main/MainBanner";

function SubHeader() {
  return (
    <>
      <TagContainer>
        <TagWrapper>
          <Tag inherit>ALL</Tag>
          <Tag>#태양계</Tag>
          <Tag>#안드로메다</Tag>
          <Tag>#우주복</Tag>
          <Tag>#우주식량</Tag>
          <Tag>#우주선</Tag>
          <Tag>#사건의 지평선</Tag>
        </TagWrapper>
      </TagContainer>
      <Banner />
    </>
  );
}

const TagContainer = styled.div`
  display: flex;
  width: 100%;
  height: 7.5rem;
  background-color: #6111b7;
  justify-content: center;
`;
const TagWrapper = styled.div`
  display: flex;
  width: 68.375rem;
  max-width: 68.375rem;
  justify-content: space-between;
  align-items: center;
`;
export default SubHeader;
