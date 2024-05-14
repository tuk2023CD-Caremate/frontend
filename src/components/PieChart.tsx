import { useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { CalenderList } from '../store/store'
ChartJS.register(ArcElement, Tooltip, Legend)

interface PieChartProps {
  calenderList: CalenderList[]
}
const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds
}
const PieChart = ({ calenderList }: PieChartProps) => {
  const [percentage, setPercentage] = useState<number[]>([])

  const labels = calenderList.map((item) => item.subjectName)
  const totalSeconds = calenderList.reduce(
    (total, item) => total + timeToSeconds(item.entireTime),
    0,
  )
  const percentages = calenderList.map(
    (item) => (timeToSeconds(item.entireTime) / totalSeconds) * 100,
  )
  console.log(percentages)

  const [chartData] = useState({
    labels: labels,
    datasets: [
      {
        label: '# of Votes',
        data: percentages,
        backgroundColor: [
          '#7AC0F2', // 하늘색
          '#D75983', // 분홍색
          '#FFDA79', // 추가된 색상
          '#B983FF', // 추가된 색상
        ],
      },
    ],
  })
  const options = {
    plugins: {
      datalabels: {
        formatter: (_value: any, context: any) => {
          return context.chart.data.labels[context.dataIndex]
        },
      },
      legend: {
        display: true,
        responsive: true,
        position: 'right' as const,
        labels: {
          color: '#000000',
          padding: 15,
          font: {
            weight: 'bold' as const,
            size: 28,
          },
        },
      },
    },
  }

  return <Pie data={chartData} options={options} />
}
export default PieChart
