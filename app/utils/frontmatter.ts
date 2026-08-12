interface FrontmatterResult {
  data: Record<string, string>
  content: string
}

function parseYamlValue(value: string): string {
  const trimmed = value.trim()
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1)
  }
  return trimmed
}

export function parseFrontmatter(raw: string): FrontmatterResult {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n([\s\S]*))?$/)

  if (!match) {
    return { data: {}, content: raw }
  }

  const yamlBlock = match[1]
  if (!yamlBlock) {
    return { data: {}, content: raw }
  }

  const data: Record<string, string> = {}

  for (const line of yamlBlock.split('\n')) {
    const trimmedLine = line.trim()
    if (!trimmedLine || trimmedLine.startsWith('#')) continue

    const colonIndex = trimmedLine.indexOf(':')
    if (colonIndex === -1) continue

    const key = trimmedLine.slice(0, colonIndex).trim()
    const value = parseYamlValue(trimmedLine.slice(colonIndex + 1))
    data[key] = value
  }

  return {
    data,
    content: match[2] ?? ''
  }
}
