import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdOutlineProductionQuantityLimits,
  MdOutlinePendingActions,
} from "react-icons/md";

export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email Adress",
    placeholder: "Enter your email address",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email Adress",
    placeholder: "Enter your email address",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: LuLayoutDashboard,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: MdOutlineProductionQuantityLimits,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: MdOutlinePendingActions,
  },
  // {
  //   id: "dashboard",
  //   label: "Dashboard",
  //   path: "/admin/dashboard",
  // },
  // {
  //   id: "dashboard",
  //   label: "Dashboard",
  //   path: "/admin/dashboard",
  // },
];
