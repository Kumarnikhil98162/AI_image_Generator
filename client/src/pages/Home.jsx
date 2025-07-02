// client/pages/Home.jsx
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageCard from '../components/ImageCard';
import Searchbar from '../components/Searchbar';
import { CircularProgress } from '@mui/material';
import { getPosts } from '../api';

const Container = styled.div`
  height: 100%;
  overflow-y: scroll;
  background: ${({ theme }) => theme.bg};
  padding: 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const Headline = styled.div`
  font-size: 34px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Span = styled.div`
  font-size: 20px;
  font-weight: 800;
  color: ${({ theme }) => theme.primary};
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1400px;
  padding: 32px 0px;
  display: flex;
  justify-content: center;
`;

const CardWrapper = styled.div`
  display: grid;
  gap: 20px;
  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (min-width: 640px) and (max-width: 1199px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 639px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);

  const fetchPosts = async () => {
    setLoading(true);
    try {
      const res = await getPosts();
      setPosts(res?.data?.data);
      setFilteredPosts(res?.data?.data);
    } catch (error) {
      setError(error?.response?.data?.message || "Failed to fetch posts");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
    } else {
      const searchFiltered = posts.filter((post) => {
        const promptMatch = post?.prompt?.toLowerCase().includes(search.toLowerCase());
        const authorMatch = post?.name?.toLowerCase().includes(search.toLowerCase());
        return promptMatch || authorMatch;
      });
      setFilteredPosts(searchFiltered);
    }
  }, [search, posts]);

  return (
    <Container>
      <Headline>
        Explore popular posts in the community!
        <Span>⦿ Generated with AI ⦿</Span>
      </Headline>
      <Searchbar search={search} setSearch={setSearch} />
      <Wrapper>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {loading ? (
          <CircularProgress />
        ) : (
          <CardWrapper>
            {filteredPosts.length === 0 ? (
              <>No Posts Found</>
            ) : (
              filteredPosts.reverse().map((item, index) => (
                <ImageCard key={index} item={item} />
              ))
            )}
          </CardWrapper>
        )}
      </Wrapper>
    </Container>
  );
};

export default Home;
