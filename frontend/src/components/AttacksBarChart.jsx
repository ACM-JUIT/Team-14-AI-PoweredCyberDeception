import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

function AttacksBarChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.attack_type),
    datasets: [
      {
        label: 'Number of Attacks',
        data: data.map((d) => d.count),
        backgroundColor: '#5C6795',
        borderRadius: 6,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: { beginAtZero: true },
    },
  }

  return <Bar data={chartData} options={options} />
}

export default AttacksBarChart