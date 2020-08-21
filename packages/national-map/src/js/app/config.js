/**
 * Map CSV columns to object properties
 */
export const PROPERTY_MAP = {
  "Name": "name",
  "City": "city",
  "County.FIPS": "county",
  "Facility.Type": "facility",
  "Latitude": "lat",
  "Longitude": "lon",
  "State": "state",
  "Residents.Confirmed": "res_confirmed",
  "Residents.Tested": "res_tested",
  "Residents.Deaths": "res_deaths",
  "Residents.Recovered": "res_recovered",
  "Residents.Negative": "res_negative",
  "Residents.Pending": "res_pending",
  "Residents.Population": "res_population",
  "Residents.Quarantine": "res_quarantine",
  "Staff.Confirmed": "stf_confirmed",
  "Staff.Tested": "stf_tested",
  "Staff.Deaths": "stf_deaths",
  "Staff.Recovered": "stf_recovered",
  "Staff.Negative": "stf_negative",
  "Staff.Pending": "stf_pending",
  "Staff.Population": "stf_population",
  "Staff.Quarantine": "stf_quarantine",
};

/**
 * Add state level totals for these metrics
 */
export const STATE_LEVEL_TOTALS = [
  "res_confirmed",
  "res_active",
  "res_tested",
  "res_deaths",
  "res_recovered",
  "res_negative",
  "res_pending",
  "res_population",
  "res_quarantine",
  "stf_confirmed",
  "stf_active",
  "stf_tested",
  "stf_deaths",
  "stf_recovered",
  "stf_negative",
  "stf_pending",
  "stf_population",
  "stf_quarantine",
  "tot_confirmed",
  "tot_active",
  "tot_tested",
  "tot_deaths",
  "tot_recovered",
  "tot_negative",
  "tot_pending",
  "tot_population",
  "tot_quarantine",
];

/**
 * Legend title for selected metrics
 */
export const LEGEND_LANG = {
  res_confirmed: "Total cases for residents",
  res_active: "Active cases for residents",
  res_tested: "Number of residents tested",
  res_deaths: "COVID-19 related deaths for residents",
  res_recovered: "Number of residents recovered",
  res_negative: "Number of residents testing negative",
  res_pending: "Number of residents with pending tests",
  res_population: "Number of residents",
  res_quarantine: "Number of residents in quarantine",
  stf_confirmed: "Total cases for staff",
  stf_active: "Active cases for staff",
  stf_tested: "Number of staff tested",
  stf_deaths: "COVID-19 related deaths for staff",
  stf_recovered: "Number of staff recovered",
  stf_negative: "Number of staff tested negative",
  stf_pending: "Number of staff with pending tests",
  stf_population: "Number of staff",
  stf_quarantine: "Number of staff in quarantine",
  tot_confirmed: "Total cases",
  tot_active: "Active cases",
  tot_tested: "Number of people tested",
  tot_deaths: "COVID-19 related deaths",
  tot_recovered: "Number of recoveries",
  tot_negative: "Number of negative tests",
  tot_pending: "Number of pending tests",
  tot_population: "Number of staff and residents",
  tot_quarantine: "Number of people in quarantine",
};

/**
 * Language for tooltip for places with data unavailable.
 */
export const UNAVAILABLE_LANG = {
  res_confirmed: "Confirmed cases among residents",
  res_active: "Active cases among residents",
  res_tested: "Number of tested residents",
  res_deaths:
    "Number of COVID-19 related deaths among residents",
  res_recovered: "Number of residents recovered",
  res_negative:
    "Number of negative test results among residents",
  res_pending: "Number of pending tests among residents",
  res_population: "Resident population",
  res_quarantine: "Number of residents in quarantine",
  stf_confirmed: "Confirmed cases among staff",
  stf_active: "Active cases among staff",
  stf_tested: "Number of tested staff",
  stf_deaths: "Number of COVID-19 related deaths among staff",
  stf_recovered: "Number of staff recovered",
  stf_negative: "Number of negative test results among staff",
  stf_pending: "Number of pending tests among staff",
  stf_population: "Staff population",
  stf_quarantine: "Number of staff in quarantine",
  tot_confirmed: "Total confirmed cases",
  tot_active: "Total active cases",
  tot_tested: "Total number of tests",
  tot_deaths: "Total of COVID-19 related deaths",
  tot_recovered: "Total number of recoveries",
  tot_negative: "Total number of negative test results",
  tot_pending: "Total number of pending tests",
  tot_population: "Total population",
  tot_quarantine: "Total number of people in quarantine",
};

/**
 * Abbreviations that should be forced to uppercase
 */
export const UPPER_CASE = [
  "fci",
  "usp",
  "ccw",
  "cw",
  "cc",
  "ci",
  "cf",
  "ciw",
  "cim",
  "cvsp",
  "col",
  "atc",
  "mcc",
  "pdc",
  "mci",
  "smcc",
  "mdc",
  "crv",
  "iwp",
  "sbwc",
  "fmc",
  "li",
  "sq",
  "ca",
  "prc",
  "fsp",
  "llc",
  "rcc",
  "cmf",
  "dvi",
  "cmc",
  "svsp",
  "crc",
  "nwfrc",
  "ii",
  "sfrc",
  "fdc",
  "gdcp",
  "smu",
  "rci",
  "wci",
  "nbci",
];

/**
 * Specific ranges for certain metrics,
 * all others auto generate based on values.
 */
export const VALUE_RANGES = {
  res_confirmed: [1, 1000],
  tot_confirmed: [1, 1000],
  res_active: [1, 500],
  tot_active: [1, 500],
};

/**
 * Options for subgroups
 */
export const POPULATION_OPTIONS = [
  {
    value: "res",
    label: "Residents",
    active: true,
  },
  {
    value: "stf",
    label: "Staff",
  },
  {
    value: "tot",
    label: "All",
  },
];

/**
 * Options for metric type
 */
export const TYPE_OPTIONS = [
  {
    value: "confirmed",
    label: "Total Cases",
    active: true,
  },
  {
    value: "active",
    label: "Active Cases",
    disabled: true,
  },
  {
    value: "deaths",
    label: "Deaths",
  },
];
