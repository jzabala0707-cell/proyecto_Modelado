import { useLanding } from "../hooks/useLanding";
import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import { SearchBar } from "../components/SearchBar";
import { Categories } from "../components/Categories";
import { FeaturedTours } from "../components/FeaturedTours";
import { Stats } from "../components/Stats";
import { Gallery } from "../components/Gallery";
import { Testimonials } from "../components/Testimonials";
import { Footer } from "../components/Footer";
export function LandingPage() {
    const { slide, setSlide, mobileOpen, setMobileOpen, searchType, setSearchType, searchDate, setSearchDate, searchPeople, setSearchPeople, liked, setLiked, email, setEmail, subscribed, setSubscribed, prev, next, } = useLanding();
    return (<div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen}/>

      <Hero slide={slide} setSlide={setSlide} prev={prev} next={next}/>

      <div className="py-10">
        <SearchBar
          searchType={searchType}
          setSearchType={setSearchType}
          searchDate={searchDate}
          setSearchDate={setSearchDate}
          searchPeople={searchPeople}
          setSearchPeople={setSearchPeople}
        />
      </div>

      <Categories />

      {/* Wave 1 */}
      <div style={{ height: "60px", overflow: "hidden" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#f0faf0"/>
        </svg>
      </div>

      <FeaturedTours liked={liked} onToggleLike={(id) => setLiked((l) => ({ ...l, [id]: !l[id] }))}/>

      {/* Wave 2 */}
      <div style={{ height: "60px", overflow: "hidden" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M0,30 C360,0 1080,60 1440,30 L1440,60 L0,60 Z" fill="#f0faf0"/>
        </svg>
      </div>

      <Stats />

      <Gallery />

      {/* Wave 3 */}
      <div style={{ height: "60px", overflow: "hidden" }}>
        <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#fffbf5"/>
        </svg>
      </div>

      <Testimonials />

      <Footer email={email} setEmail={setEmail} subscribed={subscribed} setSubscribed={setSubscribed}/>
    </div>);
}
