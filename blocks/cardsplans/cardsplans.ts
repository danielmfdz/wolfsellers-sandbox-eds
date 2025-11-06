import { QUERIES } from '../../scripts/config/constants.js';
import { buildGraphQLEndpoint } from '../../scripts/helpers/endpoints.js';

type PackageData = {
  key: string;
  expiration: string;
  name: string;
  price: number;
  megabytesIncluded: number;
}

export default async function decorate(block: HTMLElement) {
  const res = await fetch(buildGraphQLEndpoint(QUERIES.getAllCardsPlans));
  const { data } = await res.json();
  const { cardsPlansModelList: { items: [{ cardData: [{ packages }] }] } } = data;
  let elementString: string = '<div class="card-container">';
  packages.forEach((plan:PackageData) => {
    elementString += `<div class="card-plan">
        <div class="card-plan-title">
          <p>${plan.name}s</p>
        </div>
        <div class="card-plan-body">
          <div>
            <p class="card-plan-body-cantidad">${plan.megabytesIncluded < 0 ? 'Ilimitados' : plan.megabytesIncluded}</p>
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
