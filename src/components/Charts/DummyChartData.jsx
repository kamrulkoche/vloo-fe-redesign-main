const generateDailyData = (start, end, minVisits = 10, maxVisits = 100) => {
  const data = {};
  const currentDate = new Date(start);
  const endDate = new Date(end);

  while (currentDate <= endDate) {
    const year = currentDate.getFullYear();
    const month = currentDate.toLocaleString("default", { month: "long" });
    const day = currentDate.getDate();

    if (!data[year]) data[year] = {};
    if (!data[year][month]) data[year][month] = {};

    data[year][month][day] = {
      Visits: Math.floor(Math.random() * (maxVisits - minVisits)) + minVisits,
    };

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
};

const getWeekData = () => {
  const data = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });

  // Start with 0 visits for visual continuity
  data[year] = {
    [month]: {
      0: { Visits: 0 },
    },
  };

  // Add data for each day of the week
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  days.forEach((_, index) => {
    if (!data[year][month]) data[year][month] = {};
    data[year][month][index + 1] = {
      Visits: Math.floor(Math.random() * 90) + 10,
    };
  });

  return data;
};

const getMonthData = () => {
  const data = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.toLocaleString("default", { month: "long" });

  // Start with 0 visits for visual continuity
  data[year] = {
    [month]: {
      0: { Visits: 0 },
    },
  };

  // Add data for each day of the month
  for (let day = 1; day <= 31; day++) {
    if (!data[year][month]) data[year][month] = {};
    data[year][month][day] = {
      Visits: Math.floor(Math.random() * 90) + 10,
    };
  }

  return data;
};

const getYearData = () => {
  const data = {};
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  // Start with 0 visits for visual continuity
  data[year] = {
    January: {
      0: { Visits: 0 },
    },
  };

  // Add data for each month
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  months.forEach((month, index) => {
    if (!data[year][month]) data[year][month] = {};
    data[year][month][index + 1] = {
      Visits: Math.floor(Math.random() * 90) + 10,
    };
  });

  return data;
};

// Example usage in your component:
const DummyChartData = {
  default: generateDailyData(new Date("2024-01-01"), new Date("2024-12-31")),
  yearly: getYearData(),
  monthly: getMonthData(),
  weekly: getWeekData(),
};

export default DummyChartData;
