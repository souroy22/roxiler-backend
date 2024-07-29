export const getBarChartData = (transactions: any) => {
  const priceRanges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity }, // For prices above 1000
  ];

  // Count items in each price range
  const distribution = priceRanges.map((range) => {
    const count = transactions.filter(
      (transaction: any) =>
        transaction.price >= range.min && transaction.price <= range.max
    ).length;

    return {
      range: `${range.min} - ${range.max}`,
      count,
    };
  });
  return distribution;
};
