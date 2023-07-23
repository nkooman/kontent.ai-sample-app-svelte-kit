import type { IContentItem, Elements } from '@kontent-ai/delivery-sdk';
import type { Sitemap } from '../taxonomies/sitemap_538125f';

/**
 * Generated by '@kontent-ai/model-generator@5.2.0'
 *
 * Hero Unit
 * Id: f4deeb7e-fe9b-49a2-a5f6-a51a9be6ac73
 * Codename: hero_unit
 */
export type HeroUnit = IContentItem<{
  /**
   * Title (text)
   * Required: false
   * Id: 16ea3e64-4103-da81-eabd-af7efc2ab8a6
   * Codename: title
   *
   * Provide a title that fits within 60 characters.
   */
  title: Elements.TextElement;

  /**
   * Image (asset)
   * Required: false
   * Id: 4aeed98e-58d1-ab13-232c-542bf268fe48
   * Codename: image
   *
   * Attach a teaser image; max. dimensions are 1280 × 600 px; allowed formats are *.jpg, *.png, *.gif.
   */
  image: Elements.AssetsElement;

  /**
   * Marketing message (rich_text)
   * Required: false
   * Id: ecf4e55f-1ae0-f539-3516-5714a0f032e9
   * Codename: marketing_message
   *
   * Include a main goal of our business. The limit is 80 characters.
   */
  marketingMessage: Elements.RichTextElement;

  /**
   * Sitemap (taxonomy)
   * Required: false
   * Id: 0f620d29-a4c7-4944-b7d2-be5de2733b6e
   * Codename: sitemap
   */
  sitemap: Elements.TaxonomyElement<Sitemap>;
}>;
