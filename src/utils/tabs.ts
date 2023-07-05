import { Location } from "react-router-dom";
import { Tab } from "../components/other/TabBar";

export const getActiveTab = (tabs: Tab[], location: Location) =>
  tabs.find((tab) => location.pathname.endsWith(tab.route))?.value;
