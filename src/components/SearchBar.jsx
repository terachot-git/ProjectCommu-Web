import { useState, useEffect } from 'react';
import { Combobox, ComboboxInput, ComboboxOption, ComboboxOptions } from '@headlessui/react';
import { Search } from 'lucide-react';
import ProfilecCommu from './ProfileCommu';
import { communityApi } from '../api/communityapi';
import { useNavigate } from 'react-router';
function SearchBar() {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        if (query.trim() === '') {
            setResults([]);
            return;
        }
        const debounceTimer = setTimeout(async () => {
            console.log(query)
            const community = await communityApi.get("/search/community", {
                params: {
                    q: query
                }
            })
            //   console.log(community)
            setResults(community.data);
        }, 500);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleSelect = (community) => {
        console.log(community)
        if (community) {

            navigate(`/commu/${community.communityname}`);
        }
    };

    return (
        <Combobox as="div" className="relative w-2/4 top-2.5" onChange={handleSelect} >
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <ComboboxInput
                    className="block w-full bg-gray-100 border border-pink-100 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-400 focus:border-transparent "
                    placeholder="ค้นหาคอมมูนิตี้..."
                    onChange={(event) => setQuery(event.target.value)}
                    autoComplete="off"
                />
            </div>

            <ComboboxOptions className="absolute mt-2 w-full max-h-60 overflow-auto rounded-lg bg-white shadow-xl border border-gray-100 focus:outline-none z-40">
                {results.length > 0 ? (
                    results.map((el) => (
                        <ComboboxOption
                            key={el.id}
                            value={el}
                            className={({ active }) =>
                                `flex items-center p-3 cursor-pointer ${active ? 'bg-violet-100 text-violet-900' : 'text-gray-900'
                                }`
                            }
                        >
                            <div>
                                <ProfilecCommu src={el.communityIcon} community={el} />
                            </div>


                        </ComboboxOption>
                    ))
                ) : (
                    query.length > 0 && (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            ไม่พบผลลัพธ์
                        </div>
                    )
                )}
            </ComboboxOptions>
        </Combobox>
    );
}

export default SearchBar;