import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { position } from '@chakra-ui/react';

ChartJS.register(ArcElement, Tooltip, Legend);


interface CalenderItem {
  id: number;
  studyName: string;
  entiretime: string;
  starttime: string;
  endtime : string;
}

interface PieChartProps {
  calenderList: CalenderItem[];
}


const timeToSeconds = (time:string): number => {
  const [hours, minutes, seconds] = time.split(':').map(Number);
  return hours * 3600 + minutes * 60 + seconds;
};

const PieChart = ({ calenderList }: PieChartProps) => {
   const labels = calenderList.map(item => item.studyName);
   const totalSeconds = calenderList.reduce((total, item) => total + timeToSeconds(item.entiretime), 0);
   const data= calenderList.map(item => (timeToSeconds(item.entiretime) / totalSeconds) * 100);

 
   const [chartData] = useState({
    labels: labels,
    datasets: [{
      label: '# of Votes',
      data: data,
      backgroundColor: [
        '#7AC0F2', // 하늘색
        '#D75983', // 분홍색
        '#FFDA79', // 추가된 색상
        '#B983FF'  // 추가된 색상
      ],
    }],
  })

  const options = {
    plugins: {
      datalabels: {
        formatter: (_value: any, context: any) => {
          return context.chart.data.labels[context.dataIndex];
        },
      },
      legend: {
        display: true,
        responsive : true,
        position: 'right' as const,
        labels : {
          color: "#000000",
          padding : 15,
          font: { 
            weight: 'bold' as const,
            size : 28,
          },
        }
      },
    },
  };

  return (
    <Pie data={chartData} options={options} />
  );
};

export default PieChart;
