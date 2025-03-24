import Navbar from "./HomePages/navBar";
import EventPage from "./HomePages/specialevent";
import DisplayFeedback from "./HomePages/feedbackdisplay";
import Contact from "./HomePages/contact";
import Footer from "./HomePages/footer";
import HomeimagePage from "./HomePages/Homeimagpage";

const HomePage: React.FC = () => {
  
  return (
    <>
    <div className="min-h-screen bg-gradient-to-r from-[#0c0c0c] to-[#0e0505] p-6 font-['Times_New_Roman']">
      {/* Navbar */}
      <Navbar />

      {/* Home image */}
      <HomeimagePage />
     </div>
     <div className=" bg-gradient-to-r from-white to-white p-6 font-['Times_New_Roman']">

      {/* Special Events */}
      <EventPage />
      </div>
      <div className=" bg-gradient-to-r from-[#090909] to-[#050404] p-6 font-['Times_New_Roman']">

      {/* Feedback */}
      <DisplayFeedback />
      </div>
      <div className=" bg-gradient-to-r from-[#fdfdfd] to-[#f7f6f6] p-6 font-['Times_New_Roman']">

      {/* Contact */}
      <Contact />
      </div>
      <div className=" bg-gradient-to-r from-[#0c0c0c] to-[#070606] p-6 font-['Times_New_Roman']">

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
