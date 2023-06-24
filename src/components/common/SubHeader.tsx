import Tag from "./Tag";
import styled from "styled-components";
import Banner from "../main/MainBanner";
import { theme } from "../../styles/theme";

const tags = [
  { key: 0, tag: "ALL" },
  { key: 1, tag: "#태양계 부동산" },
  { key: 2, tag: "#사건의 지평선" },
  { key: 3, tag: "#우주복" },
  { key: 4, tag: "#우주 식량" },
  { key: 5, tag: "#우주선" },
  { key: 6, tag: "#우주 정거장" },
];

interface ISubHeaderProps {
  clickedTag: string;
  inputText: string;
  clickTagHandler: (tag: string) => void;
}

// Tag 컴포넌트의 selected에 선택 여부를 boolean으로 전달
// 태그가 선택됐거나, 검색창에 검색어를 입력 시, Banner를 출력하지 않는다.
function SubHeader({
  clickedTag,
  clickTagHandler,
  inputText,
}: ISubHeaderProps) {
  return (
    <>
      <TagContainer>
        <TagWrapper>
          {tags.map((value) => (
            <Tag
              key={value.key}
              selected={value.tag === clickedTag}
              onClick={() => clickTagHandler(value.tag)}
            >
              {value.tag}
            </Tag>
          ))}
        </TagWrapper>
      </TagContainer>
      {clickedTag.length > 0 || inputText.length > 0 ? "" : <Banner />}
    </>
  );
}

const TagContainer = styled.div`
  width: 100%;
  display: flex;
  height: 7.5rem;
  justify-content: center;
  background-color: ${theme.colors.orange.main};
`;

const TagWrapper = styled.div`
  display: flex;
  width: 1088px;
  max-width: 1088px;
  align-items: center;
  justify-content: space-between;

  > div {
  }
`;

export default SubHeader;
