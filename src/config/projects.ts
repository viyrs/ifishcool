export type ProjectCard = {
  title: string;
  meta: string;
  desc: string;
  timeline: string; // e.g. '2024.03', '2023.11'
  docPath: string;
};

type Frontmatter = {
  title: string;
  meta: string;
  desc: string;
  timeline: string | number;
};

type MdxModule = {
  default: React.ComponentType<Record<string, unknown>>;
  frontmatter: Frontmatter;
};

const formatTimeline = (value: string | number | undefined): string => {
  if (value === undefined || value === null) return '';

  if (typeof value === 'number') {
    const [year, monthRaw = ''] = String(value).split('.');
    if (!monthRaw) return String(value);

    // 补齐两位月份，例如 2025.1 -> 2025.10
    const month = monthRaw.length === 1 ? `${monthRaw}0` : monthRaw;
    return `${year}.${month}`;
  }

  return value;
};

export const mdxFiles = import.meta.glob<MdxModule>('@ifc/docs/**/*.mdx', {
  eager: true,
});

export const PROJECT_CARDS: ProjectCard[] = Object.entries(mdxFiles).map(
  ([path, mdxModule]) => {
    const { frontmatter } = mdxModule;

    return {
      title: frontmatter.title || '',
      meta: frontmatter.meta || '',
      desc: frontmatter.desc || '',
      timeline: formatTimeline(frontmatter.timeline),
      docPath: path,
    };
  }
);
