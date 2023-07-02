import { Dispatch, SetStateAction, useState } from "react";
import styled from "styled-components";
import Calendar from "react-calendar";
import { theme } from "../../styles/theme";

import { AiFillCaretLeft, AiFillCaretRight } from "react-icons/ai";

export type TValuePiece = Date | null;
interface ICalendarProps {
  value: TValuePiece | [TValuePiece, TValuePiece];
  onChange: Dispatch<SetStateAction<TValuePiece | [TValuePiece, TValuePiece]>>;
}
function UserCalendar({ value, onChange }: ICalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  // 캘린터 on off 토글
  const onToggle = () => {
    setIsOpen((prev) => !prev);
  };

  // date를 string으로 만들어 주는 함수
  const getYMD = (date: TValuePiece) => {
    return date && date.toLocaleDateString();
  };

  // 캘린더 선택에 따라 날짜 렌더링
  const renderDate = () => {
    if (Array.isArray(value)) {
      return `${getYMD(value[0])} ~ ${getYMD(value[1])}`;
    } else {
      return `${getYMD(value)} ~ ${getYMD(value)}`;
    }
  };

  return (
    <CalendarBox>
      <ToggleButton isOpen={isOpen} onClick={onToggle}>
        {renderDate()}
      </ToggleButton>
      {isOpen ? (
        <Calendar
          onChange={onChange}
          locale="en"
          value={value}
          selectRange={true}
          prevLabel={<AiFillCaretLeft />}
          nextLabel={<AiFillCaretRight />}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
        />
      ) : (
        ""
      )}
    </CalendarBox>
  );
}

const CalendarBox = styled.div`
  display: flex;
  align-items: end;
  margin-top: 1.25rem;
  flex-direction: column;

  .react-calendar {
    width: 300px;
    padding: 20px;
    border-radius: 5px;
    border: 1px solid ${theme.colors.gray[3]};
  }

  .react-calendar__tile--range {
  }

  .react-calendar__month-view__days__day {
  }

  .react-calendar__tile--now {
    // 오늘 날짜 타일
    background: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.orange.main};
    border: 1px solid ${theme.colors.orange.main};
    border-radius: 50px;
  }

  .react-calendar__tile--active:enabled:focus {
    background-color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile:enabled:hover {
    background-color: #ff8c53;
    color: #fff;
  }

  .react-calendar__tile--now:enabled:hover {
    background-color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile--now:enabled:focus {
    // 오늘 날짜 타일이 선택되거나 호버됐을때
    color: ${(props) => props.theme.colors.orange.main};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__month-view__weekdays {
    abbr {
      // MON, THU 요일 표시 부분
      color: ${(props) => props.theme.colors.orange.main};
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    // 전체 타일 스타일링
    border-radius: 0%;
    font-size: 12px;
    button {
      color: #ff8c53;
    }
  }

  .react-calendar__tile--active {
    // 선택 된 타일
    /* border-radius: 50%; */
    background-color: ${theme.colors.gray[3]};
    box-sizing: border-box;
  }

  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    // 범위선택 양 끝 날짜
    background: ${(props) => props.theme.colors.orange.main};
    color: #fff;
  }

  .react-calendar--selectRange {
    color: red;
  }

  .react-calendar__tile--hover {
    // 범위 선택 중간 날짜들
    background-color: ${theme.colors.gray[3]};
    color: ${(props) => props.theme.colors.white};
  }

  .react-calendar__tile--hoverStart {
    /* background-color: #3d0000; */
  }

  .react-calendar__tile--hoverEnd {
    /* background-color: black; */
  }

  .react-calendar__tile--rangeEnd {
  }

  //시작 일이 선택되고 대기중인 상태
  .react-calendar__tile--rangeBothEnds {
    background-color: #ff8871;
  }
`;

const ToggleButton = styled.button<{
  isOpen?: boolean;
}>`
  height: 24px;
  display: flex;
  cursor: pointer;
  padding: 0 15px;
  transition: 0.2s;
  font-weight: 700;
  line-height: 12px;
  font-size: 0.75rem;
  align-items: center;
  border-radius: 1rem;
  margin-bottom: 0.75rem;
  justify-content: center;
  color: ${({ isOpen, theme }) =>
    isOpen ? theme.colors.white : theme.colors.orange.main};
  background-color: ${({ isOpen, theme }) =>
    isOpen ? theme.colors.orange.main : theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.orange.main};
`;

export default UserCalendar;
