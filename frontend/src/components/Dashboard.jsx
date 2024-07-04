import React, { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";

const Dashboard = () => {
  const [totalProjects, setTotalProjects] = useState(0);
  const [closedCount, setClosedCount] = useState(0);
  const [runningCount, setRunningCount] = useState(0);
  const [closureDelayCount, setClosureDelayCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [departmentData, setDepartmentData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/getProjects")
      .then((response) => {
        const projects = response.data;
        const projectCount = projects.length;
        setTotalProjects(projectCount);

        // Retrieve project statuses from local storage
        const statusData = JSON.parse(localStorage.getItem("projectStatus") || "{}");

        let closed = 0;
        let running = 0;
        let closureDelay = 0;
        let cancelled = 0;

        const departmentStats = {};

        projects.forEach((project, index) => {
          const status = statusData[index] || "Registered";

          if (!departmentStats[project.department]) {
            departmentStats[project.department] = { Total: 0, Closed: 0 };
          }

          departmentStats[project.department].Total++;

          if (status === "Close") {
            closed++;
            closureDelay++;
            departmentStats[project.department].Closed++;
          }
          if (status === "Start") running++;
          if (status === "Cancel") cancelled++;
        });

        setClosedCount(closed);
        setRunningCount(running);
        setClosureDelayCount(closureDelay);
        setCancelledCount(cancelled);

        const departmentDataArray = Object.keys(departmentStats).map((dept) => ({
          department: dept,
          Total: departmentStats[dept].Total,
          Closed: departmentStats[dept].Closed,
        }));

        setDepartmentData(departmentDataArray);
      })
      .catch((error) => {
        console.error("There was an error fetching the projects!", error);
      });
  }, []);

  const stats = [
    { title: 'Total Projects', value: totalProjects },
    { title: 'Closed', value: closedCount },
    { title: 'Running', value: runningCount },
    { title: 'Closure Delay', value: closureDelayCount },
    { title: 'Cancelled', value: cancelledCount }
  ];

  return (
    <div className="relative w-fit mx-auto p-6 bg-white shadow-lg rounded-lg">
      <div className="relative mb-6">
        <img
          src="/Header-bg.svg"
          alt="header-bg"
          className="w-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-between px-4">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold px-4 py-2 rounded-md">
              Dashboard
            </span>
          </div>
          <div className="absolute inset-0 flex justify-center items-center">
            <img src="/logo-icon.svg" alt="logo-icon" className="h-10 w-10" />
          </div>
        </div>
      </div>
      <div className="flex space-x-4 p-4">
        {stats.map((stat, index) => (
          <div 
            key={index} 
            className="flex-1 bg-white rounded-lg shadow-md p-4 text-center"
          >
            <h2 className="text-gray-500 text-sm font-medium">{stat.title}</h2>
            <p className="text-4xl text-blue-500 font-semibold">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="h-96">
        <ResponsiveBar
          data={departmentData}
          keys={["Total", "Closed"]}
          indexBy="department"
          margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
          padding={0.3}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={({ id, data }) => id === 'Total' ? '#1f77b4' : '#2ca02c'} // Custom colors
          borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Department",
            legendPosition: "middle",
            legendOffset: 32
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Projects",
            legendPosition: "middle",
            legendOffset: -40
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          legends={[
            {
              dataFrom: "keys",
              anchor: "bottom-right",
              direction: "column",
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: "left-to-right",
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
        />
      </div>
    </div>
  );
};

export default Dashboard;
