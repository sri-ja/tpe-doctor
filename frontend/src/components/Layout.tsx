import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    // Apply the new, lighter gradient background using the specific gradient colors
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end"> {/* Lighter gradient */}
      {/* Removed Sidebar and ml-64 offset */}
      <main className="flex-1 p-8">
        <Outlet /> {/* Content will appear over the gradient */}
      </main>
    </div>
  );
};

export default Layout;
