import { ContentOrderedList, ContentUnorderedList, Margins } from "pdfmake/interfaces";

export interface UlProps extends Omit<ContentUnorderedList, "ul">{};
export interface OlProps extends Omit<ContentOrderedList, "ol">{};

export interface FontStyle {
  fontSize?: number;
  lineHeight?: number;
  characterSpacing?: number;
  margin?: Margins | undefined;
}

export interface Style {
  h1?: FontStyle,
  h2?: FontStyle,
  h3?: FontStyle,
  h4?: FontStyle,
  h5?: FontStyle,
  h6?: FontStyle,
  p?: FontStyle,
  li?: FontStyle,
  ul?: UlProps,
  ol?: OlProps,
}
