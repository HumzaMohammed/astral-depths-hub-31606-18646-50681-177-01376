import { Outlet } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { ScrollToTop } from "@/components/ScrollToTop";
import { PageHeader } from "@/components/PageHeader";
import sectionBg from "@/assets/section-background.png";

const Layout = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer - Applied to all content */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${sectionBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      />

      {/* Content Layer */}
      <div className="relative z-10">
        <ScrollToTop />
        <Navigation />
        <PageHeader />
        <main className="animate-fade-in">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
