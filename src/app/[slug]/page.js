import { createClient } from "contentful";
import {
  detachExperienceStyles,
  fetchBySlug,
} from "@contentful/experiences-sdk-react";
import Experience from "@/components/Experience";

const accessToken = "pR4KQ_m4f786bccU2vfygIIQhXaQfHFoq7Sdsr6Gqe8";
const space = "3c432whivni7";
const environment = "master";
const experienceTypeId = "landingPageStudio";

const client = createClient({
  space,
  environment,
  accessToken,
});

async function AppPage({ params, searchParams }) {
  const { slug } = await params;
  const locale = "en-US";
  const { expEditorMode } = await searchParams;

  const experience = await fetchBySlug({
    client,
    slug,
    experienceTypeId,
    localeCode: locale,
    isEditorMode: expEditorMode === "true",
  });

  // extract the styles from the experience
  const stylesheet = experience ? detachExperienceStyles(experience) : null;

  // experience currently needs to be stringified manually to be passed to the component
  const experienceJSON = experience ? JSON.stringify(experience) : null;

  return (
    <main style={{ width: "100%" }}>
      {stylesheet && <style>{stylesheet}</style>}
      <Experience experienceJSON={experienceJSON} locale={locale} />
    </main>
  );
}

export default AppPage;
