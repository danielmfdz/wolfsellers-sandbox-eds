export default async function decorate(block: HTMLElement) {
  const [quoteWrapper] = block.children;
  const blockquote = document.createElement('a');
  blockquote.text = 'hola';
  blockquote.href = quoteWrapper.textContent;
  quoteWrapper.replaceChildren(blockquote);
}
