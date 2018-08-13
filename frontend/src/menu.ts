import { res } from "./resources";

const links = [
  {
    path: "/",
    res: res.HOME,
    icon: "fas fa-home"
  },
  {
    path: "/settings",
    res: res.SETTINGS,
    icon: "fas fa-cog"
  },
  {
    path: "https://www.xrptipbot.com/u:CinnappleFun/n:twitter",
    icon: "far fa-laugh-beam",
    res: res.DONATE
  }
];

export { links };
