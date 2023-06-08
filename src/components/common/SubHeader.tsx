import styled from "styled-components";
import Tag from "./Tag";

function SubHeader() {
  return (
    <TagWrapper>
      <Tag inherit>홈</Tag>
      <Tag>#태양계</Tag>
      <Tag>#안드로메다</Tag>
      <Tag>#우주복</Tag>
      <Tag>#우주식량</Tag>
      <Tag>#우주선</Tag>
      <Tag>#블랙홀</Tag>
    </TagWrapper>
  );
}

const TagWrapper = styled.div`
  display: flex;
`;

export default SubHeader;
