'use client';

import { useEffect, useState } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post.id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchTimeoute, setSearchTimeoute] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetch('/api/prompt')
      .then((res) => res.json())
      .then((data) => setAllPosts(data));
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, 'i');

    return allPosts.filter((item) => {
      return regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt);
    });
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeoute);
    setSearchText(e.target.value);

    setSearchTimeoute(
      setTimeout(() => {
        setSearchResults(filterPrompts(e.target.value));
      }, 500),
    );
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    setSearchResults(filterPrompts(tagName));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for teg or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={searchResults.length > 0 ? searchResults : allPosts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
