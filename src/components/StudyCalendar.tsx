import styled from 'styled-components'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
import { useState } from 'react'
dayjs.locale('ko')
type Props = {
  toggleStatisticsBar: () => void
  onDateChange: (newDate: Date | null) => void
}
const StyledCalendar = styled(Calendar)`
  width: 43rem;
  height: 38rem;
  font-size: 2.2rem;
  border-radius: 0.625rem;
  background-color: white;
  padding: 2.5rem;
  // 네비게이션 폰트 설정
  .react-calendar__navigation button {
    font-weight: bold;
    font-size: 2.5rem;
    margin-top: 0.625rem;
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
  .react-calendar__tile--now {
    background-color: white;
    color: #000000;
  }
  // 일 날짜 간격
  .react-calendar__tile {
    padding: 1rem  0rem 1rem 0rem;
  }
  .react-calendar__tile:hover {
    background-color: white;
  }
  // 선택한 날짜 스타일 적용
  .react-calendar__tile:enabled:focus,
  .react-calendar__tile--active {
    background-color: #e8dcf2;
    color: #650fa9;
    font-weight: bold;
  }
`
type ValuePiece = Date | null
type Value = ValuePiece | [ValuePiece, ValuePiece]
const StudyCalendar = ({ onDateChange }: Props) => {
  const [date, setDate] = useState<Value>(null)

  const handleDateChange = (newDate: Value) => {
    const clickedDate = Array.isArray(newDate) ? newDate[0] : newDate
    setDate(newDate)
    onDateChange(clickedDate)
  }

  return (
    <div>
      <StyledCalendar
        value={date}
        onChange={handleDateChange}
        formatDay={(_locate, date) => dayjs(date).format('D')} // 일 제거 숫자만 보이게
        formatMonthYear={(_locate, date) => dayjs(date).format('YYYY. MM')} // 네비게이션에서 2023. 12 이렇게 보이도록 설정
        calendarType="gregory" // 일요일 부터 시작
        next2Label={null} // +1년 & +10년 이동 버튼 숨기기
        prev2Label={null} // -1년 & -10년 이동 버튼 숨기기
      />
    </div>
  )
}
export default StudyCalendar
