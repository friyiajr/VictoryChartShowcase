export interface Screen {
  name: string;
  navigationId: string;
}

export const screens: Screen[] = [
  {
    name: "Line Chart 📈",
    navigationId: "Line Chart",
  },
  {
    name: "Bar Chart 📊",
    navigationId: "Bar Chart",
  },
  {
    name: "Pie Chart 🥧",
    navigationId: "Pie Chart",
  },
  {
    name: "(Skia Only Bonus) Wavy Bars 🌊",
    navigationId: "Wavy Bars",
  },
];
