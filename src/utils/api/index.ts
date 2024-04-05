import type {
  Asset,
  AssetCollection,
  EducationSchoolCollection,
  InterestsCollection,
  Maybe,
  Person,
  Query,
  Skill,
} from "../../../graphql-types";

const POST_GRAPHQL_FIELDS = `
  content {
    json
    links {
      assets {
        block {
          sys {
            id
          }
          title
          description
          url
          height
          width
        }
      }
    }
  }
  slug
`;

async function fetchGraphQL<T>(query: string, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${
      import.meta.env.VITE_CONTENTFUL_SPACE_ID
    }`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          preview
            ? import.meta.env.VITE_CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    },
  ).then((response) => response.json() as T);
}

function extractAsset(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.asset as Asset;
}

function extractAssetEntries(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.assetCollection
    ?.items as AssetCollection["items"];
}

function extractEducation(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.educationSchoolCollection
    ?.items as EducationSchoolCollection["items"];
}

function extractInterests(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.interestsCollection
    ?.items as InterestsCollection["items"];
}

function extractSkill(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.skillCollection?.items?.[0] as Skill;
}

function extractProfilePic(fetchResponse: Maybe<{ data?: Query }>) {
  return fetchResponse?.data?.personCollection?.items?.[0] as Person & {
    image: Asset & { src: string; srcset: string };
  };
}

function extractHomePage(fetchResponse: Maybe<{ data?: Query }>) {
  const {
    educationSchoolCollection,
    experienceCompanyCollection,
    interestsCollection,
    personCollection,
    skillCollection,
  } = fetchResponse?.data as Query;

  return {
    education: educationSchoolCollection?.items,
    experience: experienceCompanyCollection?.items,
    interests: interestsCollection?.items,
    person: personCollection?.items?.[0],
    skills: skillCollection?.items,
  };
}

export const getAllAssetsWithSlug = async () => {
  const entries = await fetchGraphQL<{ data?: Query }>(
    `query {
      assetCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          title
          description
          contentType
          fileName
          size
          url
          width
          height
        }
      }
    }`,
  );

  return extractAssetEntries(entries);
};

export const getAsset = async (assetId: string) => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      asset(id: "${assetId}") {
        title
        description
        contentType
        fileName
        size
        url
        width
        height
      }
    }`,
  );

  return extractAsset(entry);
};

export const getSkillBySlug = async (slug: string) => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      skillCollection(where: { slug: "${slug}" }, limit: 1) {
        items {
          skillName
          rating
          sys {
            id
          }
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
  );

  return extractSkill(entry);
};

export const getEducation = async () => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      educationSchoolCollection {
        items {
          schoolName
          description {
            json
          }
          startDate
          endDate
        }
      }
    }`,
  );

  return extractEducation(entry);
};

export const getInterests = async () => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      interestsCollection {
        items {
          interest
        }
      }
    }`,
  );

  return extractInterests(entry);
};

export const getProfilePic = async () => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      personCollection {
        items {
          image {
            height
            width
            description
            srcset:url(
              transform: {width: 192, height: 192, resizeStrategy: FILL, resizeFocus: FACE, cornerRadius: -1, format: WEBP, quality: 90}
            )
            src:url(
              transform: {width: 192, height: 192, resizeStrategy: FILL, resizeFocus: FACE, cornerRadius: -1, format: JPG, quality: 90}
            )
          }
        }
      }
    }`,
  );

  return extractProfilePic(entry);
};

export const getHomePageQuery = async () => {
  const entry = await fetchGraphQL<{ data?: Query }>(
    `query {
      personCollection {
        items {
          firstName
          lastName
          title
          shortBio
          email
          phone
          github
          codesandbox
        }
      }
      educationSchoolCollection {
        items {
          schoolName
          description {
            json
          }
          startDate
          endDate
        }
      }
      experienceCompanyCollection(order: endDateTime_DESC) {
        items {
          companyName
          city
          description {
            json
          }
          startDate
          endDate
        }
      }
      skillCollection(order: order_ASC) {
        items {
          skillName
          slug
          icon {
            description
            url
          }
        }
      }
      interestsCollection {
        items {
          interest
        }
      }
    }`,
  );

  return extractHomePage(entry);
};
