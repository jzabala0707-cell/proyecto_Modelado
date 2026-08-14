import { useState, useEffect } from "react";
const CAROUSEL_SLIDES_COUNT = 3;
export function useLanding() {
    const [slide, setSlide] = useState(0);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchType, setSearchType] = useState("");
    const [searchDate, setSearchDate] = useState("");
    const [searchPeople, setSearchPeople] = useState("");
    const [liked, setLiked] = useState({});
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    useEffect(() => {
        const t = setInterval(() => setSlide((s) => (s + 1) % CAROUSEL_SLIDES_COUNT), 5000);
        return () => clearInterval(t);
    }, []);
    const prev = () => setSlide((s) => (s - 1 + CAROUSEL_SLIDES_COUNT) % CAROUSEL_SLIDES_COUNT);
    const next = () => setSlide((s) => (s + 1) % CAROUSEL_SLIDES_COUNT);
    return {
        slide,
        setSlide,
        mobileOpen,
        setMobileOpen,
        searchType,
        setSearchType,
        searchDate,
        setSearchDate,
        searchPeople,
        setSearchPeople,
        liked,
        setLiked,
        email,
        setEmail,
        subscribed,
        setSubscribed,
        prev,
        next,
    };
}
