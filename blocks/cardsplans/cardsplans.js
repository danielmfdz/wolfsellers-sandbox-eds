// blocks/cardsplans/cardsplans.ts
export default async function decorate(block) {
  const res = await fetch('https://publish-p153442-e1604645.adobeaemcloud.com/graphql/execute.json/Sandbox-Models/get-all-cards-plans');
  const { data } = await res.json();
  const {
    cardsPlansModelList: {
      items: [
        {
          cardData: [{ packages }],
        },
      ],
    },
  } = data;
  let elementString = '<div class="card-container">';
  packages.forEach((plan) => {
    elementString += `<div class="card-plan">
        <div class="card-plan-title">
          <p>${plan.name}s</p>
        </div>
        <div class="card-plan-body">
          <div>
            <p class="card-plan-body__cantidad">${plan.megabytesIncluded < 0 ? 'Ilimitados' : plan.megabytesIncluded}</p>
            <p>Datos</p>
          </div>
          <div class="just-i-end">
            <p class="card-plan-body__price">${plan.price}</p>
            <button class="card-plan-body-btn__iwant">Lo quiero</button>
          </div>
        </div>
        <div class="card-plan-footer">
          <div class="">
            <p>${plan.expiration}</p>
          </div>      
        </div>
      </div>`;
  });
  elementString += '</div>';
  block.insertAdjacentHTML('beforeend', elementString);
}
