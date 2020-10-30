import React from "react";
import EmployeeLayout from "./Employee";
import CustomerLayout from "./Customer";
import authPage from "../auth";

const Layout = ({ page, isPrivate, type, ...props }) => {
  //Need to use user role
  const Page = authPage(page, isPrivate);

  return (
    <>
      {type === "employee" ? (
        <EmployeeLayout {...props}>
          <Page {...props} />
        </EmployeeLayout>
      ) : (
        <CustomerLayout {...props}>
          <Page {...props} />
        </CustomerLayout>
      )}
    </>
  );
};

export default Layout;
