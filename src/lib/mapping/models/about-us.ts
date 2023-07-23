import type { FactAboutUs } from "$lib/mapping/models/fact-about-us";
import type { Metadata } from "$lib/mapping/models/metadata";

export type AboutUs = {
  id: string;
  facts: FactAboutUs[];
  metadata: Metadata;
}