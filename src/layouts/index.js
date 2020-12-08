import React from "react";
import AuthUserLayout from "./AuthUser";
import UserLayout from "./User";
import authPage from "../auth";

const Layout = ({ page, isPrivate, type, ...props }) => {
  //Need to use user role
  const Page = authPage(page, isPrivate);

  return (
    <>
      {type === "authUser" ? (
        <AuthUserLayout {...props}>
          <Page {...props} />
        </AuthUserLayout>
      ) : (
        <UserLayout {...props}>
          <Page {...props} />
        </UserLayout>
      )}
    </>
  );
};

export default Layout;
