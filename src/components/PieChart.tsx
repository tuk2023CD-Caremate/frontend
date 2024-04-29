import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';


// Chart.js 및 필요한 플러그인을 등록합니다.
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['코딩 테스트', '프로젝트'],
  datasets: [
    {
      label: '# of Votes',
      data: [58, 42],
      backgroundColor: [
        '#7AC0F2',
        '#D75983',
      ],
      borderColor: [
        '#7AC0F2',
        '#D75983',
      ],
      borderWidth: 1,
    },
  ],
};

const options = {
  plugins: {
    datalabels: {
      formatter: (_value: any, context: any) => {
        // 함수는 각 데이터 포인트에 해당하는 라벨을 반환합니다.
        return context.chart.data.labels[context.dataIndex];
      },
    },
    legend: {
      display: false,
    },
  },
};
const PieChart = () => {
  return (
    <Pie data={data} options={options} />
  );
};

export default PieChart;
