// DashboardChart.jsx
import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import axios from "axios";

const DashboardChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios
            .get("http://127.0.0.1:8000/api/manager/stats/content-type/")
            .then((res) => {
                const result = [
                    { name: "Music", value: res.data.music },
                    { name: "Podcast", value: res.data.podcast },
                ];
                setData(result);
            })
            .catch((err) => console.error("Failed to load stats", err));
    }, []);

    return (
        <>
            <ResponsiveContainer width="100%" height="85%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" barSize={50} />
                </BarChart>
            </ResponsiveContainer>
        </>
    );
};

export default DashboardChart;
