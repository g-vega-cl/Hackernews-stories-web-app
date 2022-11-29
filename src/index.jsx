import React from "react";
import ReactDOM from "react-dom";
import Blog from "./Blog";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'
import "./css/global.scss";

const queryClient = new QueryClient({defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

ReactDOM.render(
  <React.StrictMode>
    <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister }}
    >
      <Blog />
    </PersistQueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
