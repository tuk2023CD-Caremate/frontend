import { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { CalenderList } from '../store/store';

ChartJS.register(ArcElement, Tooltip, Legend);

interface PieChartProps {
  calenderList: CalenderList[];
}

interface ChartData {
  labels: string[];
  datasets: {
      label: string;
      data: number[];
      backgroundColor: string[];
  }[];
}

const timeToSeconds = (time: string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
}

const PieChart = ({ calenderList }: PieChartProps) => {
  const [chartData, setChartData] = useState<ChartData>({
    labels: [],
    datasets: [
      {
        label: '# of Votes',
        data: [],
        backgroundColor: [
          '#7AC0F2', // 하늘색
          '#D75983', // 분홍색
          '#FFDA79', // 추가된 색상
          '#B983FF', // 추가된 색상
        ],
      },
    ],
  });

  useEffect(() => {
    const labels = calenderList.map(item => item.subjectName);
    const totalSeconds = calenderList.reduce(
      (total, item) => total + timeToSeconds(item.entireTime),
      0
    );
    const percentages = calenderList.map(
      item => (timeToSeconds(item.entireTime) / totalSeconds) * 100
    );

    setChartData(prevData => ({
      ...prevData,
      labels: labels,
      datasets: [{
        ...prevData.datasets[0],
        data: percentages
      }]
    }));
  }, [calenderList]); // calenderList가 변경될 때마다 차트 데이터 업데이트

  const options = {
    plugins: {
      datalabels: {
        formatter: (_value: any, context: any) => context.chart.data.labels[context.dataIndex],
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
  };

  return <Pie data={chartData} options={options} />;
}

export default PieChart;
