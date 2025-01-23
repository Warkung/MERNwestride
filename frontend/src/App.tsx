import Title from "./components/header/Title";
import { ThemedLayoutV2 } from "./components/layout";
import {
  Agents,
  AgentProfile,
  AllProperties,
  CreateProperty,
  DetailProperty,
  EditProperty,
  Home,
  Login,
  Review,
  Messages,
} from "./pages";

import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  RefineSnackbarProvider,
  // ThemedLayoutV2,
  useNotificationProvider,
} from "@refinedev/mui";

import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";

import { parseJwt } from "./utils/parse-jwt";
import {
  AccountBoxOutlined,
  EmojiPeopleOutlined,
  HolidayVillageOutlined,
  Message,
  Reviews,
  ReviewsOutlined,
  ReviewsRounded,
  ReviewsSharp,
  Star,
  StarBorderOutlined,
  VillaOutlined,
} from "@mui/icons-material";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }

  return config;
});

function App() {
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response = await fetch("http://localhost:8080/api/v1/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        });

        const data = await response.json();
        // console.log(data);

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
          })
        );

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      }

      return {
        success: false,
      };
    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      {/* <GitHubBanner /> */}
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={[
                  {
                    name: "home",
                    icon: <VillaOutlined />,
                    list: "/home",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "properties",
                    icon: <HolidayVillageOutlined />,
                    list: "/properties",
                    create: "/properties/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "Agent",
                    icon: <EmojiPeopleOutlined />,
                    list: "/agents",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "review",
                    icon: <Star />,
                    list: "/review",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "message",
                    icon: <Message />,
                    list: "/message",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                  {
                    name: "myProfile",
                    icon: <AccountBoxOutlined />,
                    list: "/profile",
                    // create: "/blog-posts/create",
                    // edit: "/blog-posts/edit/:id",
                    // show: "/blog-posts/show/:id",
                  },
                ]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "IaXbf1-nGQyRG-GGTRNc",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2 Header={Header} Title={Title}>
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="home" />}
                    />
                    <Route path="/home">
                      <Route index element={<Home />} />
                    </Route>
                    <Route path="/properties">
                      <Route index element={<AllProperties />} />
                      <Route path="create" element={<CreateProperty />} />
                    </Route>
                    <Route path="/agents">
                      <Route index element={<Agents />} />
                    </Route>
                    <Route path="/review">
                      <Route index element={<Review />} />
                    </Route>
                    <Route path="/message">
                      <Route index element={<Messages />} />
                    </Route>
                    <Route path="/profile">
                      <Route index element={<AgentProfile />} />
                    </Route>

                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route path="/login" element={<Login />} />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              {/* <DevtoolsPanel /> */}
            </DevtoolsProvider>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
