async function decorate(block) {
  const [quoteWrapper] = block.children;
  const blockquote = document.createElement('a');
  blockquote.text = 'despues de build';
  blockquote.href = quoteWrapper.textContent;
  quoteWrapper.replaceChildren(blockquote);
}
export { decorate as default };
