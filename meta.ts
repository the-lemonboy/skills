export interface VendorSkillMeta {
  official?: boolean
  source: string
  skills: Record<string, string> // sourceSkillName -> outputSkillName
}

/**
 * Repositories to clone as submodules and generate skills from source
 */
export const submodules = {
  vite: 'https://github.com/vitejs/vite',
  pnpm: 'https://github.com/pnpm/pnpm.io',
  vitest: 'https://github.com/vitest-dev/vitest',
}

/**
 * Already generated skills, sync with their `skills/` directory
 */
export const vendors: Record<string, VendorSkillMeta> = {
  'tsdown': {
    official: true,
    source: 'https://github.com/rolldown/tsdown',
    skills: {
      tsdown: 'tsdown',
    },
  },
  'turborepo': {
    official: true,
    source: 'https://github.com/vercel/turborepo',
    skills: {
      turborepo: 'turborepo',
    },
  },
  'vercel-labs': {
    source: 'https://github.com/vercel-labs/agent-skills',
    skills: {
      'web-design-guidelines': 'web-design-guidelines',
      'react-best-practices': 'react-best-practices',
      'composition-patterns': 'composition-patterns',
      'react-native-skills': 'react-native-skills',
    },
  },
  'wordpress': {
    official: true,
    source: 'https://github.com/WordPress/agent-skills',
    skills: {
      'wordpress-router': 'wordpress-router',
      'wp-project-triage': 'wp-project-triage',
      'wp-block-development': 'wp-block-development',
      'wp-block-themes': 'wp-block-themes',
      'wp-plugin-development': 'wp-plugin-development',
      'wp-rest-api': 'wp-rest-api',
      'wp-interactivity-api': 'wp-interactivity-api',
      'wp-abilities-api': 'wp-abilities-api',
      'wp-wpcli-and-ops': 'wp-wpcli-and-ops',
      'wp-performance': 'wp-performance',
      'wp-phpstan': 'wp-phpstan',
      'wp-playground': 'wp-playground',
      'wpds': 'wpds',
    },
  },
}

/**
 * Hand-written skills (optional)
 */
export const manual: string[] = ['lemon']
