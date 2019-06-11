export const carbonIntensityLatest = async () => {
  await new Promise(acc => setTimeout(acc, 5000));

  return {
    zone: "GB",
    carbonIntensity: 213,
    datetime: "2019-06-11T06:42:23.639Z",
    updatedAt: "2019-06-11T06:42:24.076Z"
  };
};

export const powerConsumptionBreakdownLatest = async () => {
  await new Promise(acc => setTimeout(acc, 1000));

  return {
    zone: "DE",
    powerConsumptionBreakdown: {
      biomass: 5193,
      coal: 16170,
      gas: 6529,
      hydro: 3456,
      "hydro discharge": 3364,
      nuclear: 8254,
      oil: 322,
      solar: 3119,
      wind: 7928,
      geothermal: 3,
      unknown: 1040,
      "battery discharge": null
    },
    datetime: "2019-06-11T06:33:44.735Z",
    fossilFreePercentage: 50,
    renewablePercentage: 36,
    powerConsumptionTotal: 55376,
    updatedAt: "2019-06-11T06:33:46.538Z"
  };
};
