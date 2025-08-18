// client/components/GenerateImageForm.jsx
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import Button from './button';
import TextInput from './TextInput';
import { AutoAwesome, CreateRounded } from '@mui/icons-material';
import { CreatePost, GenerateAIImage } from '../api';

const Form = styled.div`
  flex: 1;
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 9%;
  justify-content: center;
`;

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 28px;
  font-weight: 500;
  color: ${({ theme }) => theme.text_primary};
`;

const Desc = styled.div`
  font-size: 17px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.text_secondary};
`;

const Actions = styled.div`
  flex: 1;
  display: flex;
  gap: 8px;
`;

const generateImageFun = async () => {
    try {
      setGenerateImageLoding(true);
      const res = await GenerateAIImage({ prompt: post.prompt });
      setPost(prev => ({ ...prev, photo: res?.data?.photo || "" }));
    } catch (err) {
      seterror(err?.response?.data?.message || "Image generation failed");
    } finally {
      setGenerateImageLoding(false);
    }
  };

  const createPostFun = async () => {
    setcreatePostLoading(true);
    await CreatePost(post)
      .then(() => {
        setcreatePostLoading(false);
        navigate("/");
      })
      .catch((error) => {
        seterror(error?.response?.data?.message || "Post creation failed");
        setcreatePostLoading(false);
      });
  };

  return (
    <Form>
      <Top>
        <Title>Generate Image with AI</Title>
        <Desc>Write your prompt according to the image you want to generate!</Desc>
      </Top>
      <Body>
        <TextInput
          label="Author"
          placeholder="Enter your name . ."
          name="name"
          value={post.name}
          onChange={(e) => setPost({ ...post, name: e.target.value })}
        />
        <TextInput
          label="Image Prompt"
          placeholder="Write a detailed prompt about the image . ."
          name="prompt"
          rows="8"
          textArea
          value={post.prompt}
          onChange={(e) => setPost({ ...post, prompt: e.target.value })}
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        <span>You can post the AI Generated Image for the Community</span>
      </Body>
      <Actions>
        <Button
          text="Generate Image"
          leftIcon={<AutoAwesome />}
          isLoading={generateImageLoading}
          isDisabled={post.prompt === ""}
          onClick={generateImageFun}
        />
        <Button
          text="Post Image"
          leftIcon={<CreateRounded />}
          isLoading={createPostLoading}
          isDisabled={post.name === "" || post.prompt === "" || post.photo === ""}
          onClick={createPostFun}
        />
      </Actions>
    </Form>
  );
};

export default GenerateImageForm;
