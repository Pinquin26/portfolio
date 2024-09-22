import "./style/reset.css";
import "./style/main.css";

import { router } from "@core/router";

import "@components/app/App";

const routes = [
  {
    path: "/",
    component: "my-app",
    children: [
      {
        path: "/",
        component: "auth-container",
        action: async () => {
          await import("@components/auth/AuthContainer");
        },
        children: [
          {
            path: "account",
            component: "app-account",
            action: async () => {
              await import("@components/pages/account/AccountOverview");
            },
          },
          {
            path: "account/edit",
            component: "account-edit",
            action: async () => {
              await import("@components/pages/account/AccountEdit");
            },
          },
          {
            path: "/",
            component: "app-home",
            action: async () => {
              await import("@components/pages/home/Home");
            },
          },
          {
            path: "trips",
            component: "trip-overview",
            action: async () => {
              await import("@components/pages/trips/TripOverview");
            },
          },
          {
            path: "trips/create",
            component: "trip-create",
            action: async () => {
              await import("@components/pages/trips/TripCreate");
            },
          },
          {
            path: "/trips/:id",
            component: "trip-detail-container",
            action: async () => {
              await import("@components/pages/trips/TripDetailContainer");
            },
            children: [
              {
                path: "/",
                component: "trip-detail",
                action: async () => {
                  await import("@components/pages/trips/TripDetail");
                },
              },
              {
                path: "/notes",
                component: "note-create",
                action: async () => {
                  await import("@components/pages/notes/NoteCreate");
                },
              },
              {
                path: "/notes/:id",
                component: "note-detail-container",
                action: async () => {
                  await import("@components/pages/notes/NoteDetailContainer");
                },
                children: [
                  {
                    path: "/",
                    component: "note-detail",
                    action: async () => {
                      await import("@components/pages/notes/NoteDetail");
                    },
                  },
                  {
                    path: "/edit",
                    component: "note-edit",
                    action: async () => {
                      await import("@components/pages/notes/NoteEdit");
                    },
                  },
                  {
                    path: "/delete",
                    component: "note-delete",
                    action: async () => {
                      await import("@components/pages/notes/NoteDelete");
                    },
                  },
                ],
              },
              //expenses
              {
                path: "/expenses",
                component: "expense-create",
                action: async () => {
                  await import("@components/pages/expenses/ExpenseCreate");
                },
              },
              {
                path: "/expenses/:id",
                component: "expense-detail-container",
                action: async () => {
                  await import(
                    "@components/pages/expenses/ExpenseDetailContainer"
                  );
                },
                children: [
                  {
                    path: "/",
                    component: "expense-detail",
                    action: async () => {
                      await import("@components/pages/expenses/ExpenseDetail");
                    },
                  },
                  {
                    path: "/edit",
                    component: "expense-edit",
                    action: async () => {
                      await import("@components/pages/expenses/ExpenseEdit");
                    },
                  },
                  {
                    path: "/delete",
                    component: "expense-delete",
                    action: async () => {
                      await import("@components/pages/expenses/ExpenseDelete");
                    },
                  },
                ],
              },
              {
                path: "/edit",
                component: "trip-edit",
                action: async () => {
                  await import("@components/pages/trips/TripEdit");
                },
              },
              {
                path: "/delete",
                component: "trip-delete",
                action: async () => {
                  await import("@components/pages/trips/TripDelete");
                },
              },
            ],
          },
          {
            path: "activities",
            component: "activity-overview",
            action: async () => {
              await import("@components/pages/activities/ActivityOverview");
            },
          },
          {
            path: "activities/create",
            component: "activity-create",
            action: async () => {
              await import("@components/pages/activities/ActivityCreate");
            },
          },
          {
            path: "activities/:id",
            component: "activity-detail-container",
            action: async () => {
              await import(
                "@components/pages/activities/ActivityDetailContainer"
              );
            },
            children: [
              {
                path: "/",
                component: "activity-detail",
                action: async () => {
                  await import("@components/pages/activities/ActivityDetail");
                },
              },
              {
                path: "/edit",
                component: "activity-edit",
                action: async () => {
                  await import("@components/pages/activities/ActivityEdit");
                },
              },
              {
                path: "/delete",
                component: "activity-delete",
                action: async () => {
                  await import("@components/pages/activities/ActivityDelete");
                },
              },
            ],
          },
        ],
      },
      {
        path: "login",
        component: "login-page",
        action: async () => {
          await import("@components/auth/Login");
        },
      },
      {
        path: "/register",
        component: "register-page",
        action: async () => {
          await import("@components/auth/Register");
        },
      },
    ],
  },
];

router.setRoutes(routes);
