import type { Article } from "$lib/mapping/models/article";
import type { Metadata } from "$lib/mapping/models/metadata";
import type { Elements } from "@kontent-ai/delivery-sdk";

export type ArticleDetail = {
  id: string;
  article: Article & {
    bodyCopy: Elements.RichTextElement;
  };
  metadata: Metadata;
}