import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import "./index.css";

//...
import * as Sentry from "@sentry/react";
import { Location, Action } from "@sentry/react/types/types.js";

Sentry.init({
  dsn: "https://ef48c323dc6d67b93ee1f91bf03781f0@o4507120504340480.ingest.de.sentry.io/4507120506896464",
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.metrics.metricsAggregatorIntegration(),
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation: function (): Location {
        throw new Error("Function not implemented.");
      },
      useNavigationType: function (): Action {
        throw new Error("Function not implemented.");
      },
      createRoutesFromChildren: function (children: JSX.Element[]) {
        throw new Error("Function not implemented.");
      },
      matchRoutes: function (
        routes: any,
        location: Location,
        basename?: string | undefined
      ): any[] | null {
        throw new Error("Function not implemented.");
      },
    }),
    Sentry.replayIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
