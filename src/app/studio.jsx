"use client";

import {
  useFetchBySlug,
  ExperienceRoot,
  detachExperienceStyles,
} from "@contentful/experiences-sdk-react";
import { createClient } from "contentful";
import "./config";

const client = createClient({
  space: "3c432whivni7",
  environment: "master",
  host: "preview.contentful.com",
  accessToken: "BE_ThQJ-APF_1JmoOiP8jP_NLnkpue7-ZJb6BFNZXts", // preview token, no real harm if it's public but it's better to keep it private for production-ready implementation
});

const Studio = (props) => {
  const { isLoading, experience } = useFetchBySlug({
    client,
    experienceTypeId: "landingPageStudio",
    localeCode: "en-US",
    slug: "test-page-1",
  });

  console.log(experience);

  if (!experience || isLoading) {
    return <p>Loading...</p>;
  }

  // optionally detach styles to have them on the page on initial render
  const experienceStyles = detachExperienceStyles(experience);

  return (
    <>
      <style>{experienceStyles}</style>
      <ExperienceRoot experience={experience} locale="en-US" mode="preview" />
    </>
  );
};

export default Studio;
