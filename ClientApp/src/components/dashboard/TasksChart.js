import { Stack, Text, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import Chart from "react-apexcharts";

export const TasksChart = () => {
  const stackColor = useColorModeValue("#cacafe", "#0b1437");

  const chartData = {
    series: [10, 1, 2, 3],
    options: {
      chart: {
        events: {
          dataPointSelection: (event, chartContext, config) => {
            console.log(config.w.config.labels[config.dataPointIndex]);
          },
        },
        width: "100%",
        type: "donut",
      },
      labels: ["Backlog", "To do", "In progress", "Done"],
      plotOptions: {
        donut: {
          expandOnClick: false,
          distributed: true,
          dataLabels: {
            enabled: false,
          },
        },
      },
      colors: ["#33b2df", "#e2f345", "#feb019", "#00e396"],
    },
  };

  return (
    <Stack
      borderRadius="xl"
      bg={stackColor}
      flex={1}
      mt={15}
      padding={5}
      mr={10}
    >
      <Text
        fontSize="large"
        fontWeight="bold"
        paddingLeft={"10px"}
        paddingBottom={"10px"}
      >
        Tasks
      </Text>
      <Chart
        options={chartData.options}
        series={chartData.series}
        type="donut"
        width="380"
      />
    </Stack>
  );
};
