import { Suspense } from "react";
import EMRPageClient from "./emrpageclient";

export default function EMRPage() {
  return (
    <Suspense fallback={<div>Loading EMR...</div>}>
      <EMRPageClient />
    </Suspense>
  );
}
