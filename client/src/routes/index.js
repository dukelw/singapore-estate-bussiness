import config from "../../src/config";

// Pages
import HomePage from "../pages/HomePage";
import Signin from "../pages/Signin";
import Signup from "../pages/Signup";
import Profile from "../pages/Profile";
import Account from "../pages/Account";
import Management from "../pages/Management";
import CreateSlider from "../pages/CreateSlider";
import Collections from "../pages/Collections";
import Sliders from "../pages/Sliders";
import Users from "../pages/Users";
import UpdateSlider from "../pages/UpdateSlider";
import NotFound from "../pages/NotFound";
import CommentSection from "../components/CommentSection/CommentSection";
import Dashboard from "../pages/Dashboard";
import DashboardEstate from "../pages/DashboardEstate";
import Appraisal from "../pages/Appraisal";
import Property from "../pages/Property";
import Estate from "../pages/Estate";
import About from "../pages/About";
import Agents from "../pages/Agents";

const publicRoutes = [
  { path: config.routes.signin, component: Signin, layout: null },
  { path: config.routes.signup, component: Signup, layout: null },
  { path: config.routes.home, component: HomePage },
  { path: config.routes.comment, component: CommentSection },
  { path: config.routes.history, component: History },
  { path: config.routes.notFound, component: NotFound },
  { path: config.routes.history, component: History },
  { path: config.routes.appraisal, component: Appraisal },
  { path: config.routes.property, component: Property },
  { path: config.routes.estate, component: Estate },
  { path: config.routes.stories, component: About },
  { path: config.routes.agents, component: Agents },
];

const privateRoutes = [
  {
    type: "admin",
    path: config.routes.dashboard,
    component: Dashboard,
    layout: null,
  },
  {
    type: "admin",
    path: config.routes.management,
    component: Management,
  },
  {
    type: "admin",
    path: config.routes.dashboardEstate,
    component: DashboardEstate,
    layout: null,
  },
  {
    type: "admin",
    path: config.routes.addSlider,
    component: CreateSlider,
  },
  {
    type: "admin",
    path: config.routes.updateSlider,
    component: UpdateSlider,
  },
  {
    type: "admin",
    path: config.routes.managementSlider,
    component: Collections,
  },
  {
    type: "admin",
    path: config.routes.sliders,
    component: Sliders,
  },
  {
    type: "admin",
    path: config.routes.managementUser,
    component: Users,
  },
  {
    type: "admin",
    path: config.routes.profile,
    component: Profile,
  },
  {
    type: "admin",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.account,
    component: Account,
  },
  {
    type: "user",
    path: config.routes.profile,
    component: Profile,
  },
];

export { publicRoutes, privateRoutes };
