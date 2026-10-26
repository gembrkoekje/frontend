export const MAX_TEAM_SIZE = 6;

export function getImage(data) {
  return data.sprites.other['official-artwork'].front_default ?? data.sprites.front_default;
}

export function formatNumber(id) {
  return `#${String(id).padStart(3, '0')}`;
}

export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function toSummary(data) {
  return {
    id: data.id,
    name: data.name,
    image: getImage(data),
    types: data.types.map((item) => item.type.name),
  };
}
