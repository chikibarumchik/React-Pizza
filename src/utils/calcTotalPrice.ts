import { CartItemType } from 'src/redux/slices/cartSlice';

export const calcTotalPrice = (items: CartItemType[]) => {
  return items.reduce((sum, obj) => {
    return obj.price * obj.count + sum;
  }, 0);
};
