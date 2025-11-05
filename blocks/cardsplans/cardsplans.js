export default async function decorate(block) {
  const button = document.createElement('button');
  block.append(button);
}
