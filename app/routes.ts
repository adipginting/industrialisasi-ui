import {
  type RouteConfig,
  index,
  route,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  layout("./components/layout.tsx", [route("login", "./components/Login.tsx")]),
] satisfies RouteConfig;
