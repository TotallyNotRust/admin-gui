// #region Credit to Report (chivalry2stats.com)
const XPTable: number[] = [
  0, 200, 470, 875, 1415, 2090, 2900, 3845, 4925, 6140, 7240, 8450, 9770, 11200, 12740, 14390,
  16150, 18020, 20000, 22090, 24290, 26600, 29020, 31550, 34190
]

const MAX_TABLE_LEVEL = XPTable.length - 1
const MAX_XP_IN_TABLE = XPTable[MAX_TABLE_LEVEL]

export function GetLevelFromXP(XP: number): number {
  if (XP <= MAX_XP_IN_TABLE) {
    return XPTable.findIndex((_, index) => XP < XPTable[index + 1]) ?? 0
  }
  return CalculateLevel(XP)
}

export function CalculateLevel(XP: number): number {
  const [a, b, c] = [0.873, 2653.9, -30677 - XP]

  const discrim = b ** 2 - 4 * a * c
  if (discrim < 0) return -1

  return Math.floor((-b + Math.sqrt(discrim)) / (2 * a))
}

export const truncateAliasHistory = (aliasHistory: string, searchTerm: string) => {
  const aliases = aliasHistory.split(',')
  const matchIndex = aliases.findIndex(
    (alias) => alias.localeCompare(searchTerm, undefined, { sensitivity: 'base' }) === 0
  )

  if (matchIndex === -1) {
    return aliasHistory
  }

  const start = Math.max(0, matchIndex - 1)
  const end = Math.min(aliases.length, matchIndex + 2)

  const before = start > 0 ? '...' : ''
  const after = end < aliases.length ? '...' : ''

  return {
    matchedAlias: aliases[matchIndex],
    truncatedAliasHistory: `${before} ${aliases.slice(start, end).join(', ')} ${after}`.trim()
  }
}

const statusMap = {
  '404': 'Player not found for the given Playfab ID.',
  '400': 'Invalid Playfab ID.',
  '429': 'Rate limit reached. Please try again later.',
  '-1': 'Failed to fetch data. Please try again later.'
}

export { statusMap }
// #endregion