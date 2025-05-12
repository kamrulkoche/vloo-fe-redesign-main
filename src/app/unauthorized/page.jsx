import UnauthorizedPage from "@/components/UnauthorizedPage";

export const metadata = {
  title: "Access Denied | VLOO",
  description: "You don't have permission to access this page",
};

export default function UnauthorizedRoute() {
  return <UnauthorizedPage />;
}
