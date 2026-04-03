import * as api from "@/lib/api";
import ClientTest from "./client-test";

export default async function ApiTestPage() {
  const apiResult = await api.getUserTest();

  return (
    <div>
      <h1>backend api test</h1>
      <div>
        <h2>server api test</h2>
        <pre>{apiResult}</pre>
      </div>

      <ClientTest />
    </div>
  );
}
