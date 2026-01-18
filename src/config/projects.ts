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
  timeline: string;
};

type MdxModule = {
  default: React.ComponentType<Record<string, unknown>>;
  frontmatter: Frontmatter;
};

export const mdxFiles = import.meta.glob<MdxModule>('/docs/**/*.mdx', {
  eager: true,
});

export const PROJECT_CARDS: ProjectCard[] = Object.entries(mdxFiles).map(
  ([path, mdxModule]) => {
    const { frontmatter } = mdxModule;

    return {
      title: frontmatter.title || '',
      meta: frontmatter.meta || '',
      desc: frontmatter.desc || '',
      timeline: String(frontmatter.timeline) || '',
      docPath: path,
    };
  }
);
