# 让 Claude Code 使用本仓库的 Skills

## Claude Code 从哪里读 skills？

Claude Code **不会**自动读这个仓库里的 `skills/` 目录。它只从下面这些位置加载（按优先级）：

1. **项目级**：当前项目下的 `.claude/skills/`
2. **用户级**：`~/.claude/skills/`（全局，对所有项目生效）
3. 插件自带的 skills、企业配置等

所以需要先把本仓库的 skills **安装**到上述之一，Claude Code 才会用。

---

## 安装方式一：用 `pnpx skills add`（和 antfu/skills 一样）

和 [antfu/skills](https://github.com/antfu/skills) 一样，只要本仓库已推到 **GitHub**，就可以用 [skills CLI](https://github.com/vercel-labs/skills) 安装，无需本地克隆：

```bash
# 安装本仓库全部 skills 到全局（-g），对所有项目生效
pnpx skills add <你的GitHub用户名>/<本仓库名> --skill='*' -g

# 例如仓库地址是 https://github.com/foo/skills，则执行：
pnpx skills add foo/skills --skill='*' -g
```

常用参数：

- `--skill='*'`：安装所有 skills；也可写 `--skill=react-best-practices,wp-block-development` 只装部分
- `-g` / `--global`：装到用户目录（`~/.claude/skills/`），所有项目共用
- 不加 `-g`：装到当前项目下的 `.claude/skills/`
- `--list`：只列出可安装的 skills，不安装
- `-y`：跳过确认

安装后 Claude Code 会自动从 `~/.claude/skills/`（或项目 `.claude/skills/`）读取。

---

## 安装方式二：本地脚本（不依赖 GitHub）

在**本仓库**根目录执行：

```bash
pnpm run install-claude-skills
```

或直接：

```bash
node scripts/install-claude-skills.mjs
```

会把当前 `skills/` 下的内容复制到 `~/.claude/skills/`（Windows: `%USERPROFILE%\.claude\skills`），Claude Code 会自动发现。

---

## 怎么确认 skills 有没有生效？

### 1. 看目录是否在 Claude 的读取路径里

- **全局**：确认 `%USERPROFILE%\.claude\skills\`（Windows）或 `~/.claude/skills/`（Mac/Linux）下有你需要的 skill 目录（如 `react-best-practices`、`wp-block-development` 等），且每个目录里有 `SKILL.md`。
- **项目级**：若用项目级安装，确认项目根目录下有 `.claude/skills/` 且里面是同样的结构。

### 2. 用「会触发该 skill」的提问测

在 Claude Code 里提一个**明确对应某个 skill 的请求**，看回复是否按 skill 里的规则来：

- **React**：在 React 项目里问  
  *「用 React 最佳实践优化这段组件的性能，注意 bundle 和 data fetching」*  
  若生效，回复里会提到 Vercel 的规则（如 `async-parallel`、`bundle-barrel-imports`、SWR 等）。
- **WordPress**：在 WordPress 主题/插件项目里问  
  *「给这个区块加一个 block.json 属性并做 deprecation」*  
  若生效，会按 `wp-block-development` 的流程（block.json、deprecations 等）。

若回复里出现 skill 里才有的术语、步骤或规则，就说明该 skill 已生效。

### 3. 用 Slash 命令（若 Claude 支持）

部分环境支持用 `/技能名` 触发，例如：

- `/react-best-practices`
- `/wp-block-development`

若命令存在且 Claude 回复明显引用对应 SKILL 内容，即表示生效。

### 4. 看 Claude 是否主动引用 skill

在对话里问「你现在用了哪些 skills？」或「你参考了哪些项目里的说明？」，有时会列出已加载的 skill 或路径，可用来交叉确认。

---

## 小结

| 检查项 | 说明 |
|--------|------|
| 安装位置 | skills 必须在 `.claude/skills/`（项目）或 `~/.claude/skills/`（全局）下 |
| 结构 | 每个 skill 一个目录，内含 `SKILL.md`（及 references 等） |
| 验证方式 | 用会触发该 skill 的提问，看回复是否按 SKILL 规则回答 |

本仓库的 `pnpm start sync` 只是把各 vendor 的 skills 同步到 **本仓库的 `skills/`**；要让 Claude Code 用上，还需要用上面的方式**安装到 Claude 的 skills 目录**一次。
