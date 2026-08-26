import { Search, Clock, Users } from "lucide-react";

export function SearchBar({
    searchType,
    setSearchType,
    searchDate,
    setSearchDate,
    searchPeople,
    setSearchPeople,
}) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 -mt-16 relative z-20">
            <div className="bg-white rounded-2xl shadow-2xl p-5 flex flex-col md:flex-row gap-3 items-stretch border border-gray-100">
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl min-h-[54px]">
                    <Search className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                        value={searchType}
                        onChange={(e) => setSearchType(e.target.value)}
                    >
                        <option value="">Tipo de tour</option>
                        <option>Cultura</option>
                        <option>Aventura</option>
                        <option>Gastronomía</option>
                        <option>Naturaleza</option>
                    </select>
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl min-h-[54px]">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0" />
                    <input
                        type="date"
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                </div>
                <div className="flex-1 flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl min-h-[54px]">
                    <Users className="w-4 h-4 text-gray-400 shrink-0" />
                    <select
                        className="flex-1 bg-transparent text-sm text-gray-700 outline-none"
                        value={searchPeople}
                        onChange={(e) => setSearchPeople(e.target.value)}
                    >
                        <option value="">Personas</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                            <option key={n}>
                                {n} persona{n > 1 ? "s" : ""}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="px-6 min-h-[54px] min-w-[130px] text-white font-semibold rounded-xl transition-opacity duration-200 hover:opacity-90 shadow-md"
                    style={{ background: "#FF7A00" }}
                >
                    Buscar
                </button>
            </div>
        </div>
    );
}
