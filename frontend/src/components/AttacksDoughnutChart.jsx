import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

function AttacksDoughnutChart({ data }) {
  const chartData = {
    labels: data.map((d) => d.attack_type),
    datasets: [
      {
        data: data.map((d) => d.count),
        backgroundColor: [
          '#5C6795',
          '#7B89B8',
          '#2D3250',
          '#9BA8CC',
          '#3D4F7C',
        ],
        borderWidth: 2,
        borderColor: '#fff',
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { padding: 16, font: { size: 12 } },
      },
    },
  }

  return <Doughnut data={chartData} options={options} />
}

export default AttacksDoughnutChart