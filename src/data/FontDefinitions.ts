interface FontDefinition {
  fontName: string;
  sizingFactor: number;
  spacingFactor: number;
}

export const FontDefinitions: FontDefinition[] = [
  { fontName: 'Raleway', sizingFactor: 0.75, spacingFactor: 0.9 },
  { fontName: 'Roboto Slab', sizingFactor: 0.7, spacingFactor: 1.0 },
  { fontName: 'Inconsolata', sizingFactor: 0.7, spacingFactor: 1.0 },
  { fontName: 'Exo 2', sizingFactor: 0.75, spacingFactor: 0.95 },
  { fontName: 'Maiden Orange', sizingFactor: 0.95, spacingFactor: 0.8 },
  { fontName: 'Lilita One', sizingFactor: 0.8, spacingFactor: 0.95 },
  { fontName: 'Covered By Your Grace', sizingFactor: 0.9, spacingFactor: 0.85 },
  { fontName: 'Smooch Sans', sizingFactor: 1.0, spacingFactor: 0.75 },
  { fontName: 'Syne Mono', sizingFactor: 0.65, spacingFactor: 1.05 },
  { fontName: 'Walter Turncoat', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Nothing You Could Do', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Josefin Slab', sizingFactor: 0.8, spacingFactor: 0.85 },
  { fontName: 'Architects Daughter', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Love Ya Like A Sister', sizingFactor: 0.7, spacingFactor: 1 },
  { fontName: 'Fredericka the Great', sizingFactor: 0.7, spacingFactor: 1 },
] as const;