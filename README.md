# Skills

本仓库通过 git 子模块与上游同步，汇集 **React**、**WordPress**、**Vite** 等技术的 Agent Skills，供 Claude Code、Cursor 等 AI 助手使用。

**Author:** lemon

## 如何启用（让 Claude Code 用上这些 skills）

本仓库里的 `skills/` 只是**源目录**，Claude Code **不会**自动读这里。它只从下面两个位置加载 skills：

| 位置 | 说明 |
|------|------|
| **项目级** | 当前项目下的 `.claude/skills/` |
| **用户级** | `~/.claude/skills/`（Windows: `%USERPROFILE%\.claude\skills`） |

因此需要先把本仓库的 skills **安装**到上述之一，才会生效。

### 安装到 Claude Code（全局，推荐）

在仓库根目录执行：

```bash
pnpm run install-claude-skills
```

会将 `skills/` 下所有技能复制到 `~/.claude/skills/`，Claude Code 会自动发现。安装后建议**重启 Claude Code** 或重新打开窗口。

### 如何确认已生效

- **检查目录**：确认 `~/.claude/skills/` 下出现 `react-best-practices`、`wp-block-development` 等目录，且内含 `SKILL.md`。
- **用提问验证**：在对应类型的项目里问 Claude，例如「用 React 最佳实践优化这段组件」或「按 block 开发规范加一个 block.json 属性」，若回复里出现 skill 中的规则/术语，即表示已生效。

详细说明与更多验证方式见 **[如何启用与验证](docs/claude-code-skills.md)**。

---

## 技能来源与同步

- **配置**：`meta.ts` 中定义要同步的 submodules 与 vendors。
- **同步**：`pnpm start sync` 从各 vendor 的 `skills/` 拉取到本仓库的 `skills/`。
- **安装到 Claude**：同步完成后执行 `pnpm run install-claude-skills`，才会在 Claude Code 中启用。

### 当前技能一览

| 来源 | 技能 |
|------|------|
| **vercel-labs** | web-design-guidelines, react-best-practices, composition-patterns, react-native-skills |
| **WordPress** | wordpress-router, wp-project-triage, wp-block-development, wp-block-themes, wp-plugin-development, wp-rest-api, wp-interactivity-api, wp-abilities-api, wp-wpcli-and-ops, wp-performance, wp-phpstan, wp-playground, wpds |
| **其他** | vite, pnpm, vitest（文档子模块）, tsdown, turborepo |

---

## 常用命令

```bash
pnpm install              # 安装依赖并初始化子模块
pnpm start                # 打开技能管理 CLI（init / sync / check / cleanup）
pnpm start sync           # 从上游同步所有 skills 到 skills/
pnpm start init -y        # 按 meta.ts 初始化/清理子模块
pnpm run install-claude-skills   # 将 skills/ 安装到 ~/.claude/skills/（启用 Claude Code）
```

---

## 参考文档

- **[让 Claude Code 使用本仓库的 Skills](docs/claude-code-skills.md)** — 启用方式、安装路径、如何验证是否生效

---

## License

本仓库脚本为 MIT；各 skill 沿用其上游仓库的许可证，见各 skill 目录。
