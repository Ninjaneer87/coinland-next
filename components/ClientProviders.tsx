"use client";

import getQueryClient from "@/lib/getQueryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function ClientProviders({ children }: PropsWithChildren) {
  const [client] = useState(getQueryClient());

  return (
    <QueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default ClientProviders;
