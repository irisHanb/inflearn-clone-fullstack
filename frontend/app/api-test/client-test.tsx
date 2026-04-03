"use client";

import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

export default function ClientTest() {
  const api = useApi();
  const { data, isLoading, error } = useQuery({
    queryKey: ["get-user-test"],
    queryFn: () => api.getUser(),
  });

  if (isLoading) {
    return <div>Loading....</div>;
  }

  return (
    <div>
      <h2>client api test</h2>
      <pre>{data}</pre>
    </div>
  );
}
