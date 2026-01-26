import { createClient } from "@sanity/client";

/**
 * Sanity client za branje podatkov
 */
export const sanityClient = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
});

/**
 * Sanity client za pisanje (ustvarjanje, brisanje)
 */
export const sanityWriteClient = createClient({
  projectId: "9zday4uw",
  dataset: "production",
  apiVersion: "2023-11-24",
  useCdn: false,
  token: process.env.SANITY_WRITE_TOKEN,
});
