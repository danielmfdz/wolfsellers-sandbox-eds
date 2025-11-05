// blocks/cardsplans/cardsplans.ts
export default async function decorate(block) {
  console.log(block);
  const [quoteWrapper] = block.children;
  const blockquote = document.createElement('a');
  blockquote.text = 'despues de build';
  blockquote.href = quoteWrapper.textContent;
  quoteWrapper.replaceChildren(blockquote);
}
