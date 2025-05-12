"use client";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
  loading: () => (
    <div className="h-[473px] w-full animate-pulse bg-[#006988]" />
  ),
});

const ConversionReportsChart = ({ graphData }) => {
  const [state, setState] = useState({
    series: [
      {
        name: "Value",
        data: graphData || [],
      },
    ],
    options: {
      chart: {
        height: 473,
        type: "area",
        toolbar: {
          show: false,
        },
        dropShadow: {
          enabled: true,
          top: 10,
          left: 0,
          blur: 3,
          opacity: 0.1,
          color: "#000000",
        },
        zoom: {
          enabled: false,
        },
        sparkline: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 3,
        colors: ["#006988"],
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 1,
          opacityFrom: 0.3,
          opacityTo: 0,
          stops: [35.27, 86.73],
          colorStops: [
            {
              offset: 0,
              color: "rgba(0, 105, 136, 0.5)",
              opacity: 1,
            },
            {
              offset: 100,
              color: "rgba(0, 105, 136, 0)",
              opacity: 1,
            },
          ],
        },
      },
      grid: {
        show: true,
        borderColor: "#868686",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "13px",
          },
        },
        axisBorder: {
          show: true,
          color: "#757575",
        },
        axisTicks: {
          show: false,
        },
        max: 12,
      },
      yaxis: {
        show: true,
        labels: {
          style: {
            colors: "#FFFFFF",
            fontSize: "13px",
          },
          formatter: (value) => value.toFixed(0),
          offsetX: 0,
        },
        min: 0,
        max: 0,
        tickAmount: 4, // 4 rows
        axisBorder: {
          show: true,
          color: "#757575",
        },
      },
      tooltip: {
        enabled: true,
        theme: "light",
        style: {
          colors: "#505971",
          fontSize: "13px",
        },
        marker: {
          show: true,
        },
        x: {
          show: true,
          formatter: function (val, opts) {
            return opts.w.globals.categoryLabels[opts.dataPointIndex];
          },
        },
        y: {
          formatter: function (val) {
            return val.toFixed(0);
          },
        },
        shared: true,
        intersect: false,
      },
      colors: ["#006988"],
      padding: {
        top: 0,
      },
    },
  });

  useEffect(() => {
    if (graphData && graphData.length > 0) {
      const maxValue = Math.max(...graphData);

      // Calculate the maximum value for Y-axis to fit 4 rows
      const step = Math.ceil(maxValue / 4); // 4 rows
      const maxY = Math.ceil(maxValue / step) * step;

      const buffer = maxY * 0.1;
      const finalMaxY = maxY + buffer;

      setState((prevState) => ({
        ...prevState,
        series: [{ name: "Value", data: graphData }],
        options: {
          ...prevState.options,
          yaxis: {
            ...prevState.options.yaxis,
            max: finalMaxY,
            tickAmount: 4, // 4 rows
          },
        },
      }));
    }
  }, [graphData]);

  return (
    <div id="chart" className="h-[473px] w-full">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="area"
        height="100%"
        width="100%"
      />
    </div>
  );
};

export default ConversionReportsChart;
