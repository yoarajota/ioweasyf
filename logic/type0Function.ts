export default function type0Function(
  followers_list: Array<string | undefined | null> | undefined,
  following_list: Array<string | undefined | null> | undefined
): Array<string | undefined | null> | undefined {
  let set1 = new Set(followers_list);
  let set2 = new Set(following_list);

  return [...set1].filter((x) => !set2.has(x));
}
