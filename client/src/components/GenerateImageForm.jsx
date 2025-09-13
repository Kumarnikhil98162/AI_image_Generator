// client/components/GenerateImageForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "./button";
import TextInput from "./TextInput";
import { AutoAwesome, CreateRounded } from "@mui/icons-material";
import { CreatePost, GenerateAIImage } from "../api";

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

const GenerateImageForm = () => {
  const navigate = useNavigate();

  const [post, setPost] = useState({ name: "", prompt: "", photo: "" });
  const [error, seterror] = useState("");
  const [generateImageLoading, setGenerateImageLoding] = useState(false);
  const [createPostLoading, setcreatePostLoading] = useState(false);

  // ✅ Generate Image
  const generateImageFun = async () => {
    try {
      setGenerateImageLoding(true);

      const res = await GenerateAIImage({ prompt: post.prompt });
      console.log("Response from API:", res?.data);

      let photo = res?.data?.photo;

      if (photo) {
        // Add prefix if backend only sends raw base64
        if (!photo.startsWith("http") && !photo.startsWith("data:image")) {
          photo = `data:image/jpeg;base64,${photo}`;
        }
        setPost(prev => ({ ...prev, photo }));
      } else {
        seterror("No image returned from server");
      }
    } catch (err) {
      seterror(err?.response?.data?.message || "Image generation failed");
    } finally {
      setGenerateImageLoding(false);
    }
  };

  // ✅ Create Post
  const createPostFun = async () => {
    setcreatePostLoading(true);
    try {
      await CreatePost(post);
      navigate("/");
    } catch (err) {
      seterror(err?.response?.data?.message || "Post creation failed");
    } finally {
      setcreatePostLoading(false);
    }
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

        {/* ✅ Image Preview */}
        {post.photo ? (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <img
              src={post.photo}
              alt="AI generated"
              style={{
                width: "100%",
                maxWidth: 640,
                maxHeight: 480,
                objectFit: "contain",
                borderRadius: 8,
                border: "1px solid #eee",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              height: 160,
              border: "1px dashed #ccc",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#999",
              marginTop: 8,
              borderRadius: 6,
            }}
          >
            Image preview will appear here
          </div>
        )}

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
