import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { useLocation, Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Layout = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {/* Breadcrumb Navigation */}
          <div className="p-6">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/overview">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {pathnames.map((value, index) => {
                  const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                  const isLast = index === pathnames.length - 1;

                  return (
                    <React.Fragment key={to}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        {isLast ? (
                          <BreadcrumbPage>
                            {decodeURIComponent(value)}
                          </BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink asChild>
                            <Link to={to}>{decodeURIComponent(value)}</Link>
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Main Content */}
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
