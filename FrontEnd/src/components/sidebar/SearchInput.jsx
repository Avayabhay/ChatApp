import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";
import { useState } from "react";
import useGetConversations from "../../hooks/useGetConversations";

const SearchInput = () => {
  const [searchText, setSearchText] = useState("");
  const { setSelectedConversation } = useConversation();
  const { conversations } = useGetConversations();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchText) {
      return;
    }

    if (searchText.length < 3) {
      toast.error("Search Text should be of atleast 3 characters");
    }

    // console.log(conversations);
    const result = conversations.find((c) =>
      c.fullName.toLowerCase().includes(searchText.toLowerCase())
    );
    console.log(result);
    if (!result) {
      toast.error("No such Users found");
    } else {
      setSelectedConversation(result);
    }
  };

  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search…"
        className="input input-bordered rounded-full"
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        value={searchText}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};
export default SearchInput;
