import { redirect } from "next/navigation";

export default function Page() {
  // The root is not an authentication entry point. Real auth requests enter
  // through /login with an OIDC/SAML request id, so sending a direct visit home
  // cannot interrupt the share.jayn.app -> login -> share.jayn.app flow.
  redirect("https://jayn.app");
}
