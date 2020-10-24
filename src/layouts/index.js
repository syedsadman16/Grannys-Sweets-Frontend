import React from "react";
import EmployeeLayout from "./EmployeeLayout";
import CustomerLayout from "./CustomerLayout";

const Layout = ({ page, type, ...props }) => {
  const Page = page;
  return (
    <>
      {type === "employee" ? (
        <EmployeeLayout {...props}>
          <Page />
        </EmployeeLayout>
      ) : (
        <CustomerLayout {...props}>
          <Page />
        </CustomerLayout>
      )}
    </>
  );
};

export default Layout;
