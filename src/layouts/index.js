import React from "react";
import EmployeeLayout from "./EmployeeLayout";
import CustomerLayout from "./CustomerLayout";
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
