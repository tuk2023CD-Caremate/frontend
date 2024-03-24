import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import moment from 'moment'
import { useState } from 'react'

const StyledCalendarWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;
`
const StyledCalendar = styled(Calendar)`
  width: 600px;
  height: 500px;
  font-size: 30px;
  border-radius: 30px;
  background-color: white;
  padding: 20px;

  // 네비게이션 폰트 설정
  .react-calendar__navigation button {
    font-weight: bold;
    font-size: 32px;
  }

  /* 년/월 상단 네비게이션 칸 크기 줄이기 */
  .react-calendar__navigation__label {
    flex-grow: 0 !important;
  }

  //네비게이션 버튼 컬러
  .react-calendar__navigation button:focus,
  .react-calendar__navigation button:hover,
  .react-calendar__navigation button:disabled {
    background-color: white;
  }

  // 요일 밑줄 제거
  .react-calendar__month-view__weekdays abbr {
    text-decoration: none;
  }

  // 오늘 날짜 폰트 컬러
  .react-calendar__tile--now,
  .react-calendar__tile--now:hover {
    background-color: white;
  }

  //네비게이션 현재 월 스타일 적용
  .react-calendar__tile--hasActive {
    background-color: #650fa9;
    color: white;
  }

  // 일 날짜 간격
  .react-calendar__tile {
    padding: 0px 0px 22px;
  }

  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #e8dcf2;
    color: #650fa9;
    font-weight: bold;
    border-radius: 10px;
  }
`

type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]

const StudyCalendar = () => {
  const today = new Date()
  const [date, setDate] = useState<Value>(today)

  const handleDateChange = (newDate: Value) => {
    setDate(newDate)
  }

  return (
    <StyledCalendarWrapper>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(date) => moment(date).format('D')} // 일 제거 숫자만 보이게
        formatYear={(date) => moment(date).format('YYYY')} // 네비게이션 눌렀을때 숫자 년도만 보이게
        formatMonthYear={(date) => moment(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        showNeighboringMonth={false} // 전달, 다음달 날짜 숨기기
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
        minDetail="year" // 10년단위 년도 숨기기
      />
    </StyledCalendarWrapper>
  )
}

export default StudyCalendar
