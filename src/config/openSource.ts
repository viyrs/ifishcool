export type OpenSourceRepoCard = {
  name: string;
  description: string;
  tech: string;
  url: string;
};

export const OSS_REPOS: OpenSourceRepoCard[] = [
  {
    name: '神岛数据统计 MCP 服务器',
    description:
      '基于 MCP 的数据服务，统一提供神奇代码岛的用户、地图与统计信息查询能力。',
    tech: 'TypeScript · AI · MCP',
    url: 'https://github.com/box3lab/statistics-mcp',
  },
  {
    name: 'PitchMaster AI',
    description:
      '面向创始人的 AI 路演陪练室，支持对话提问、即时反馈与复盘分析报告。',
    tech: 'TypeScript · AI · Pitch',
    url: 'https://github.com/box3lab/PitchMaster.ai',
  },
  {
    name: 'ArenaNext',
    description:
      '神岛 Arena 编辑器抢先体验插件，提前解锁下一代编辑功能与交互体验。',
    tech: 'TypeScript · dao3 · Tampermonkey',
    url: 'https://gitee.com/box3lab/arena-next-plugin',
  },
  {
    name: 'ArenaPro Creator',
    description:
      '让神岛 Arena 与 VSCode 无缝衔接，用专业开发体验解决大型项目创作效率问题。',
    tech: 'TypeScript · dao3 · VSCode',
    url: 'https://gitee.com/box3lab/arena-vscode-plugin',
  },
  {
    name: 'Noda Editor',
    description:
      '集成神奇代码岛 API 的可视化节点编辑器，用拖拽连线搭建完整代码流程。',
    tech: 'TypeScript · dao3 · Node',
    url: 'https://gitee.com/box3lab/noda-editor',
  },
  {
    name: 'ArenaPro CLI',
    description:
      '面向 ArenaPro 的命令行工具，支持一键创建、构建与管理项目工作流。',
    tech: 'TypeScript · dao3 · CLI',
    url: 'https://gitee.com/box3lab/arenapro-cli',
  },
  {
    name: 'ArenaPro React',
    description:
      '基于 React 封装神奇代码岛 UI 组件，让UI代码支持React形态开发。',
    tech: 'TypeScript · dao3 · React',
    url: 'https://gitee.com/box3lab/react-ui',
  },
];
