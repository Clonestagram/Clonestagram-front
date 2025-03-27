// utils/extractHashtags.ts
export const extractHashtags = (caption: string): string[] => {
    const hashtagRegex = /#([\p{L}\p{N}_]+)/gu; // 한글, 영문, 숫자, _ 포함
    const matches = caption.match(hashtagRegex);
    return matches ? matches.map(tag => tag.replace("#", "")) : [];
  };
  