// app/go/report/page.js
import GoReportClient from "../../../components/GoReportClient";

export const metadata = {
  title: "Affiliate Clicks — Internal",
  robots: { index: false, follow: false }, // noindex pentru raportul intern
};

export default function GoReportPage() {
  return <GoReportClient />;
}
