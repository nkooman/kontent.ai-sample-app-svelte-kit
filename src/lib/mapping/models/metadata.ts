import type { Elements } from "@kontent-ai/delivery-sdk";

export type Metadata = {
  title: Elements.TextElement;
  description: Elements.TextElement;
  ogTitle: Elements.TextElement;
  ogImage: Elements.AssetsElement;
  ogDescription: Elements.TextElement;
  twitterTitle: Elements.TextElement;
  twitterSite: Elements.TextElement;
  twitterCreator: Elements.TextElement;
  twitterDescription: Elements.TextElement;
  twitterImage: Elements.AssetsElement;
};
