import React from 'react';
import moment from 'moment';
import 'moment/locale/lv';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    Filler,
);

export const options = {
    responsive: true,
    legend: {
        display: false,
    },
    tension: 0.0,
    scales: {
        y: {
            ticks: {
                callback: function(value: any) {
                    return value.toFixed(2) + "€";
                }
            },
            grace: '30%',
        }
    },
    plugins: {
        tooltip: {
            callbacks: {
                label: function(context: any) {
                    return context.parsed.y + "€";
                }
            }
        }
    }
};

export const ProductChart: React.FC<ProductChartProps> = (props) => {

    // let labels: string[] = [];
    const uniqueProductHistory = props.productHistory.filter((item: any, index: number) => {
        const date = moment(item.createdAt).format('DD.MM.YYYY');
        const price = parseFloat(item.price).toFixed(2);
        // Remove duplicates where short date and price are the same
        return index === props.productHistory.findIndex((obj: any) => {
            return moment(obj.createdAt).format('DD.MM.YYYY') === date && obj.price === price;
        });
    });

    const labels = uniqueProductHistory.map((item: any) => {
        return moment(item.createdAt).format('DD.MM.YYYY');
    });

    const data = {
        labels,
        datasets: [
            {
                data: uniqueProductHistory.map((item: any) => {
                    return parseFloat(item.price).toFixed(2);
                }),
                borderColor: '#1ba030',
                fill: true,
                backgroundColor: 'rgba(27, 160, 48, 0.4)',
            },
        ],
    };

    return (
        <div className="w-full">
            <Line data={data} options={options} />
        </div>
    );
}

interface ProductChartProps {
    productHistory: any;
}
