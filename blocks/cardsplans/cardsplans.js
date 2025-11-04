export default async function decorate(block) {
	// const cardsData = [
	//       {
	//           price: 100,
	//           title: "paquete1"
	//       },
	//       {
	//           price: 150,
	//           title: "paquete2"
	//       }
	//   ]
	// cardsData.forEach(cardData => {
	// 	let card = `<div>

	// 							</div>`
	// 	block.insertAdjacentHtml('beforeend', )
	// })
	const button = document.createElement('button');
	block.append(button);
}
