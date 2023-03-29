import { ParsedUrlQuery } from "querystring";
import { Maybe } from "@utils/types";

export const getQuerySlug = (query: ParsedUrlQuery): Maybe<string> => {
  return query.slug ? (Array.isArray(query.slug) ? query.slug[0] : query.slug) : undefined;
}