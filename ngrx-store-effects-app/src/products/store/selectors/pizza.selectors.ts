import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../app/store';
import * as fromFeature from '../reducers';
import * as fromPizzas from '../reducers/pizzas.reducer';
import * as fromToppings from './toppings.selectors';

import { Pizza } from '../../models/pizza.model';

export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductState) => state.pizzas
);

export const getPizzaEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzaEntities
);

export const getSelectedPizza = createSelector(
  getPizzaEntities,
  fromRoot.getRouterState,
  (entities, router): Pizza => {
    return router.state && entities[router.state.params.pizzaId];
  }
);

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza, toppingEntities, selectedToppings) => {
    const toppings = selectedToppings.map(id => toppingEntities[id]);

    return {
      ...pizza,
      toppings
    };
  }
);

export const getAllPizzas = createSelector(getPizzaEntities, entities => {
  return Object.keys(entities).map(id => entities[+id]);
});

export const getPizzaLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzaLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
