import Tag from "./Tag";
import styled from "styled-components";
import Banner from "../main/MainBanner";
import { theme } from "../../styles/theme";
import { useState } from "react";
import { Link } from "react-router-dom";

const tags = [
  { key: 0, tag: "ALL" },
  { key: 1, tag: "#태양계 부동산" },
  { key: 2, tag: "#안드로메다 부동산" },
  { key: 3, tag: "#우주복" },
  { key: 4, tag: "#우주식량" },
  { key: 5, tag: "#우주선" },
  { key: 6, tag: "#사건의 지평선" },
];

interface ISubHeaderProps {
  selectedTag: string;
  handleTagClick: (tag: string) => void;
}

function SubHeader({ selectedTag, handleTagClick }: ISubHeaderProps) {
  return (
    <>
      <TagContainer>
        <TagWrapper>
          {tags.map((value) => (
            <Tag
              key={value.key}
              selected={value.tag === selectedTag}
              onClick={() => handleTagClick(value.tag)}
            >
              {value.tag}
            </Tag>
          ))}
        </TagWrapper>
      </TagContainer>
      {selectedTag.length > 0 ? "" : <Banner />}
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
