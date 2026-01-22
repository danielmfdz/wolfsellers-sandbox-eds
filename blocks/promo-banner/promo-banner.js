export default async function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');

  const descriptionHTML = rows[0]?.innerHTML ?? '';
  const showBadge = rows[1]?.textContent.trim() === 'true';
  const startDate = new Date(rows[2]?.textContent.trim());
  const layout = rows[3]?.textContent.trim() || 'center';

  console.log([descriptionHTML, showBadge, startDate, layout]);
}
